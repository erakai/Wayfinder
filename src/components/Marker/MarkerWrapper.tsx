import { Container } from "@mui/system"

type MarkerProps = {
    data: SerializableMarker
}
export default function MarkerWrapper({data}: MarkerProps) {

    return (
        <Container>
            <h1>data.name</h1>
            <p>data.info</p>
        </Container>
    )
}