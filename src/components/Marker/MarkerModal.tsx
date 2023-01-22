import { Backdrop, Box, Container, Fade, InputAdornment, Modal, TextField, Typography } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
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
                            marginLeft: "5px", 
                            marginRight: "5px",
                            justifyContent: "start",
                            alignItems: "center",
                            textAlign: "center",
                            minHeight: "80",
                        }}>
                            <Container>
                                <TextField style={{"marginBottom": "5px"}} margin="normal" 
                                id="standard-basic" label="Marker Name" variant="standard" defaultValue={markers[idx].name} disabled={!editable}
                                InputProps={{ startAdornment: (
                                    <InputAdornment position="start">
                                            <StarIcon />
                                    </InputAdornment>)}}/>
                                <TextField
                                style={{"marginTop": "20px", "marginBottom": "20px"}} 
                                id="outlined-multiline-static"
                                label="Info"
                                multiline
                                rows={10}
                                disabled={!editable}
                                />
                                <TextField disabled={!editable} style={{"marginBottom": "20px"}} label="Link" variant="outlined" />
                            </Container>
                        </div> 
                    </Box>
                </Fade>
            : <div></div>
            }
            
        </Modal>
    )
}