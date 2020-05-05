import React from 'react';
import { Toast, ToastHeader, ToastBody } from 'reactstrap';

class TweetField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.tweetInfo.message,
        };
    }

    // deleteTweet() {
    //     // id, deleteFunction on the parent.
    // }
    // editTweet(event) { }
    // favouriteTweet(event) { }

    render() {
        return (
            <div style={{ marginTop: "20px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="p-3 my-2 rounded bg-dark" style={{ width: "50%" }}>
                    <Toast>
                        <ToastHeader style={{ color: 'gray', textAlign: 'right', position: 'relative' }}>
                            <span style={{ position: 'absolute', left: 0 }}>
                                {this.props.tweetInfo.name}
                            </span>
                            <span>
                                {this.props.tweetInfo.date}
                            </span>
                        </ToastHeader>
                        <ToastBody style={{ color: 'white', textAlign: 'left', marginTop: '20px' }}>
                            {this.state.value}
                        </ToastBody>
                    </Toast>
                </div>
                {/* <Button type="submit" color="primary" innerRef={button => { this.button = button }}>Change Text</Button>
                <Button type="submit" color="primary" innerRef={button => { this.button = button }}>Delete Tweet</Button> */}
            </div>
        )
    }
}

export default TweetField
