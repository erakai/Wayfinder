import { getDatabase, ref, set } from "firebase/database";

const db = getDatabase();

function writeUserData(userId, name, email, imageUrl) {
  
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}