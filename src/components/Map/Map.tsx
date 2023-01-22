import  React, { useState, useCallback, useRef } from 'react'
import { GoogleMap, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import MarkerWrapper from '../Marker/MarkerWrapper';
import MapSpinner from '../Misc/MapSpinner';
import ButtonControl from './ButtonControl';
import SearchControl from './SearchControl';
import useForceUpdate from '../../hooks/useForceUpdate';
import MarkerModal from '../Marker/MarkerModal';
import { createWayfinderAlert } from '../Structure/AlertList';

const styles: Record<string, google.maps.MapTypeStyle[]> = {
  default: [],
  hide: [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      stylers: [{ visibility: "off" }],
    },
  ],
}

const containerStyle = {
  width: '100%',
  height: '93vh'
}

type MapProps = {
  markers: SerializableMarker[],
  setMarkers: React.Dispatch<React.SetStateAction<SerializableMarker[]>>,
  editable: boolean,
  center: number[],
  setCenter: React.Dispatch<React.SetStateAction<number[]>>, 
}

function Map({markers, setMarkers, editable, center, setCenter}: MapProps) {
  const [modalIdx, setModalIdx] = useState(-1)
  const [modalOpen, setModalOpen] = useState(false)

  const [canAdd, setCanAdd] = useState(false)
  const [centering, setCentering] = useState(false)
  const [visibleIcons, setVisibleIcons] = useState(false)
  const [map, setMap] = useState<any>(null)
  const realCenter = useRef(center) // the actual current location of the map

  const forceUpdate = useForceUpdate()

  const handleModalOpen = () => {
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  const onVisibleButtonClick = () => {
    if (!visibleIcons) {
      map!.setOptions({styles: styles["default"]})
    } else {
      map!.setOptions({styles: styles["hide"]})
    }

    setVisibleIcons(!visibleIcons)
  }

  const onAddButtonClick = () => {
    setCanAdd(!canAdd)
    if (centering) setCentering(false)
  }

  const onCenterButtonClick = () => {
    setCentering(!centering)
    if (canAdd) setCanAdd(false)
  }

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    if (canAdd) {
      let centerJson: any = e.latLng?.toJSON()
      let newMarker: SerializableMarker = {
        name: "New Marker",
        center: [centerJson.lat, centerJson.lng],
        info: "",
        link: ""
      }
      setMarkers(markers => [...markers, newMarker])
      setCanAdd(false)
    }
    if (centering) {
      let newCenter = e.latLng?.toJSON()
      setCenter([newCenter?.lat as number, newCenter?.lng as number])
      setCentering(false)
      createWayfinderAlert('success', 'Successfully set center.')
    }
  }

  const onGotoClick = () => {
    realCenter.current = center
    setCanAdd(false)
    setCentering(false)
    forceUpdate()
  }
  
  const handleCenterChange = () => {
    if (map) {
      realCenter.current = ([map.getCenter().lat(), map.getCenter().lng()])
    }
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_API_KEY
  })

  const onLoad = React.useCallback(function callback(map: any ) {
    map.setOptions({styles: (visibleIcons ? styles["default"] : styles["hide"])})
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{lat: realCenter.current[0], lng: realCenter.current[1]}}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={onMapClick}
          onCenterChanged={handleCenterChange}
          options={{streetViewControl: false}}
        >
          {markers.map((m, idx) => {
            return (
                <MarkerWrapper setModalIdx={setModalIdx} handleModalOpen={handleModalOpen} markers={markers} idx={idx}/>
            )
          })}
          <ButtonControl editable={editable} visibleIcons={visibleIcons} canAdd={canAdd} 
            onVisibleButtonClick={onVisibleButtonClick} onAddButtonClick={onAddButtonClick}
            centering={centering} onCenterButtonClick={onCenterButtonClick} 
            onGotoClick={onGotoClick}/>
          <SearchControl editable={editable} setCenter={setCenter} center={center}/>
        </GoogleMap>
      ) : <MapSpinner/>}
      <MarkerModal editable={editable} setMarkers={setMarkers} modalOpen={modalOpen} handleModalClose={handleModalClose} markers={markers} idx={modalIdx}/>
    </div>
  )
}

export default Map