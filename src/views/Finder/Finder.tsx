import TopBar from "../../components/Structure/TopBar"
import DestinationGrid from "../../components/Structure/DestinationGrid"
import MapsBackground from "../../components/Structure/MapsBackground"

export default function Finder() {
  return (
    <div>
      <MapsBackground />
      <TopBar />
      <DestinationGrid />
    </div>
  )
}