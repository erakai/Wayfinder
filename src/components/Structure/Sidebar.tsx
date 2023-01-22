import { Container, InputAdornment, TextField, Typography } from "@mui/material"
import { styled } from "@mui/material";
import PublishButton from "../Misc/PublishButton"
import StarIcon from '@mui/icons-material/Star';

type SidebarProps = {
  editable: boolean,
  publish: () => void
  title: string,
  setTitle: React.Dispatch<React.SetStateAction<string>>,
  center: number[],
  desc: string,
  setDesc: React.Dispatch<React.SetStateAction<string>>,
  city: string,
  setCity: React.Dispatch<React.SetStateAction<string>>,
}

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  // padding: theme.spacing(1),
}));

export default function Sidebar({ editable, publish, title, setTitle, 
                                    center, desc, 
                                    setDesc, city, setCity}: SidebarProps) {

  return (
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
        <div style={{"marginBottom": "20px", "textAlign": "left"}}>
          <Div>{"USER ID:"}</Div>
          <Div>{"USER EMAIL:"}</Div>
        </div>
        <TextField style={{"marginBottom": "5px"}} margin="normal" onChange={(e) => setTitle(e.target.value)} 
          id="standard-basic" label="Project Name" variant="standard" defaultValue={title} disabled={!editable}
          InputProps={{
            startAdornment: (<InputAdornment position="start">
              <StarIcon />
            </InputAdornment>)}}/>
        <Div>{"Center: " + (Math.round(center[0]* 100) / 100).toFixed(2) + ", " + (Math.round(center[1]* 100) / 100).toFixed(2)}</Div>
        <TextField
          style={{"marginTop": "20px", "marginBottom": "20px"}} 
          id="outlined-multiline-static"
          label="Notes"
          multiline
          rows={15}
          defaultValue={desc}
          disabled={!editable}
        />
        <TextField disabled={!editable} style={{"marginBottom": "20px"}} label="City" variant="outlined" />
        <PublishButton editable={editable} publish={publish}/>
      </Container>
    </div>
  )
}