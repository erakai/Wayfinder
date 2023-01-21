
interface SerializableMarker {
    name: string
    center: array<int>
    info: string
    link: string
}

interface SerializableMap {
    title: string
    center: array<int>
    markers: array<SerializableMarker>
}