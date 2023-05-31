import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";

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
        <form onSubmit={onSubmit}>
            <label>Username</label>
            <input value={username} onChange={(event) => setUsername(event.target.value)}></input>
            <label>Password</label>
            <input value={password} onChange={(event) => setPassword(event.target.value)}></input>
            <button type="submit">Login</button>
        </form>
    </div>
)
}

export default Login;