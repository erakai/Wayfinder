import  React, { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import MarkerWrapper from '../Marker/MarkerWrapper';
import MapSpinner from '../Misc/MapSpinner';
import ButtonControl from './ButtonControl';
import SearchControl from './SearchControl';

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
  const [canAdd, setCanAdd] = useState(false)
  const [centering, setCentering] = useState(false)
  const [visibleIcons, setVisibleIcons] = useState(false)
  const [map, setMap] = useState<any>(null)

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
      let newMarker: SerializableMarker = {
        name: "New Marker " + markers.length,
        center: e.latLng?.toJSON(),
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
      console.log(center)
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

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{lat: center[0], lng: center[1]}}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
        options={{streetViewControl: false}}
      >
        {markers.map(m => {
          return <MarkerWrapper key={m.name} data={m}/>
        })}
        <ButtonControl editable={editable} visibleIcons={visibleIcons} canAdd={canAdd} 
          onVisibleButtonClick={onVisibleButtonClick} onAddButtonClick={onAddButtonClick}
          centering={centering} onCenterButtonClick={onCenterButtonClick}/>
        <SearchControl editable={editable} setCenter={setCenter} center={center}/>
      </GoogleMap>
  ) : <MapSpinner/>
}

export default Map