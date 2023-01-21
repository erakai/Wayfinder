import { BounceLoader, CircleLoader, ClipLoader, ClockLoader, DotLoader, FadeLoader, PuffLoader, RingLoader } from "react-spinners";

const style = {
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "min-height": "100vh",
}

export default function MapSpinner({}) {
    return (
        <div style={style}>
            <CircleLoader color="silver" />
            <BounceLoader color="maroon" />
            <CircleLoader color="silver" />
        </div>
    )
}