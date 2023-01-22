import { Backdrop, Box, Container, Fade, InputAdornment, Modal, TextField, Typography } from "@mui/material"
import RoomIcon from '@mui/icons-material/Room';
import { BlockPicker, CirclePicker, SliderPicker } from "@hello-pangea/color-picker";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
}

type MarkerModalProps = {
    editable: boolean
    modalOpen: boolean
    handleModalClose: () => void
    setMarkers: React.Dispatch<React.SetStateAction<SerializableMarker[]>>,
    markers: SerializableMarker[]
    idx: number
}

export default function MarkerModal({editable, modalOpen, handleModalClose, setMarkers, markers, idx}: MarkerModalProps) {

    const onNameChange = (e: any) => {
        let newMarkers = markers
        newMarkers[idx].name = e.target.value
        setMarkers(newMarkers)
    }

    const onInfoChange = (e: any) => {
        let newMarkers = markers
        newMarkers[idx].info = e.target.value
        setMarkers(newMarkers)
    }

    const onLinkChange = (e: any) => {
        let newMarkers = markers
        newMarkers[idx].link = e.target.value
        setMarkers(newMarkers)
    }
    
    const onColorChange = (e: any) => {
        if (editable) {
            let newMarkers = markers
            newMarkers[idx].color = e.hex
            setMarkers(newMarkers)
        }
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={modalOpen}
            onClose={handleModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            {(idx >= 0) ?
                <Fade in={modalOpen}>
                    <Box sx={style}>
                        <div style={{
                            padding: '5px',
                            marginTop: '5px',
                            justifyContent: "start",
                            alignItems: "center",
                            textAlign: "center",
                            minHeight: "80",
                        }}>
                            <Container>
                                <TextField fullWidth style={{"marginBottom": "5px"}} margin="normal" onChange={onNameChange}
                                id="standard-basic" label="Marker Name" variant="standard" defaultValue={markers[idx].name} disabled={!editable}
                                InputProps={{ startAdornment: (
                                    <InputAdornment position="start">
                                            <RoomIcon />
                                    </InputAdornment>)}}/>
                                <TextField fullWidth onChange={onInfoChange}
                                style={{"marginTop": "20px", "marginBottom": "20px"}} 
                                id="outlined-multiline-static"
                                label="Info"
                                multiline
                                rows={10}
                                defaultValue={markers[idx].info}
                                disabled={!editable}
                                />
                                <TextField fullWidth disabled={!editable} onChange={onLinkChange} defaultValue={markers[idx].link}
                                    style={{"marginBottom": "20px"}} label="Link" variant="outlined" />
                                <SliderPicker color={markers[idx].color} onChange={onColorChange}></SliderPicker>
                            </Container>
                        </div> 
                    </Box>
                </Fade>
            : <div></div>
            }
            
        </Modal>
    )
}