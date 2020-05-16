import React, { useState, useContext } from 'react';
import { Button, Input, FormGroup, Form, Alert } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import '../App.css';
import styles from './CreateTweet.module.css';
import AppContext from '../AppContext';
import LoadingIndicator from './LoadingIndicator';
import { sendTweetFirestore } from '../lib/FirestoreConnection';
import firebase from '../Firestore';

const CreateTweet = () => {
    const [message, updateText] = useState('');
    const [buttonDisabled, updateButton] = useState(false);
    const [showAlert, updateAlert] = useState(false);
    const [showLoading, updateLoading] = useState(false);
    const [showModal, updateModal] = useState(false);
    const [modalText, updateModalText] = useState('');

    const context = useContext(AppContext);

    const handleModalShow = (error) => {
        updateModal(true);
        updateModalText(error);
    }

    const handleModalClose = () => {
        updateModal(false)
    }

    const turnOffLoader = () => {
        setTimeout(() => updateLoading(false), 1000)
    }

    const displayError = (error) => {
        handleModalShow(error)
    }

    const handleOnSubmit = async (event, fc) => {
        event.preventDefault();
        const userRef = await sendTweetFirestore({
            uid: context.user.uid,
            content: message,
            date: new Date().toISOString()
        }, turnOffLoader, displayError)
        updateLoading(true);
        updateText('');
        setTimeout(() => fc(userRef), 1000)
    }
    return (
        <AppContext.Consumer>
            {appContext => (
                <div>
                    <Form onSubmit={(event) => handleOnSubmit(event, appContext.handleOnTweetSubmit)}>
                        <FormGroup className={styles.tweetFormGroup}>
                            <div className={styles.tweetForm}>
                                <Input type="textarea" name="text" id="tweetTextArea" value={message} className={styles.tweetFormInput} placeholder="What do you have in mind..." onChange={event => {
                                    if (event.target.value.length <= 140) {
                                        updateText(event.target.value)
                                        updateButton(false)
                                        updateAlert(false)
                                    } else {
                                        updateText(event.target.value)
                                        updateButton(true)
                                        updateAlert(true)
                                    }
                                }} />
                                <Modal show={showModal} onHide={handleModalClose} animation={false}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>ERROR!</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>{modalText}</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" onClick={handleModalClose}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                <Alert color="danger" className={styles.tweetFormAlert} style={{ display: showAlert ? "block" : "none" }}>The tweet can't contain more than 140 chars.</Alert>
                                <Button type="submit" color="primary" disabled={buttonDisabled} className={styles.tweetFormButton}>Tweet</Button>
                            </div>
                        </FormGroup>
                    </Form>
                    <LoadingIndicator showLoading={showLoading} />
                </div>
            )}
        </AppContext.Consumer>
    )
}

export default CreateTweet
