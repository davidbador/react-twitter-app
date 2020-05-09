import React from 'react';
import { Toast, ToastHeader, ToastBody } from 'reactstrap';
import styles from './ListOfTweets.module.css';
import AppContext from '../AppContext';

function ListOfTweets() {
    return (
        <AppContext.Consumer>
            {appContext => (
                <div>
                    {appContext.tweets.map((el, index) => <div className={styles.tweetsListWrapper}>
                        <div key={index} className="p-3 my-2 rounded bg-dark" style={{ width: "50%" }}>
                            <Toast>
                                <ToastHeader style={{ color: 'gray', textAlign: 'right', position: 'relative' }}>
                                    <span className={styles.tweetName}>
                                        {el.userName}
                                    </span>
                                    <span>
                                        {el.date}
                                    </span>
                                </ToastHeader>
                                <ToastBody style={{ color: 'white', textAlign: 'left', marginTop: '20px' }}>
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
