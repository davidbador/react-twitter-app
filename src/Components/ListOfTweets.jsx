import React from 'react';
import { Toast, ToastHeader, ToastBody } from 'reactstrap';
import styles from './ListOfTweets.module.css';
import AppContext from '../AppContext';

function ListOfTweets() {
    return (
        <AppContext.Consumer>
            {appContext => (
                <div>
                    {appContext.tweets.sort((a, b) => b.date > a.date ? 1 : -1).map((el, index) => <div className={styles.tweetsListWrapper}>
                        <div key={index} className="p-3 my-2 rounded bg-dark" style={{ width: "50%" }}>
                            <Toast>
                                <ToastHeader className={styles.toastHeader}>
                                    <span className={styles.tweetName}>
                                        {el.userName}
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
