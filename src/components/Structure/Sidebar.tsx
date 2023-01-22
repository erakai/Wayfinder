import { Container, InputAdornment, TextField, Typography } from "@mui/material"
import { styled } from "@mui/material";
import PublishButton from "../Misc/PublishButton"
import StarIcon from '@mui/icons-material/Star';
import { firebase_auth } from "../../util/Firebase";

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
  
  const user: any = firebase_auth.currentUser

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
        <TextField style={{"marginBottom": "5px"}} margin="normal" onChange={(e) => setTitle(e.target.value)} 
          id="standard-basic" label="Project Name" variant="standard" value={title} disabled={!editable}
          InputProps={{
            startAdornment: (<InputAdornment position="start">
              <StarIcon />
            </InputAdornment>)}}/>
        <Div>{"Center: " + (Math.round(center[0]* 100) / 100).toFixed(2) + ", " + (Math.round(center[1]* 100) / 100).toFixed(2)}</Div>
        <TextField
          style={{"marginTop": "20px", "marginBottom": "20px"}} 
          id="outlined-multiline-static"
          label={editable ? "Notes" : ""}
          multiline
          defaultValue={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={15}
          disabled={!editable}
        />
        <TextField defaultValue={city} onChange={(e) => setCity(e.target.value)} disabled={!editable} style={{"marginBottom": "20px"}} label="City" variant="outlined" />
        <PublishButton editable={editable} publish={publish}/>
        <div style={{"marginTop": "20px", "textAlign": "left"}}>
          <Typography variant="subtitle1"> User </Typography>
          {(user) ?
            [
            <Div>{user.displayName}</Div>,
            <Div>{user.email}</Div>
            ] : <div></div>
          }
          
        </div>
      </Container>
    </div>
  )
}