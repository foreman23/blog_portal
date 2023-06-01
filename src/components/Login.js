import React, { useState, useContext } from "react";
import { AccountContext } from "./Account";
import { Form, Header, Image } from "semantic-ui-react";
import { Container, Col, Row } from 'react-bootstrap';

const Login = ({ onLogin }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [badPassword, setBadPassword] = useState(false);

    // Button load state
    const [buttonLoad, setButtonLoad] = useState(false);

    const loadOn = () => {
        if (buttonLoad === false) {
            setButtonLoad(true);
        }
    }

    const loadOff = () => {
        if (buttonLoad === true) {
            setButtonLoad(false);
        }
    }

    const { authenticate } = useContext(AccountContext);

    const onSubmit = (event) => {
        event.preventDefault();
        loadOn();

        authenticate(username, password)
            .then(data => {
                console.log("logged in", data);
                window.location.replace('/');
            })
            .catch(err => {
                console.error("login failed", err);
                setBadPassword(true);
                setButtonLoad(false);
                shakeElement();
            })

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
                        <Form.Button loading={buttonLoad} color="blue" style={{marginTop: '15px'}} type="submit">Login</Form.Button>
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