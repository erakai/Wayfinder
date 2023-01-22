/**
 * Firebase API:
 * id ->
 *  - access (owners) : string ids
 *  - userUpVotes : string ids
 *  - userDownVotes : string ids
 *  - mapID: string id
 */ 
import { getDatabase, ref, child, set, push, get } from "firebase/database";
import { Destination, DestinationSeed } from "../components/Destination/API/Destination";

import { attemptMapFetch } from "./MapFirebase"

const db = getDatabase();

enum DestinationFirebaseStatus {
  SUCCESS,
  FIREBASE_ERROR,
  WAYFINDER_ERROR
}

type DestinationFirebaseResponse = {
  status : DestinationFirebaseStatus,
  message : string,
  destinations : Destination[]
}

class DestinationFirebase {
  private static instance: DestinationFirebase;

  private constructor() { }

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
            const dest : Destination[] = _this.convertFirebaseToDestination(from)

            const response : DestinationFirebaseResponse = {
              status: DestinationFirebaseStatus.SUCCESS,
              message: "Successful Read!",
              destinations: dest
            }
            resolve(response);
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


  public async writeDestination(dest : Destination) : Promise<DestinationFirebaseResponse> {
    const writeMethod = dest.id ? set : push;
    return new Promise(function (resolve, reject) {
      writeMethod(ref(db, 'destinations/' + dest.id), {
        access: dest.access,
        userUpVotes: dest.userUpVotes,
        userDownVotes: dest.userDownVotes,
        mapID: dest.link,
        city: dest.tags,
        title: dest.title,
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
      const destSeed : DestinationSeed = {
        id : key,
        key: String(i),
        // @ts-ignore
        access: from[key].access,
        // @ts-ignore
        link: from[key].mapID,
        // @ts-ignore
        userUpVotes: from[key].userUpVotes,
        // @ts-ignore
        userDownVotes: from[key].userDownVotes,
        // @ts-ignore
        title: from[key].title,
        // @ts-ignore
        city: from[key].city,
      }
      const d = new Destination(destSeed);

      dest.push(d)
      i++;
    })
    return dest;
  }

}

export { DestinationFirebase }