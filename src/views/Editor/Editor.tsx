import { useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { Container } from '@mui/material'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from '../../components/Map/Map';


export default function Editor() {
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 500,
    lng: 500,
  });
  const [zoom, setZoom] = useState(1)

  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      case Status.FAILURE:
        return <div>404</div>
      case Status.SUCCESS:
        return <Map center={center} zoom={zoom} style={{ flexGrow: "1", height: "100vh", width: "100%" }} />
    }
  }

  return (
    <Wrapper apiKey={import.meta.env.VITE_API_KEY} render={render} />
  )
}