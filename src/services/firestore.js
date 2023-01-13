import { 
    getFirestore,
    collection,
    getDoc, 
    doc, 
    serverTimestamp,
    setDoc,
    arrayUnion,
    updateDoc, 
} from "firebase/firestore";
import { getAuth, signInAnonymously} from "firebase/auth";
import { app } from "./firebase";

const db = getFirestore(app);

export const authenticateAnonymously = () => {
  return signInAnonymously(getAuth(app));
};

export const createUser = (userId, code) => {
  const usersColRef = collection(db, 'users');
  return setDoc(doc(usersColRef, userId), {
    firstLogin: serverTimestamp(),
    userId: userId,
    code: code,
    favorite: [],
  });
};

export const getUser = (userId) => {
  const usersColRef = doc(db, 'users', userId);
  return getDoc(usersColRef);
};

export const addUserFavourite = (userId, favouriteData) => {
  const groceryDocRef = doc(db, 'users', userId)
  return updateDoc(groceryDocRef, {
    favorite: arrayUnion(favouriteData)
  });
};
