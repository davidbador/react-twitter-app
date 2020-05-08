import React from 'react';
import { Button, Input, FormGroup, Form, Alert } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import '../App.css';
import { sendTweet } from '../lib/Api';
import LoadingIndicator from './LoadingIndicator';
import styles from './CreateTweet.module.css';

class CreateTweet extends React.Component {
    constructor(props) {
        super(props);
        const { currentUserName } = props
        this.state = {
            value: '',
            userName: currentUserName,
            showLoading: false,
            showAlert: false,
            buttonDisabled: false,
            showModal: false,
            modalText: '',
        }
        this.button = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateText = this.updateText.bind(this);
        this.turnOffLoader = this.turnOffLoader.bind(this);
        this.displayError = this.displayError.bind(this);
        this.handleModalShow = this.handleModalShow.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    turnOffLoader = () => {
        setTimeout(() => this.setState({ showLoading: false }), 300)
    }

    handleModalShow = (error) => {
        this.setState({ showModal: true, modalText: error });
    }

    handleModalClose = () => {
        this.setState({ showModal: false });
    }

    displayError = (error) => {
        this.handleModalShow(error)
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { value, userName } = this.state;
        const response = await sendTweet(
            {
                tweet: {
                    content: value,
                    userName: userName,
                    date: new Date().toISOString()
                }
            }, this.turnOffLoader, this.displayError
        );
        this.setState({ showLoading: true, value: '' });
        this.props.handleTweetSubmit(response);
    }

    updateText = (event) => {
        if (event.target.value.length <= 140) {
            this.setState({ buttonDisabled: false, showAlert: false })
        } else {
            this.setState({ buttonDisabled: true, showAlert: true });
        }
        this.setState({ value: event.target.value })
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className={styles.tweetForm}>
                            <Input type="textarea" name="text" id="tweetTextArea" value={this.state.value} style={{ background: 'black', color: 'white', height: '30vh', resize: "none" }} placeholder="What do you have in mind..." onChange={this.updateText} />
                            <Modal show={this.state.showModal} onHide={this.handleModalClose} animation={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title>ERROR!</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>{this.state.modalText}</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={this.handleModalClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            <Alert color="danger" style={{ position: 'absolute', bottom: 0, left: '1%', display: this.state.showAlert ? "block" : "none" }}>The tweet can't contain more than 140 chars.</Alert>
                            <Button type="submit" color="primary" disabled={this.state.buttonDisabled} style={{ position: 'absolute', bottom: '7%', right: '1%' }}>Tweet</Button>
                        </div>
                    </FormGroup>
                </Form>
                <LoadingIndicator showLoading={this.state.showLoading} />
            </div>
        )
    }
}

export default CreateTweet
