import { TextField } from "@mui/material";
import MyMapControl from "./MyMapControl";

type SearchControlProps = {
    editable: boolean
    center: number[]
    setCenter: React.Dispatch<React.SetStateAction<number[]>>, 
}

export default function SearchControl({editable, center, setCenter}: SearchControlProps) {
    return (
        <MyMapControl position="TOP_RIGHT">
            <TextField
                id="filled-basic"
                label="Center Latitude"
                type="search"
                variant="filled"
                size="small"
                style={{width: 150}}
                value={center[0]}
                disabled={!editable}
                onChange={(e) => setCenter([parseFloat(e.target.value), center[1]])}
            />
            <TextField
                id="filled-basic"
                label="Center Longitude"
                type="search"
                variant="filled"
                size="small"
                style={{width: 150}}
                value={center[1]}
                disabled={!editable}
                onChange={(e) => setCenter([center[0], parseFloat(e.target.value)])}
            />
        </MyMapControl>
    )
}