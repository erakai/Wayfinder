/**
 * Firebase API:
 * id ->
 * 	- access (owners) : string ids
 *  - userUpVotes : string ids
 *  - userDownVotes : string ids
 *  - mapID: string id
 */ 
enum voteStatus {
	UP,
	DOWN,
	NONE,
}

type DestinationSeed = {
	id : string,
	key : string,
	access : string[],
	link : string,
	userUpVotes : string[],
	userDownVotes : string[],
	title: string,
	city: string
}

type DestinationCardInfo = {
	key: number,
	link: string,
	isUpVote: boolean,
	isDownVote: boolean,
	votes: number,
	title: string,
	city: string
}

class Destination {
	readonly id: ""; // firebase id, if -1 failed to load
	readonly key: number; // id given by mapping
	readonly access : string[];
	userUpVotes: string[];
	userDownVotes: string[];
	votes : number;
	city: string
	title : string; // title shown
	tags: string[]; // tags
	readonly link: string; // link to map

	constructor(destSeed : DestinationSeed) {
		this.id = destSeed.id;
		this.key = destSeed.key;
		this.access = destSeed.access;
		this.link = destSeed.link;
		this.title = destSeed.title
		this.city = destSeed.city
		
		this.userUpVotes = destSeed.userUpVotes;
		this.userDownVotes = destSeed.userDownVotes;

		const ups = destSeed.userUpVotes ? destSeed.userUpVotes.length : 0;
		const downs = destSeed.userDownVotes ? destSeed.userDownVotes.length : 0;

		this.votes = ups - downs;

		// firebase query (need kai's stuff)
		this.title = ""
		this.tags = []
	}
}

export { Destination, DestinationSeed }
