import React, { useState, useEffect, useContext } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import '../App.css';
import styles from './ProfilePage.module.css';
import AppContext from '../AppContext';
import firebase from '../Firestore';
import { storage } from '../Firestore';

const ProfilePage = () => {
    const [showModal, updateModal] = useState(false);
    const [value, updateUserName] = useState('');
    const [image, updateImage] = useState('');
    const [url, updateURL] = useState('');

    useEffect(() => {
        getPicture()
    })

    const context = useContext(AppContext)

    const handleModalShow = () => {
        updateModal(true);
    }

    const handleFileChange = (event) => {
        if (event.target.files[0]) {
            const image = event.target.files[0];
            updateImage(() => image)
        }
    }

    const handleUpload = (event) => {
        event.preventDefault()
        const uploadTask = storage.ref(`images/${context.user.uid}`).put(image)
        uploadTask.on('state_changed', (snapshot) => {
            console.log(snapshot)
        }, (err) => {
            console.log(err)
        }, () => {
            storage.ref('images').child(context.user.uid).getDownloadURL().then(url => {
                updateURL(url)
                updateProfilePicture()
            })
        })
    }

    const handleModalClose = () => {
        updateModal(false)
    }

    const updateFireName = () => {
        firebase.firestore().collection('users').doc(context.user.uid).update({ userName: value })
    }

    const updateProfilePicture = () => {
        firebase.firestore().collection('users').doc(context.user.uid).update({ photo: url })
    }

    const submitUserName = (event, fc) => {
        event.preventDefault()
        if (value.length > 0) {
            updateUserName(event.target.value)
            updateFireName()
            fc(value)
        } else {
            handleModalShow()
        }
    }

    const getPicture = () => {
        firebase.firestore().collection('users').doc(context.user.uid).get().then((doc) => {
            updateURL(doc.data().photo)
        })
    }

    return (
        <AppContext.Consumer>
            {appContext => (
                <div className={styles.profilePageWrapper} >
                    <Form className={styles.profilePageForm} onSubmit={(event) => submitUserName(event, appContext.currentUserName)}>
                        <FormGroup>
                            <div className={styles.profilePageTitle}>Profile</div>
                            <Modal show={showModal} onHide={handleModalClose} animation={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title>ERROR!</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Please enter a User Name!</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary" onClick={handleModalClose}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                            <div className={styles.profilePageUserNameTitle}>User Name</div>
                            <Input value={value} type="text" className={styles.profilePageInput} onChange={event => updateUserName(event.target.value)} />
                            <Button type="submit" className={styles.profilePageButton} color="primary">Save</Button>
                        </FormGroup>
                    </Form>
                    <Form onSubmit={handleUpload}>
                        <FormGroup>
                            <div className={styles.uploadTitle}>Upload Profile Picture</div>
                            <Input type="file" onChange={handleFileChange} />
                            <Button className={styles.uploadImageButton} color="primary">Upload</Button>
                        </FormGroup>
                    </Form>
                    <img src={url} alt="profile" style={{ width: '300px', height: '400px' }} />
                </div>
            )}
        </AppContext.Consumer>
    )
}

export default ProfilePage
