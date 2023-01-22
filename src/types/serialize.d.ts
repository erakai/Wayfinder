
interface SerializableMarker {
    name: string
    center: array<number>
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