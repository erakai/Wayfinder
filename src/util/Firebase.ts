import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged, OAuthCredential } from "firebase/auth";

import { refreshAuth } from "../views/Root/Root"

import { createWayfinderAlert } from "../components/Structure/AlertList";

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
const provider = new GoogleAuthProvider();

var firebase_auth = getAuth();
export { firebase_auth }

onAuthStateChanged(firebase_auth, (user) => {
  if (user) {
    refreshAuth(true)
  } else {
    refreshAuth(false)
  }
});

export async function popupLogin() {
    signInWithPopup(firebase_auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = (credential as OAuthCredential).accessToken;
            const user = result.user;
            firebase_auth = getAuth();
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            createWayfinderAlert("error", errorMessage);
    });
}

export async function logout() {
    signOut(firebase_auth).then(() => {
        // Sign-out successful.
        createWayfinderAlert("success", "Successful Logout");
        firebase_auth = getAuth();
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        createWayfinderAlert("error", errorMessage);
    });
}

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
