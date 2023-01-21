import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore/lite';

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
     
}
