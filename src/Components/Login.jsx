import React, { useState } from 'react';
import firebase, { signInWithGoogle } from '../Firestore';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import styles from './Login.module.css';

const Login = () => {
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email, password)
    }

    const handleSignup = (event) => {
        event.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
            return firebase.firestore().collection('users').doc(cred.user.uid).set({
                uid: cred.user.uid,
                userName: 'Anonymous',
                email: email,
                photo: ''
            })
        })
    }

    const handleGoogleLogIn = (event) => {
        event.preventDefault();
        signInWithGoogle()
    }

    return (
        <Form className={styles.loginWrapper}>
            <FormGroup>
                <div className={styles.inputTitle}>Email</div>
                <Input className={styles.inputArea} type="email" value={email} onChange={event => updateEmail(event.target.value)} />
            </FormGroup>
            <FormGroup>
                <div className={styles.inputTitle}>Password</div>
                <Input className={styles.inputArea} type="password" value={password} onChange={event => updatePassword(event.target.value)} />
            </FormGroup>
            <div className={styles.buttonsWrapper}>
                <Button className={styles.button} type="submit" color="primary" onClick={handleLogin}>Login</Button>
                <Button className={styles.button} color="primary" onClick={handleSignup}>Signup</Button>
                <Button className={styles.button} color="primary" onClick={handleGoogleLogIn}>Log in with Google</Button>
            </div>
        </Form>
    )
}

export default Login
