import { InfoWindow, Marker } from "@react-google-maps/api"
import '../../styles/markerstyles.css'

type MarkerProps = {
    setModalIdx: React.Dispatch<React.SetStateAction<number>>
    handleModalOpen: () => void
    canRemove: boolean
    onMarkerRemove: (idx: number) => void
    markers: SerializableMarker[]
    idx: number
 }

export default function MarkerWrapper({setModalIdx, handleModalOpen, markers, idx, canRemove, onMarkerRemove}: MarkerProps) {
    let label = {
        text: markers[idx].name,
        className: 'markerlabel'
    }

    const onMarkerClick = () => {
        if (canRemove) {
            onMarkerRemove(idx)
        } else {
            setModalIdx(idx)
            handleModalOpen()
        }
    }

    return (
        <Marker onClick={onMarkerClick} position={{lat: markers[idx].center[0], lng: markers[idx].center[1]}} label={label} opacity={0.9}/>
    )

}