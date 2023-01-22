import { IconButton, Tooltip } from "@mui/material";
import MyMapControl from "./MyMapControl";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import PushPinIcon from '@mui/icons-material/PushPin';

type ButtonControlProps = {
    editable: boolean,
    visibleIcons: boolean,
    onVisibleButtonClick: () => void,
    canAdd: boolean,
    onAddButtonClick: () => void,
    centering: boolean,
    onCenterButtonClick: () => void,
}

export default function ButtonControl({editable, visibleIcons, onVisibleButtonClick, 
                                        canAdd, onAddButtonClick, centering,
                                        onCenterButtonClick}: ButtonControlProps) {
    return (
        <MyMapControl  position="BOTTOM_CENTER">
            <Tooltip title="Toggle Places">
                <IconButton color="secondary" size="large" onClick={onVisibleButtonClick}>
                    {visibleIcons ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
            </Tooltip>
            <Tooltip title="Add Marker">
                <IconButton disabled={!editable} color="primary" size="large" onClick={onAddButtonClick}>
                    {canAdd ? <MoreHorizIcon /> : <AddIcon />}
                </IconButton>
            </Tooltip>
            <Tooltip title="Set Center">
                <IconButton disabled={!editable} color="secondary" size="large" onClick={onCenterButtonClick}>
                    {centering ? <MoreHorizIcon /> : <PushPinIcon />}
                </IconButton>
            </Tooltip>
        </MyMapControl>
    )
}