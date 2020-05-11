import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD1McotxXef3wsarLT5vmJ7RmwDikcrTGg",
    authDomain: "react-twitter-app-davidbador.firebaseapp.com",
    databaseURL: "https://react-twitter-app-davidbador.firebaseio.com",
    projectId: "react-twitter-app-davidbador",
    storageBucket: "react-twitter-app-davidbador.appspot.com",
    messagingSenderId: "242298983492",
    appId: "1:242298983492:web:c0b2f7b1e95c0f5d34d811",
    measurementId: "G-W24TZJCTDV"
}

firebase.initializeApp(config);

export default firebase;
