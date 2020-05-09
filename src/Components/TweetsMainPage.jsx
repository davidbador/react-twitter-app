import React from 'react';
import CreateTweet from './CreateTweet';
import ListOfTweets from './ListOfTweets';

class TweetsMainPage extends React.Component {
    render() {
        return (
            <div>
                <CreateTweet />
                <ListOfTweets />
            </div>
        )
    }
}

export default TweetsMainPage
