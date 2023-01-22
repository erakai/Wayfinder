import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled, useTheme } from '@mui/material/';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link, useNavigate } from 'react-router-dom'

import Map from '../../components/Map/Map';
import Sidebar from './Sidebar';

const drawerWidth = 320;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: 0,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: 0,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop: any) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

type OverlayProps = {
    editable: boolean,
    publish: () => void,
    markers: SerializableMarker[],
    setMarkers: React.Dispatch<React.SetStateAction<SerializableMarker[]>>,
    title: string,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    center: number[],
    setCenter: React.Dispatch<React.SetStateAction<number[]>>,
    desc: string,
    setDesc: React.Dispatch<React.SetStateAction<string>>,
    city: string,
    setCity: React.Dispatch<React.SetStateAction<string>>,
}

export default function Overlay({editable, publish, markers, setMarkers, title, setTitle, 
                                center, setCenter, desc, setDesc, city, setCity}: OverlayProps) {
  const theme = useTheme();
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleGoBack = () => {
    navigate("/") 
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  return (
    <div>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{"backgroundColor": "#f2f5f7"}}open={open}>
        <Toolbar>
          <IconButton onClick={() => setDialogOpen(true)} aria-label="delete" color="primary">
            <KeyboardBackspaceIcon />
          </IconButton>
            <Typography variant="h6" align="center" noWrap sx={{ color: "#212121", flexGrow: 1, fontWeight: 'bold' }} component="div">
            {title}
          </Typography>
          <IconButton
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
          <Map setCenter={setCenter} markers={markers} setMarkers={setMarkers} editable={editable} center={center}/>
      </Main>
      <Drawer
        sx={{
          width: 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon/>
          </IconButton>
          Map Settings
        </DrawerHeader>
        <Divider />
        <Sidebar editable={editable} publish={publish} title={title} setTitle={setTitle} center={center}
                    desc={desc} setDesc={setDesc} city={city} setCity={setCity}/>
      </Drawer>
    </Box>
    <Dialog
    open={dialogOpen}
    onClose={handleCloseDialog}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
      <DialogTitle id="alert-dialog-title">
        {editable ? "Discard current map?" : "Leave currenet map?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {editable ? "You will not be able to return to this map. All current progress will be lost." : "You can return to this map at any time using the link."}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="success" onClick={handleCloseDialog} autoFocus>No</Button>
        <Button color="warning" onClick={handleGoBack}>Yes</Button>
      </DialogActions>
    </Dialog>
  </div>
  );
}
