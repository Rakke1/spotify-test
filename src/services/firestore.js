import { 
    getFirestore,
    collection,
    getDoc, 
    doc, 
    serverTimestamp,
    setDoc, 
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
  });
};

export const getUser = (userId) => {
  const usersColRef = doc(db, 'users', userId);
  return getDoc(usersColRef);
};
