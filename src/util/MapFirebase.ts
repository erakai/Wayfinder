import { getDatabase, ref, push, onValue, get, child } from "firebase/database";

const db = getDatabase()
const MAP_LINK = 'maps/'

export async function writeMap(map: SerializableMap, owner: string) {
    return await push(ref(db, MAP_LINK), {
        title: map.title,
        desc: map.desc,
        city: map.city,
        center: map.center,
        markers: map.markers,
        owner: owner
    })
}

export async function attemptMapFetch(id: string) {
    const dbRef = ref(db)
    const snapshot = await get(child(dbRef, MAP_LINK + id));
    if (snapshot.exists()) {
        return snapshot.val();
    }
    return 'error';
}

export function attemptMapFetchPromise(id: string) {
    const dbRef = ref(db)
    return new Promise(function (resolve, reject) {
        get(child(dbRef, MAP_LINK + id)).then((snapshot) => {
            if (snapshot.exists()) {
                resolve(snapshot.val());
            }
            reject('error');
        })
    })
}

export function getAllMaps(onMapUpdate: (data: any) => void) {
    const mapRef = ref(db, MAP_LINK)
    onValue(mapRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val()    
            onMapUpdate(data)
        }
        return 'error'
    })
}

export function getAllMapsByUser(uid: string, onUserUpdate: (data: any) => void) {
    const mapRef = ref(db, MAP_LINK)
    onValue(mapRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val()    
            const userMaps: any = {}

            for (const [m, map] of Object.entries(data)) {
                if ((map as any).owner == uid) {
                    userMaps[m] = map
                }
            }
            onUserUpdate(userMaps)
        }
        return 'error'
    })
}