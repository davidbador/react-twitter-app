import React, { useState, useEffect } from 'react';
import { Toast, ToastHeader, ToastBody } from 'reactstrap';
import styles from './ListOfTweets.module.css';
import firebase from '../Firestore';

const IndividualTweet = (props) => {
    const [name, updateName] = useState('');
    const { tweet } = props

    useEffect(() => {
        if (tweet.uid !== undefined) {
            firebase.firestore().collection('users').doc(tweet.uid).get().then((doc) => {
                updateName(doc.data().userName)
            })
        }
    }, [tweet.uid])

    return (
        <div>
            <div className={styles.tweetsListWrapper}>
                <div className="p-3 my-2 rounded bg-dark" style={{ width: "50%" }}>
                    <Toast>
                        <ToastHeader className={styles.toastHeader}>
                            <span className={styles.tweetName} >
                                {name}
                            </span>
                            <span>
                                {tweet.date}
                            </span>
                        </ToastHeader>
                        <ToastBody className={styles.toastBody}>
                            {tweet.content}
                        </ToastBody>
                    </Toast>
                </div>
            </div>
        </div>
    )
}

export default IndividualTweet