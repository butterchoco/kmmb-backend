import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";

const firebaseConfig = {
    apiKey: "AIzaSyDwznJicQdI0uW5l8cFfGrvPkIz1mU61HM",
    authDomain: "kmmb-website.firebaseapp.com",
    databaseURL: "https://kmmb-website.firebaseio.com",
    projectId: "kmmb-website",
    storageBucket: "kmmb-website.appspot.com",
    messagingSenderId: "194072045471",
    appId: "1:194072045471:web:4f2182e4a3939cc1f2ffaa",
    measurementId: "G-JGKG70551V",
};
  
const Firebase = !firebase.apps.length
? firebase.initializeApp(firebaseConfig)
: firebase.app();

const db = Firebase.firestore();
const auth = Firebase.auth();
const storage = Firebase.storage();
const functions = Firebase.functions();

export {auth, db, storage, functions};
