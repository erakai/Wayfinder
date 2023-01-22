/**
 * Firebase API:
 * id ->
 * 	- access (owners) : string ids
 *  - votes : number
 *  - userVotes : string ids
 *  - mapID: string id
 */ 

enum voteStatus {
	UP,
	DOWN,
	NONE,
}

class Destination {
	readonly id: string; // firebase id, if -1 failed to load
	readonly key: number; // id given by mapping
	readonly access : string[];
	userVotes: string[];
	title : string; // title shown
	tags: string[]; // tags
	readonly link: string; // link to map
	votes: number; // # votes given
	voteStatus: voteStatus; // enum of whether the user voted on it

	constructor(i : string, k : string, a: string[], l : string, v : number) {
		this.id = i;
		this.key = k;
		this.access = a;
		this.link = l;
		this.votes = v;

		// firebase query (need kai's stuff)
		this.userVotes = []
		this.title = "Poop"
		this.tags = []
		this.voteStatus = voteStatus.UP;
	}
}

export { Destination }