import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import { Form, Header, Image } from "semantic-ui-react";
import { Container, Col, Row } from 'react-bootstrap';

const Login = ({ onLogin }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [badPassword, setBadPassword] = useState(false);

    const onSubmit = (event) => {
        event.preventDefault();

        const user = new CognitoUser({
            Username: username,
            Pool: UserPool,
        })

        const authDetails = new AuthenticationDetails({
            Username: username,
            Password: password,
        })

        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                setBadPassword(false);
                console.log("onSuccess: ", data);
                onLogin();
            },
            onFailure: (err) => {
                console.error("onFailure: ", err);
                setBadPassword(true);
                shakeElement();
            },
            newPasswordRequired: (data) => {
                setBadPassword(false);
                console.log("newPasswordRequired: ", data);
            }
        });

    };

    // Apply shake css to form
    function shakeElement() {
        const element = document.querySelector('.loginForm');
        element.classList.add('shake');

        setTimeout(() => {
            element.classList.remove('shake');
        }, 800);
    }

    return (
        <div>
            <Container>
                <Row>
                    <Form className="loginForm" onSubmit={onSubmit}>
                    <Header>Blog Portal</Header>
                        <label>Username</label>
                        <input required value={username} onChange={(event) => setUsername(event.target.value)}></input>
                        <label>Password</label>
                        <input required type="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                        <Form.Button color="blue" style={{marginTop: '15px'}} type="submit">Login</Form.Button>
                    </Form>
                </Row>
                <Row>
                    <span className="incorrectPassword" style={{textAlign: 'center'}}>
                    {badPassword && <label style={{marginTop: '10px', color: 'red'}}>*Incorrect password or username</label>}
                    </span>
                </Row>
            </Container>
        </div>
    )
}

export default Login;