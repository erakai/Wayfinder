import Button from '@mui/material/Button';
import { orange } from '@mui/material/colors';


type BuildingProps = {
    publish: () => void
}

export default function PublishButton({publish}: BuildingProps) {
    return (
        <Button variant="contained" color="success" onClick={publish}>
            Publish
        </Button>
    )
}