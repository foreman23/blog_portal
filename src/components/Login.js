import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import { Form, Header, Image } from "semantic-ui-react";
import { Container, Col, Row } from 'react-bootstrap';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
                console.log("onSuccess: ", data);
            },
            onFailure: (err) => {
                console.error("onFailure: ", err);
            },
            newPasswordRequired: (data) => {
                console.log("newPasswordRequired: ", data);
            }
        });

    };

    return (
        <div>
            <Container>
                <Row>
                    <Form className="loginForm" onSubmit={onSubmit}>
                    <Header>Blog Portal</Header>
                        <label>Username</label>
                        <input value={username} onChange={(event) => setUsername(event.target.value)}></input>
                        <label>Password</label>
                        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                        <Form.Button color="blue" style={{marginTop: '15px'}} type="submit">Login</Form.Button>
                    </Form>
                </Row>
            </Container>
        </div>
    )
}

export default Login;