import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD6-Do0IyH9n8o2cyrNzkKph6sqjvwpSAU",
    authDomain: "netflix-clone-3fbf9.firebaseapp.com",
    projectId: "netflix-clone-3fbf9",
    storageBucket: "netflix-clone-3fbf9.firebasestorage.app",
    messagingSenderId: "350714737242",
    appId: "1:350714737242:web:f6be528d447eb7a1f75e63"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const logout = async () => {
    signOut(auth)
}

export { auth, db, signup, login, logout };