import  React, { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import MarkerWrapper from '../Marker/MarkerWrapper';
import MapSpinner from '../Misc/MapSpinner';
import EditMapControl from './EditMapControl';
import { IconButton } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';

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
  editable: boolean
  lat: number,
  lng: number
}

function Map({editable, lat, lng}: MapProps) {
  const [canAdd, setCanAdd] = useState(false)
  const [markers, setMarkers] = useState([])
  const [visibleIcons, setVisibleIcons] = useState(false)
  const [map, setMap] = useState(null)
  const [center, setCenter] = useState({lat: lat, lng: lng})

  const onVisibleButtonClick = () => {
    setVisibleIcons(!visibleIcons)
  }

  const onAddButtonClick = () => {
    setCanAdd(!canAdd)
  }

  const onPublishButtonClick = () => {
    console.log('Published!')
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_API_KEY
  })

  const onLoad = React.useCallback(function callback(map: any ) {
    map.setOptions({styles: styles["hide"]})
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={1}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{streetViewControl: false}}
      >
        {markers.map(m => {
          return <MarkerWrapper data={m}/>
        })}
        <EditMapControl position="LEFT_BOTTOM">
          <IconButton color="secondary" size="large" onClick={onVisibleButtonClick}>
            {visibleIcons ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
          <IconButton color="primary" size="large" onClick={onAddButtonClick}>
            <AddIcon/>
          </IconButton>
        </EditMapControl>
      </GoogleMap>
  ) : <MapSpinner/>
}

export default Map