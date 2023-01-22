enum voteStatus {
	UP,
	DOWN,
	NONE,
}

class Destination {
	readonly id: string; // firebase id, if -1 failed to load
	readonly key: number; // id given by mapping
	title : string; // title shown
	tags: string[]; // tags
	readonly link: string; // link to map
	votes: number; // # votes given
	voteStatus: voteStatus; // enum of whether the user voted on it

	constructor(id : string, key : string) {
		this.id = id;
		this.key = key;

		// firebase query
	}
}