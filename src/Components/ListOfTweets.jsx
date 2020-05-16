import React, { useState } from 'react';
import { Toast, ToastHeader, ToastBody } from 'reactstrap';
import styles from './ListOfTweets.module.css';
import AppContext from '../AppContext';
import firebase from '../Firestore';

const ListOfTweets = () => {
    const [name, updateName] = useState('');

    const getName = (uid) => {
        if (uid !== undefined) {
            firebase.firestore().collection('users').doc(uid).get().then((doc) => {
                updateName(doc.data().userName)
            })
        }
    }

    return (
        <AppContext.Consumer>
            {appContext => (
                <div>
                    {appContext.tweets.sort((a, b) => b.date > a.date ? 1 : -1).map((el) => <div className={styles.tweetsListWrapper}>
                        <div className="p-3 my-2 rounded bg-dark" style={{ width: "50%" }}>
                            <Toast>
                                <ToastHeader className={styles.toastHeader}>
                                    <span className={styles.tweetName} >
                                        {getName(el.uid)}
                                        {name}
                                    </span>
                                    <span>
                                        {el.date}
                                    </span>
                                </ToastHeader>
                                <ToastBody className={styles.toastBody}>
                                    {el.content}
                                </ToastBody>
                            </Toast>
                        </div>
                    </div>)}
                </div>
            )}
        </AppContext.Consumer>
    )
}

export default ListOfTweets
