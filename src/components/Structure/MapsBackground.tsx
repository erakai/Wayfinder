import  React, { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import MarkerWrapper from '../Marker/MarkerWrapper';
import MapSpinner from '../Misc/MapSpinner';
import { IconButton } from '@mui/material';

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
  height: '100vh'
}

type MapProps = {
  lat: number,
  lng: number
}

function Map({editable, lat, lng}: MapProps) {
  const [map, setMap] = useState<any>(null)
  const [center, setCenter] = useState({lat: lat, lng: lng})

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_API_KEY
  })

  const onLoad = React.useCallback(function callback(map: any ) {
    map.setOptions({styles: (styles["hide"])})
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{streetViewControl: false}}
      >
      </GoogleMap>
  ) : <MapSpinner/>
}

export default function MapBackground() {
  return (
    <div>
      <div id="googlemaps">
        <Map editable={false} lat={40.418840} lng={-86.898973}/>
      </div>
      <style>
        {
          `#googlemaps {
              height: 100%;
              width: 100%;
              position:absolute;
              top: 0;
              left: 0;
              z-index: -1; /* Set z-index to 0 as it will be on a layer below the contact form */
            }`
        }
      </style>
    </div>
  )
}
