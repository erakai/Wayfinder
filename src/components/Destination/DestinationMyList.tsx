import * as React from 'react';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

import DestinationCard from "./DestinationCard";

import { Destination } from "./API/Destination";

function generate(element: React.ReactElement) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

type DestinationMyListProps = {
  dests: Destination[]
}

export default function DestinationMyList({dest} : DestinationMyListProps) {
  const [secondary, setSecondary] = React.useState(false);

  return (
    <Box sx={{ flexGrow: 1}}>
      <Grid container spacing={2}>
        <Grid item xs={true} md={true}>
          <Grid container>
            <Grid item xs={true}>
              <Paper sx={{ mt: 4, mb: 2, ml:1, fontWeight: 'bold', width: "100%", boxShadow: 2}} variant="outlined">
              <Typography sx={{ml:2 , fontWeight: 'bold'}} variant="h6" component="div">
                My Destinations
              </Typography>
            </Paper>
            </Grid>                          
            <Grid item xs={3}>                                 
              <Grid container direction="row-reverse" sx={{width: 'auto'}}>      
                <Grid item>
                  <Button component={Link} to="/editor" sx={{mt: 4, mb: 3}} variant="contained" color="success">New Map</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Paper style={{maxHeight: '70vh', overflow: 'auto'}}>
            <List>
              {generate(
                <DestinationCard />
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}