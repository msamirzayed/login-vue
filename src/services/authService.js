/* eslint-disable no-useless-catch */
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyBDQUZy43dMNR4xYGPdW6MQuqpHHtego8k",
  authDomain: "veautify-23db0.firebaseapp.com",
  projectId: "veautify-23db0",
  storageBucket: "veautify-23db0.appspot.com",
  messagingSenderId: "978004094329",
  appId: "1:978004094329:web:0aaaa281a33d76882013a8",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export async function login(credentials) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );
    const idToken = await userCredential.user.getIdToken();
    localStorage.setItem("authToken", idToken);
    const uid = userCredential.user.uid;
    localStorage.setItem("uid", uid);
    return { user: userCredential.user, token: idToken };
  } catch (error) {
    throw error;
  }
}

export async function signup(credentials, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );
    const idToken = await userCredential.user.getIdToken();
    const uid = userCredential.user.uid;
    localStorage.setItem("uid", uid);
    const userData = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      name: name,
    };
    localStorage.setItem("authToken", idToken);
    await axios.post(
      "https://veautify-23db0-default-rtdb.firebaseio.com/users.json",
      userData
    );
    return { user: userCredential.user, token: idToken };
  } catch (error) {
    throw error;
  }
}
