import { BounceLoader, CircleLoader, ClipLoader, ClockLoader, DotLoader, FadeLoader, PuffLoader, RingLoader } from "react-spinners";

const style = {
    "display": "flex",
    "justifyContent": "center",
    "alignItems": "center",
    "minHeight": "100vh",
}

export default function MapSpinner({}) {
    return (
        <div style={style}>
            <CircleLoader color="maroon" />
        </div>
    )
}