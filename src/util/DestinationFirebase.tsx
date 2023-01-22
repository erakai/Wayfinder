/**
 * Firebase API:
 * id ->
 *  - access (owners) : string ids
 *  - votes : number
 *  - userVotes : string ids
 *  - mapID: string id
 */ 
import { getDatabase, ref, child, set, push, get } from "firebase/database";
import { Destination } from "../components/Destination/API/Destination";

const db = getDatabase();

enum DestinationFirebaseStatus {
  SUCCESS,
  FIREBASE_ERROR,
  WAYFINDER_ERROR
}

type DestinationFirebaseResponse = {
  status : DestinationFirebaseStatus,
  message : string,
  destinations : Desintation[]
}

class DestinationFirebase {
  private static instance: DestinationFirebase;

  private constructor() { }""

  public static getInstance(): DestinationFirebase {
      if (!DestinationFirebase.instance) {
          DestinationFirebase.instance = new DestinationFirebase();
      }

      return DestinationFirebase.instance;
  }

  public async readAllDestinations() {
    const dbRef = ref(db);
    const _this = this;
    return new Promise(function (resolve, reject) {
      get(child(dbRef, 'destinations/')).then((snapshot) => {
          if (snapshot.exists()) {
            const from = snapshot.val();
            const dest : Desintation[] = _this.convertFirebaseToDestination(from)

            const response : DestinationFirebaseResponse = {
              status: DestinationFirebaseStatus.SUCCESS,
              message: "Successful Read!",
              destinations: dest
            }
            resolve(from);
          } else {
            const response : DestinationFirebaseResponse = {
              status: DestinationFirebaseStatus.WAYFINDER_ERROR,
              message: "No data avaliable!",
              destinations: []
            }
            reject(response);
          }
        }).catch((error) => {
          const response : DestinationFirebaseResponse = {
            status: DestinationFirebaseStatus.FIREBASE_ERROR,
            message: error.message,
            destinations: []
          }
          reject(response)
      });
    });
  }


  public async writeDestination(dest : Destination) : DestinationFirebaseResponse {
    const writeMethod = dest.id ? set : push;
    return new Promise(function (resolve, reject) {
      writeMethod(ref(db, 'destinations/' + dest.id), {
        access: dest.access,
        votes: dest.votes,
        userVotes: dest.userVotes,
        mapID: dest.link
      }).then(() => {
        const response : DestinationFirebaseResponse = {
          status: DestinationFirebaseStatus.SUCCESS,
          message: "Successful Write!",
          destinations: [dest]
        }
        resolve(response)
      }).catch((error) => {
        const response : DestinationFirebaseResponse = {
          status: DestinationFirebaseStatus.FIREBASE_ERROR,
          message: error.message,
          destinations: [dest]
        }
        reject(response)
      })
    })
  }

  private convertFirebaseToDestination(from : any[]) : Destination[] {
    var dest : Destination[] = [];
    const keys = Object.keys(from);
    var i = 0
    keys.forEach(key => {
      dest.push(new Destination(key, i, from[key].access, from[key].mapID, from[key].votes))
      i++;
    })
    return dest;
  }

}

export { DestinationFirebase }