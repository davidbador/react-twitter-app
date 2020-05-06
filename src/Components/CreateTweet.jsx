import React from 'react';
import { Button, Input, FormGroup, Form, Alert } from 'reactstrap';
import '../App.css';
import { sendTweet } from '../lib/Api';
import LoadingIndicator from './LoadingIndicator';

class CreateTweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            name: 'david',
            showLoading: false,
        }
        this.button = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        setTimeout(() => this.setState({ showLoading: false }), 300)
        setTimeout((() => this.button.removeAttribute('disabled')), 300)
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { value, name } = this.state
        if (this.state.value.length === 0) {
            this.button.setAttribute('disabled', 'disabled');
        } else if (this.state.value.length < 140) {
            try {
                this.button.setAttribute('disabled', 'disabled');
                const response = await sendTweet(
                    {
                        tweet: {
                            content: value,
                            userName: name,
                            date: new Date().toISOString()
                        }
                    }
                );
                this.setState({ showLoading: true });
                this.setState({ value: '' })
                this.props.handleTweetSubmit(response);
                this.setState({ showAlert: false })
            } catch (error) {
                console.log(error);
            }
        } else if (this.state.value.length > 140) {
            this.button.setAttribute('disabled', 'disabled');
            this.setState({ showAlert: true })
        }
        this.componentDidMount()
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ position: 'relative', width: '50%' }}>
                            <Input type="textarea" name="text" id="tweetTextArea" value={this.state.value} style={{ background: 'black', color: 'white', height: '30vh', resize: "none" }} placeholder="What do you have in mind..." onChange={event => this.setState({ value: event.target.value })} />
                            <Alert color="danger" style={{ position: 'absolute', bottom: 0, left: '1%', display: this.state.showAlert ? "block" : "none" }}>The tweet can't contain more than 140 chars.</Alert>
                            <Button type="submit" color="primary" innerRef={button => { this.button = button }} style={{ position: 'absolute', bottom: '7%', right: '1%' }}>Tweet</Button>
                        </div>
                    </FormGroup>
                </Form>
                <LoadingIndicator showLoading={this.state.showLoading} />
            </div>
        )
    }
}

export default CreateTweet
