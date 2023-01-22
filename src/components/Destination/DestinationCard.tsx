import  React, { useState } from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import MapIcon from '@mui/icons-material/Map';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import Typography from "@mui/material/Typography"

import { Destination } from "./API/Destination";
import { firebase_auth } from "../../util/Firebase"
import { DestinationFirebase } from "../../util/DestinationFirebase"
import { Link } from 'react-router-dom';

type DestinationCardProps = {
	dest?: Destination
	isPersonal: boolean
}

enum VoteState {
	UP,
	DOWN,
	NONE
}

export default function DestinationCard({dest, isPersonal} : DestinationCardProps) {
	if (!dest) { return; }
	const isUpVote : boolean = dest.userUpVotes ? dest.userUpVotes.includes(
		(firebase_auth.currentUser as any).uid
	) : false
	const isDownVote : boolean = dest.userDownVotes ? dest.userDownVotes.includes(
		(firebase_auth.currentUser as any).uid
	) : false

	var defaultVoteState = VoteState.NONE
	if (isUpVote) {
		defaultVoteState = VoteState.UP
	} else if (isDownVote) {
		defaultVoteState = VoteState.DOWN
	}
	const [voteState, setVoteState] = useState<VoteState>(defaultVoteState);
	const [voteCount, setVoteCount] = useState(dest.votes);
	
	const recalculateVote = () => {
		dest.userUpVotes = dest.userUpVotes ? dest.userUpVotes : []
		dest.userDownVotes = dest.userDownVotes ? dest.userDownVotes : []

		const ups = dest.userUpVotes.length
		const downs = dest.userDownVotes.length

		setVoteCount(ups - downs);
	}


	const handleUpVote = () => {
		dest.userUpVotes = dest.userUpVotes ? dest.userUpVotes : []
		dest.userDownVotes = dest.userDownVotes ? dest.userDownVotes : []

		const uid = (firebase_auth.currentUser as any).uid
		if (voteState == VoteState.UP) {
			dest.userUpVotes = dest.userUpVotes .filter(item => item !== uid)
			DestinationFirebase.getInstance().writeDestination(dest);
			setVoteState(VoteState.NONE);
			recalculateVote();
			return;
		}
		if (voteState == VoteState.DOWN) {
			dest.userDownVotes = dest.userDownVotes.filter(item => item !== uid)
		}

		dest.userUpVotes.push(uid)
		DestinationFirebase.getInstance().writeDestination(dest);
		setVoteState(VoteState.UP);
		recalculateVote();
	}

	const handleDownVote = () => {
		dest.userUpVotes = dest.userUpVotes ? dest.userUpVotes : []
		dest.userDownVotes = dest.userDownVotes ? dest.userDownVotes : []

		const uid = (firebase_auth.currentUser as any).uid
		if (voteState == VoteState.DOWN) {
			dest.userDownVotes = dest.userDownVotes .filter(item => item !== uid)
			DestinationFirebase.getInstance().writeDestination(dest);
			setVoteState(VoteState.NONE);
			recalculateVote();
			return;
		}
		if (voteState == VoteState.UP) {
			dest.userUpVotes = dest.userUpVotes.filter(item => item !== uid)
		}
		dest.userDownVotes.push(uid)
		DestinationFirebase.getInstance().writeDestination(dest);
		setVoteState(VoteState.DOWN);
		recalculateVote();
	}

	return (
	<ListItem key={dest.key}>
		<ListItemAvatar>
			<Avatar sx={{ bgcolor: 'green' }}>
				<Link to={"/" + dest.link}><MapIcon /></Link>
			</Avatar>
		</ListItemAvatar>
		<ListItemText
		primary={dest.title}
		secondary={dest.tags}
		/>
		{isPersonal ?
		[<ListItem style={{display:'flex', justifyContent:'flex-end', width:'auto'}} >
			<Typography>{voteCount}</Typography>
		</ListItem>,
			<IconButton edge="end" aria-label="upvote" onClick={handleUpVote}>
				{voteState == VoteState.UP ?
					<ThumbUpAltIcon /> :
					<ThumbUpOffAltIcon />
				}
			</IconButton>,
			<IconButton edge="end" aria-label="downvote" onClick={handleDownVote}>
				{voteState == VoteState.DOWN ?
					<ThumbDownAltIcon /> :
					<ThumbDownOffAltIcon />
				}
			</IconButton>]
			: <></>}
	</ListItem>
	)
}