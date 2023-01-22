import  React, { useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import WayfinderAlert from "./Alert"

function createWayfinderAlert() {

}

type AlertValues = {
	type : string,
	message : string
}

function generate(element: React.ReactElement, alertValues: AlertValues[]) {
  return alertValues.map((value) =>
  	<ListItem alignItems="flex-start">
	    {React.cloneElement(element, {
	    	type: value.type,
	    	message: value.message,  
	    })}
	</ListItem>
  );
}

function AlertList() {
	const [alerts, setAlerts] = useState<AlertValues[]>([]);

	function addAlert(alertValue: AlertValues) {
		setAlerts(prevAlerts => [...prevAlerts, alertValue])
	}

	return (
		<div id="alert-list">
			<style>
		        {
		          `#alert-list {
		              height: 2vh;
		              display: flex;
  					  justify-content: center;
		              position:fixed;
		              top: 5%;
		              width: 50vw;
					  left: 50%;
					  transform: translate(-50%, -5%);
		              z-index: 3; /* Set z-index to 0 as it will be on a layer below the contact form */
		            }`
		        }
	      	</style>
	      	<Grid
			  container
			  spacing={0}
			  direction="column"
			  alignItems="center"
			  justifyContent="center"
			>
			<List sx={{maxWidth: "50%", maxHeight: "20%"}}>
		      {generate(
		      		<WayfinderAlert />, alerts
		  		)}
		    </List>
		    </Grid>	
		</div>
	)
}

export {AlertList, createWayfinderAlert}