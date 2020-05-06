import React from 'react';
import { Toast, ToastHeader, ToastBody } from 'reactstrap';

function ListOfTweets(props) {
    const { tweets } = props;
    return (
        <div>
            {tweets.map((el, index) => <div style={{ marginTop: "20px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div key={index} className="p-3 my-2 rounded bg-dark" style={{ width: "50%" }}>
                    <Toast>
                        <ToastHeader style={{ color: 'gray', textAlign: 'right', position: 'relative' }}>
                            <span style={{ position: 'absolute', left: 0 }}>
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
