import firebase from 'firebase/app';
import 'firebase/auth';

import 'firebase/app'
import 'firebase/firestore';

import firebaseConfig from './FirebaseConfig.js';

// Initialize Firebase
if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

export {
    auth,
    db
}