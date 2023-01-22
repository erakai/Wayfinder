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

    const customIcon = (opts: any) => Object.assign({
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
        fillColor: '#34495e',
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 1,
        scale: 1,
    }, opts);

    return (
        <Marker onClick={onMarkerClick} position={{lat: markers[idx].center[0], lng: markers[idx].center[1]}} 
            label={label} opacity={0.9} icon={customIcon({fillColor: markers[idx].color, strokeColor: 'white'})}/>
    )

}