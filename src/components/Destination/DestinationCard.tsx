import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import MapIcon from '@mui/icons-material/Map';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import Typography from "@mui/material/Typography"

export default function DestinationCard() {
	return (
	<ListItem>
		<ListItemAvatar>
			<Avatar sx={{ bgcolor: 'green' }}>
				<MapIcon />
			</Avatar>
		</ListItemAvatar>
		<ListItemText
		primary="Single-line item"
		secondary={'Secondary text'}
		/>
		<ListItem style={{display:'flex', justifyContent:'flex-end', width:'auto'}} >
			<Typography>0</Typography>
		</ListItem>
		<IconButton edge="end" aria-label="upvote">
			<ThumbUpOffAltIcon />
		</IconButton>
		<IconButton edge="end" aria-label="downvote">
			<ThumbDownOffAltIcon />
		</IconButton>
	</ListItem>
	)
}