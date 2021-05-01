import React, {useState} from "react";
import { auth } from "../../FireBase/firebase";
import {Button,Form,Container} from 'react-bootstrap'

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signInWithEmailAndPasswordHandler = (event,email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(res=>{
        }).catch(error => {
            setError("Error signing in with password and email!");
            console.error("Error signing in with password and email", error);
        });
    };

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;

        if(name === 'userEmail') {
            setEmail(value);
        }
        else if(name === 'userPassword'){
            setPassword(value);
        }
    };


    return (
        <Container>
            <h1 className="text-3xl mb-2 text-center font-bold">Sign In</h1>

            <Form>
                {error !== null && <div className = "py-4 bg-red-600 w-full text-danger text-center mb-3">{error}</div>}
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"
                                  name="userEmail"
                                  value = {email}
                                  placeholder="E.g: abcd3@gmail.com"
                                  id="userEmail"
                                  onChange = {(event) => onChangeHandler(event)} />

                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                                  name="userPassword"
                                  value = {password}
                                  id="userPassword"
                                  onChange = {(event) => onChangeHandler(event)}/>
                </Form.Group>

                <Button variant="primary" type="submit" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
                    Sign In
                </Button>
            </Form>
            
        </Container>
    );
};

export default SignIn;
