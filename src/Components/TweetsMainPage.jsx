import React from 'react';
import CreateTweet from './CreateTweet';
import ListOfTweets from './ListOfTweets';

const TweetsMainPage = () => {
    return (
        <div>
            <CreateTweet />
            <ListOfTweets />
        </div>
    )
}

export default TweetsMainPage
