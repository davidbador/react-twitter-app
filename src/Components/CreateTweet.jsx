import React from 'react';
import { Button, Input, FormGroup, Form, Alert } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import '../App.css';
import styles from './CreateTweet.module.css';
import AppContext from '../AppContext';
import LoadingIndicator from './LoadingIndicator';
import { sendTweetFirestore } from '../lib/FirestoreConnection'

class CreateTweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            showAlert: false,
            buttonDisabled: false,
            showLoading: false,
            showModal: false,
            modalText: '',
        }
        this.button = React.createRef();
        this.updateText = this.updateText.bind(this);
        this.handleModalShow = this.handleModalShow.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.turnOffLoader = this.turnOffLoader.bind(this);
        this.displayError = this.displayError.bind(this);
    }

    static contextType = AppContext;
    updateText = (event) => {
        if (event.target.value.length <= 140) {
            this.setState({ buttonDisabled: false, showAlert: false })
        } else {
            this.setState({ buttonDisabled: true, showAlert: true });
        }
        this.setState({ value: event.target.value })
    }

    handleModalShow = (error) => {
        this.setState({ showModal: true, modalText: error });
    }

    handleModalClose = () => {
        this.setState({ showModal: false });
    }

    turnOffLoader = () => {
        setTimeout(() => this.setState({ showLoading: false }), 1000)
    }

    displayError = (error) => {
        this.handleModalShow(error)
    }

    handleOnSubmit = async (event, fc) => {
        event.preventDefault();
        const { value } = this.state;
        const userRef = sendTweetFirestore({
            content: value,
            userName: this.context.userName,
            date: new Date().toISOString()
        }, this.turnOffLoader, this.displayError)
        this.setState({ showLoading: true, value: '' });
        setTimeout(() => fc(userRef), 1000)
    }

    render() {
        return (
            <AppContext.Consumer>
                {appContext => (
                    <div>
                        <Form onSubmit={(event) => this.handleOnSubmit(event, appContext.handleOnTweetSubmit)}>
                            <FormGroup className={styles.tweetFormGroup}>
                                <div className={styles.tweetForm}>
                                    <Input type="textarea" name="text" id="tweetTextArea" value={this.state.value} className={styles.tweetFormInput} placeholder="What do you have in mind..." onChange={this.updateText} />
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
                                    <Alert color="danger" className={styles.tweetFormAlert} style={{ display: this.state.showAlert ? "block" : "none" }}>The tweet can't contain more than 140 chars.</Alert>
                                    <Button type="submit" color="primary" disabled={this.state.buttonDisabled} className={styles.tweetFormButton}>Tweet</Button>
                                </div>
                            </FormGroup>
                        </Form>
                        <LoadingIndicator showLoading={this.state.showLoading} />
                    </div>
                )}
            </AppContext.Consumer>
        )
    }
}

export default CreateTweet
