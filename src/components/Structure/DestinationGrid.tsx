import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import DestinationAllList from "../Destination/DestinationAllList"
import DestinationMyList from "../Destination/DestinationMyList"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '80vh'
}));

export default function DestinationGrid() {
  return (
    <Grid container spacing={2} sx={{overflow: 'auto' }}>
      <Grid xs={true} md={true}>
        <DestinationAllList />
      </Grid>
      <Grid xs={6} md={4}>
        <DestinationMyList />
      </Grid>
    </Grid>
  )
}