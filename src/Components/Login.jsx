import React, { useState } from 'react';
import firebase, { signInWithGoogle } from '../Firestore';
import { Form, FormGroup, Input, Button } from 'reactstrap';

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
        <Form>
            <FormGroup>
                <div>Email</div>
                <Input type="email" value={email} onChange={event => updateEmail(event.target.value)} />
            </FormGroup>
            <FormGroup>
                <div>Password</div>
                <Input type="password" value={password} onChange={event => updatePassword(event.target.value)} />
            </FormGroup>
            <Button type="submit" color="primary" onClick={handleLogin}>Login</Button>
            <Button color="primary" onClick={handleSignup}>Signup</Button>
            <Button color="primary" onClick={handleGoogleLogIn}>Log in with Google</Button>
        </Form>
    )
}

export default Login
