import  React, { useState, useEffect } from 'react'
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import DestinationAllList from "../Destination/DestinationAllList"
import DestinationMyList from "../Destination/DestinationMyList"

import { firebase_auth } from "../../util/Firebase"
import { DestinationFirebase } from "../../util/DestinationFirebase";
import { Destination } from "../Destination/API/Destination"

import { createWayfinderAlert } from "./AlertList";
import useForceUpdate from '../../hooks/useForceUpdate';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '80vh'
}));

export default function DestinationGrid() {
  const [dests, setDests] = useState<Destination[] | null>(null);

  useEffect(() => {
    if (!dests) {
      const promiseDests = DestinationFirebase.getInstance().readAllDestinations();
      promiseDests.then((response) => {
        setDests((response as any).destinations)
      })
      .catch((error) => {
        createWayfinderAlert("error", error.message);
      })
    }
  })

  return (
    <Grid container spacing={2} sx={{overflow: 'auto' }}>
      <Grid xs={true} md={true}>
        <DestinationAllList dests={dests as Destination[]} isPersonal={true}/>
      </Grid>
      {firebase_auth.currentUser ?
      <Grid xs={6} md={4}>
        <DestinationMyList dests={dests as Destination[]} isPersonal={false}/>
      </Grid> : null}
    </Grid>
  )
}