import { useState } from "react";
import Overlay from "../../components/Structure/Overlay";

type EditorProps = {
  editable: boolean
}

export default function Editor({editable}: EditorProps) {
  const [markers, setMarkers] = useState<Array<SerializableMarker>>([])
  const [title, setTitle] = useState<string>("New Wayfinder Map")
  const [center, setCenter] = useState<Array<number>>([40.418840, -86.898973])
  const [desc, setDesc] = useState<string>("")
  const [city, setCity] = useState<string>("West Lafayette")

  const publish = () => {
    console.log('Publish!')
  }

  return (
    <Overlay editable={editable} markers={markers} setMarkers={setMarkers} publish={publish}
              title={title} setTitle={setTitle} center={center}
              setCenter={setCenter} desc={desc} setDesc={setDesc}
              city={city} setCity={setCity}/>
  )
}