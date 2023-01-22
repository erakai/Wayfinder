import Button from '@mui/material/Button';
import { orange } from '@mui/material/colors';


type BuildingProps = {
    publish: () => void
    editable: boolean
}

export default function PublishButton({publish, editable}: BuildingProps) {
    return (
        <Button variant="contained" color="success" onClick={publish}>
            Publish
        </Button>
    )
}