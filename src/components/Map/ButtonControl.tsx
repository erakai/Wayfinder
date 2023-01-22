import { IconButton, Tooltip } from "@mui/material";
import MyMapControl from "./MyMapControl";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import PushPinIcon from '@mui/icons-material/PushPin';
import RemoveIcon from '@mui/icons-material/Remove';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';

type ButtonControlProps = {
    editable: boolean,
    visibleIcons: boolean,
    onVisibleButtonClick: () => void,
    canAdd: boolean,
    onAddButtonClick: () => void,
    centering: boolean,
    onCenterButtonClick: () => void,
    onRemoveButtonClick: () => void,
    canRemove: boolean
    onGotoClick: () => void
}

export default function ButtonControl({editable, visibleIcons, onVisibleButtonClick, 
                                        canAdd, onAddButtonClick, centering,
                                        onCenterButtonClick, onGotoClick, canRemove, onRemoveButtonClick}: ButtonControlProps) {
    return (
        <MyMapControl  position="BOTTOM_CENTER">
            <Tooltip title="Toggle Places">
                <IconButton color="error" size="large" onClick={onVisibleButtonClick}>
                    {visibleIcons ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
            </Tooltip>
            {editable ? 
            [<Tooltip title="Remove Marker">
                <IconButton color="primary" size="large" onClick={onRemoveButtonClick}>
                    {canRemove ? <MoreHorizIcon /> : <RemoveIcon />}
                </IconButton>
            </Tooltip>,
            <Tooltip title="Add Marker">
                <IconButton color="primary" size="large" onClick={onAddButtonClick}>
                    {canAdd ? <MoreHorizIcon /> : <AddIcon />}
                </IconButton>
            </Tooltip>,
            <Tooltip title="Set Center">
                <IconButton color="secondary" size="large" onClick={onCenterButtonClick}>
                    {centering ? <MoreHorizIcon /> : <PushPinIcon />}
                </IconButton>
            </Tooltip>]
            : <></> }
            <Tooltip title="Go To Center">
                <IconButton color="secondary" size="large" onClick={onGotoClick} >
                    <CallMissedOutgoingIcon />
                </IconButton>
            </Tooltip>
        </MyMapControl>
    )
}