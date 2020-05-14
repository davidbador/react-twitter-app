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
export const auth = firebase.auth()

const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider()
export function signInWithGoogle() {
    auth.signInWithPopup(provider).then(cred => {
        return firebase.firestore().collection('users').doc(cred.user.uid).set({
            uid: cred.user.uid,
            userName: cred.user.displayName,
            email: cred.user.email,
            photo: cred.user.photoURL,
        })
    })
}

export {
    storage, firebase as default
}
