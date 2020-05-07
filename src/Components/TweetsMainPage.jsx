import React from 'react';
import CreateTweet from './CreateTweet';
import ListOfTweets from './ListOfTweets';
import { getTweets } from '../lib/Api';

class TweetsMainPage extends React.Component {
    constructor(props) {
        super(props);
        const { currentUserName } = props
        this.state = {
            tweets: [],
            name: currentUserName
        }
    }

    componentDidMount = () => {
        this.loadTweets();
    }

    loadTweets = async () => {
        const response = await getTweets();
        this.setState(
            {
                tweets: response.data.tweets
            }
        )
    }

    handleOnTweetSubmit = (value) => {
        this.setState({ tweets: [value, ...this.state.tweets] })
        this.loadTweets()
    }

    render() {
        return (
            <div>
                <CreateTweet currentUserName={this.state.name} handleTweetSubmit={value => this.handleOnTweetSubmit(value)}  />
                <ListOfTweets tweets={this.state.tweets} />
            </div>
        )
    }
}

export default TweetsMainPage
