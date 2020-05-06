import React from 'react';
import { Button, Input, FormGroup, Form, Alert } from 'reactstrap';
import '../App.css'

class CreateTweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            value: '',
            id: 0,
        }
        this.button = React.createRef();
        this.alert = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.value.length === 0) {
            this.button.setAttribute('disabled', 'disabled');
        } else if (this.state.value.length < 140) {
            let newId = this.state.id
            newId++;
            let newTweet = { id: newId, name: 'david', message: this.state.value, date: new Date().toUTCString() }
            let newTweets = this.state.tweets;
            newTweets.push(newTweet)
            this.setState({ tweets: newTweets, value: '', id: newId })
            this.props.handleTweetSubmit(newTweet);
            this.setState({ showAlert: event.target.value === null ? true : false })
        } else if (this.state.value.length > 140) {
            this.button.setAttribute('disabled', 'disabled');
            this.setState({ showAlert: event.target.value === null ? false : true })
        }
        this.button.removeAttribute('disabled');
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ position: 'relative', width: '50%' }}>
                            <Input type="textarea" name="text" id="tweetTextArea" value={this.state.value} style={{ background: 'black', color: 'white', height: '30vh', resize: "none" }} placeholder="What do you have in mind..." onChange={event => this.setState({ value: event.target.value })} />
                            <Alert color="danger" innerRef={alert => { this.alert = alert }} style={{ position: 'absolute', bottom: 0, left: '1%', display: this.state.showAlert ? "block": "none" }}>The tweet can't contain more than 140 chars.</Alert>
                            <Button type="submit" color="primary" innerRef={button => { this.button = button }} style={{ position: 'absolute', bottom: '7%', right: '1%' }}>Tweet</Button>
                        </div>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default CreateTweet
