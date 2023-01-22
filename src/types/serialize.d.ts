
interface SerializableMarker {
    name: string
    center: array<int>
    info: string
    link: string
}

interface SerializableMap {
    title: string
    desc: string
    city: string
    center: array<int>
    markers: array<SerializableMarker>
}