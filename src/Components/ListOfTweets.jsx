import React from 'react';
import AppContext from '../AppContext';
import IndividualTweet from './IndividualTweet';

const ListOfTweets = () => {

    return (
        <AppContext.Consumer>
            {appContext => (
                <div>
                    {appContext.tweets.sort((a, b) => b.date > a.date ? 1 : -1).map((el) => <IndividualTweet key={el.uid} tweet={el} />
                    )}
                </div>
            )}
        </AppContext.Consumer>
    )
}

export default ListOfTweets
