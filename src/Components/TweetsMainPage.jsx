import React from 'react';
import CreateTweet from './CreateTweet';
import ListOfTweets from './ListOfTweets';

class TweetsMainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: []
        }
    }

    componentDidMount = () => {
        const saves = localStorage.getItem('tweets');
        const tweets = JSON.parse(saves);
        if (saves) {
            this.setState(() => ({ tweets }))
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.tweets.length !== this.state.tweets.length) {
            const saves = JSON.stringify(this.state.tweets);
            localStorage.setItem('tweets', saves);
        }
    }

    handleOnTweetSubmit = (value) => {
        this.setState({ tweets: [value, ...this.state.tweets] })
    }

    render() {
        return (
            <div>
                <CreateTweet handleTweetSubmit={value => this.handleOnTweetSubmit(value)} />
                <ListOfTweets tweets={this.state.tweets} />
            </div>
        )
    }
}

export default TweetsMainPage
