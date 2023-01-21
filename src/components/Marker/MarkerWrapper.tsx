import { Container } from "@mui/system"
import { Marker } from "@react-google-maps/api"
import { useEffect, useState } from "react"

type MarkerProps = {
    data: SerializableMarker
 }

export default function MarkerWrapper({data}: MarkerProps) {

    return <Marker position={data.center}/>
}