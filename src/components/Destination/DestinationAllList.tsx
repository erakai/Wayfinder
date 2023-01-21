import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'

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

export default function DestinationAllList() {
  const [secondary, setSecondary] = React.useState(false);

  return (
    <Box sx={{ flexGrow: 1}}>
      <Grid container spacing={2}>
          <Grid item xs={true} md={true}>
            <Paper sx={{ mt: 4, mb: 2, ml:1, fontWeight: 'bold', width:"auto", boxShadow: 2}} variant="outlined">
              <Typography sx={{ml:2 , fontWeight: 'bold'}} variant="h6" component="div">
                All Destinations
              </Typography>
            </Paper>
            <Paper style={{maxHeight: '75vh', overflow: 'auto'}}>
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