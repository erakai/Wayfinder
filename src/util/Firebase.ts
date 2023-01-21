import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyDuZpt54LVcberS1qWFgqYIU8Nx1Ek9EWI",
    authDomain: "wayfinder-dc735.firebaseapp.com",
    projectId: "wayfinder-dc735",
    storageBucket: "wayfinder-dc735.appspot.com",
    messagingSenderId: "389717964427",
    appId: "1:389717964427:web:2c3ad6f555d9b6d731c68e"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

type mapGET = {
    id: string
}

async function retrieveMap({id}: mapGET) {
    const path = doc(db, "maps", id)
    const snapshot = await getDoc(path)
    const map = snapshot.data() as SerializableMap

    const markerSnapshots = await getDocs(collection(db, "maps", id))
    let markers = markerSnapshots.docs.map(doc => doc.data())

    map.markers = markers

    return map
}

type mapPOST = {
    map: SerializableMap,
    id: string
}

async function publishMap({map, id}: mapPOST) {
    const path = doc(db, "maps", id)
    
    let title = map.title
    let center = map.center

    await setDoc(path, {
        title, center
    })

    for (const [i, {name, center, info, link}] of map.markers.entries()) {
        const path = doc(db, "maps", id, i) 

        await setDoc(path, {name, center, info, link})
    }
} 
