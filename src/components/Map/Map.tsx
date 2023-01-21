import  React, { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import MarkerWrapper from '../Marker/MarkerWrapper';
import MapSpinner from '../Misc/MapSpinner';
import EditMapControl from './EditMapControl';
import { IconButton } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
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
  const [markers, setMarkers] = useState<Array<SerializableMarker>>([])
  const [visibleIcons, setVisibleIcons] = useState(false)
  const [map, setMap] = useState<any>(null)
  const [center, setCenter] = useState({lat: lat, lng: lng})

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
  }

  const onPublishButtonClick = () => {
    console.log('Published!')
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
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
        options={{streetViewControl: false}}
      >
        {markers.map(m => {
          return <MarkerWrapper key={m.name} data={m}/>
        })}
        <EditMapControl  position="BOTTOM_CENTER">
          <IconButton color="secondary" size="large" onClick={onVisibleButtonClick}>
            {visibleIcons ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
          <IconButton color="primary" size="large" onClick={onAddButtonClick}>
            {canAdd ? <MoreHorizIcon /> : <AddIcon />}
          </IconButton>
        </EditMapControl>
      </GoogleMap>
  ) : <MapSpinner/>
}

export default Map