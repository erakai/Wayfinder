import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import DestinationCard from "./DestinationCard";

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

export default function DestinationMyList() {
  const [secondary, setSecondary] = React.useState(false);

  return (
    <Box sx={{ flexGrow: 1}}>
      <Grid container spacing={2}>
        <Grid item xs={true} md={true}>
          <Grid container>
            <Grid item>
              <Typography sx={{ mt: 4, mb: 2, fontWeight: 'bold'}} variant="h6" component="div">
                  My Destinations
              </Typography>
            </Grid>                          
            <Grid item xs>                                 
              <Grid container direction="row-reverse">      
                <Grid item>
                  <Button sx={{ mt: 3, mb: 3}} variant="contained" color="success">New Map</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Paper style={{maxHeight: '83vh', overflow: 'auto'}}>
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