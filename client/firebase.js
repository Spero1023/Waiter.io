// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getFirestore, doc, getDoc, setDoc } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCUaOJsunYgbP6yecf_tuVJskloNHtTI6c",
  authDomain: "slack-clone-1cf69.firebaseapp.com",
  projectId: "slack-clone-1cf69",
  storageBucket: "slack-clone-1cf69.appspot.com",
  messagingSenderId: "1042383324346",
  appId: "1:1042383324346:web:d489a7d7ab42e13ac8ee83"
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };