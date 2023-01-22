import { InfoWindow, Marker } from "@react-google-maps/api"
import '../../styles/markerstyles.css'

type MarkerProps = {
    setModalIdx: React.Dispatch<React.SetStateAction<number>>
    handleModalOpen: () => void
    markers: SerializableMarker[]
    idx: number
 }

export default function MarkerWrapper({setModalIdx, handleModalOpen, markers, idx}: MarkerProps) {
    let label = {
        text: markers[idx].name,
        className: 'markerlabel'
    }

    const onMarkerClick = () => {
        setModalIdx(idx)
        handleModalOpen()
    }

    return (
        <Marker onClick={onMarkerClick} position={markers[idx].center} label={label} opacity={0.9}/>
    )

}