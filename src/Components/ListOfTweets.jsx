import React from 'react';
import { Toast, ToastHeader, ToastBody } from 'reactstrap';
import styles from './ListOfTweets.module.css';

function ListOfTweets(props) {
    const { tweets } = props;
    return (
        <div>
            {tweets.map((el, index) => <div className={styles.tweetsListWrapper}>
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
    )
}

export default ListOfTweets
