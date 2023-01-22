import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Destination, DestinationSeed } from "../../components/Destination/API/Destination";
import { createWayfinderAlert } from "../../components/Structure/AlertList";
import Overlay from "../../components/Structure/Overlay";
import { DestinationFirebase } from "../../util/DestinationFirebase";
import { firebase_auth } from "../../util/Firebase";
import { attemptMapFetch, writeMap } from "../../util/MapFirebase";

type EditorProps = {
  editable: boolean
  mapid?: string
}

export default function Editor({editable}: EditorProps) {
  const [markers, setMarkers] = useState<Array<SerializableMarker>>([])
  const [title, setTitle] = useState<string>("New Wayfinder Map")
  const [center, setCenter] = useState<Array<number>>([40.418840, -86.898973])
  const [desc, setDesc] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const user: any = firebase_auth.currentUser
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!editable) {
      let fetchMap = async () => {
        let mapid = location.pathname.replace('/', '')
        let map = await attemptMapFetch(mapid as string)

        if (map == 'error') {
          createWayfinderAlert('error', 'Map not found.')
          navigate('/')
        } else {
          setMarkers(map.markers)
          setTitle(map.title)
          setCenter(map.center)
          setDesc(map.desc)
          setCity(map.city)
        }
      } 

      fetchMap()
    } else {
      if (!user || user.isAnonymous) {
          navigate('/')
      }
    }
  }, [])

  const publish = async () => {
    let map: SerializableMap = {
      title: title,
      desc: desc,
      city: city,
      center: center,
      markers: markers
    }
    let uid = user.uid
    let received: any = await writeMap(map, uid)
    createWayfinderAlert('success', 'Map Published!')
    navigate('/')

    let link = received._path.pieces_[1]
    let seed: DestinationSeed = {
      id: "",
      key: "",
      access: [uid],
      link: link,
      userUpVotes: [],
      userDownVotes: [],
      title: title,
      city: city
    }

    DestinationFirebase.getInstance().writeDestination(new Destination(seed))
  }

  return (
    <Overlay editable={editable} markers={markers} setMarkers={setMarkers} publish={publish}
              title={title} setTitle={setTitle} center={center}
              setCenter={setCenter} desc={desc} setDesc={setDesc}
              city={city} setCity={setCity}/>
  )
}