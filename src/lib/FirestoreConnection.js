import firebase from '../Firestore';
const db = firebase.firestore();

export function getTweetsFirestore() {
    return db.collection("tweets").get()
}

export async function sendTweetFirestore(msg, cbTurnOffSpinner, cbDisplayError) {
    let response = await db.collection("tweets").add(msg)
    try {
        cbTurnOffSpinner()
        return setTimeout(() => response, 2000)
    } catch (error) {
        return cbDisplayError(error)
    }
};