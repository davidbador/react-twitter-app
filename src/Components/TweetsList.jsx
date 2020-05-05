import React from 'react';
import TweetField from './TweetField';
import { Button, Input, FormGroup, Form } from 'reactstrap';

class TweetsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            value: '',
            id: 0,
        };
        this.button = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
            // will grow to be an object
            /*
            {id: number, string
             message:'happpy birthday'
             author: 'Yonatan Ben Dahan'
             date: ()=> Date.now ()
            }

            */
        }
        // this.updateTweets = this.updateTweets.bind(this)
        // this.updateSpecificTweet = this.updateSpecificTweet.bind(this)

    componentDidMount() {
        const saves = localStorage.getItem('tweets');
        const tweets = JSON.parse(saves);
        if (saves) {
            this.setState(() => ({ tweets }))
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.tweets.length !== this.state.tweets.length) {
            const saves = JSON.stringify(this.state.tweets);
            localStorage.setItem('tweets', saves);
        }
    }

    handleChange(event) {
        this.setState({ value: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.value.length === 0) {
            this.button.setAttribute('disabled', 'disabled');
        } else if (this.state.value.length < 140) {
            let newId = this.state.id
            newId++;
            let newTweet = { id: newId, name: 'david', message: this.state.value, date: new Date().toUTCString() }
            let newTweets = [...this.state.tweets];
            newTweets.push(newTweet)
            this.setState({ tweets: newTweets, value: '', id: newId })
            // this.props.createTweet(this.state)
        } else if (this.state.value.length > 140) {
            this.button.setAttribute('disabled', 'disabled');
        }
        this.button.removeAttribute('disabled');
    }


    // deleteTweetOnParent = (id) => { 
    //     // find in the tweets array the element with that Id and delete it. //returns the first element that matches the search.
    //     // || filter all the elements in the array whose element.id !== id
    // }

    // updateTweets = (event) => {
    //     this.setState({ ...event })
    // }

    // updateSpecificTweet = (id, content) => {
    //     console.log('tweet updated')
    //     console.log(id, content)
    // }

    render() {
        return (
            <>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ position: 'relative', width: '50%' }}>
                            <Input type="textarea" name="text" id="tweetTextArea" value={this.state.value} style={{ background: 'black', color: 'white', height: '30vh', resize: "none" }} placeholder="What do you have in mind..." onChange={this.handleChange} />
                            <Button type="submit" color="primary" innerRef={button => { this.button = button }} style={{ position: 'absolute', bottom: '7%', right: '1%' }}>Tweet</Button>
                        </div>
                    </FormGroup>
                </Form>
                {this.state.tweets.reverse().map((el) => {
                    return <TweetField
                        tweetInfo={el}
                        key={el.id}
                    // updateTweetText={this.updateSpecificTweet}
                    ></TweetField>
                })}
            </>
        )
    }
}

export default TweetsList
