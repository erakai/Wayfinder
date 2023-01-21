import { useGoogleMap } from "@react-google-maps/api"
import { PropsWithChildren, useEffect, useRef } from "react"

interface MapControlProps {
    position: keyof typeof google.maps.ControlPosition
}

export default function EditMapControl(props: PropsWithChildren<MapControlProps>) {
    const map = useGoogleMap()
    const ref = useRef(document.createElement('div'))
    
    useEffect(() => {
        if (map && ref) {
            map.controls[window.google.maps.ControlPosition[props.position]].push(
                ref.current
            )
        }
    }, [map, ref])

    return (
        <div ref={ref}>{props.children}</div>
    )
}