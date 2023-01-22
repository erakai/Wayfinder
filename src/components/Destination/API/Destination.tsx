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
	userUpVotes : string[]
	userDownVotes : string[]
}

class Destination {
	readonly id: ""; // firebase id, if -1 failed to load
	readonly key: number; // id given by mapping
	readonly access : string[];
	userUpVotes: string[];
	userDownVotes: string[];
	votes : number;
	title : string; // title shown
	tags: string[]; // tags
	readonly link: string; // link to map

	constructor(destSeed : DestinationSeed) {
		this.id = destSeed.id;
		this.key = destSeed.key;
		this.access = destSeed.access;
		this.link = destSeed.link;
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
