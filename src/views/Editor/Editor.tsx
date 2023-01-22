import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WayfinderAlert from "../../components/Structure/Alert";
import { createWayfinderAlert } from "../../components/Structure/AlertList";
import Overlay from "../../components/Structure/Overlay";
import { firebase_auth } from "../../util/Firebase";
import { writeMap } from "../../util/MapFirebase";

type EditorProps = {
  editable: boolean
}

export default function Editor({editable}: EditorProps) {
  const [markers, setMarkers] = useState<Array<SerializableMarker>>([])
  const [title, setTitle] = useState<string>("New Wayfinder Map")
  const [center, setCenter] = useState<Array<number>>([40.418840, -86.898973])
  const [desc, setDesc] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const user: any = firebase_auth.currentUser
  const navigate = useNavigate()

  const publish = () => {
    let map: SerializableMap = {
      title: title,
      desc: desc,
      city: city,
      center: center,
      markers: markers
    }
    let email = user.email
    writeMap(map, email) 
    createWayfinderAlert('success', 'Map Published!')
    navigate('/')
  }

  return (
    <Overlay editable={editable} markers={markers} setMarkers={setMarkers} publish={publish}
              title={title} setTitle={setTitle} center={center}
              setCenter={setCenter} desc={desc} setDesc={setDesc}
              city={city} setCity={setCity}/>
  )
}