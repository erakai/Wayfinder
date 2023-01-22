import { useGoogleMap } from "@react-google-maps/api"
import { PropsWithChildren, useEffect, useRef } from "react"

interface MyMapControlProps {
    position: keyof typeof google.maps.ControlPosition
}

export default function MyMapControl(props: PropsWithChildren<MyMapControlProps>) {
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
        <div style={{backgroundColor: "#f2f5f7", boxShadow: '0px 1px 6px #000000', }} ref={ref}>{props.children}</div>
    )
}
