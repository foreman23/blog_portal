import React, { useContext, useState, useEffect } from "react";
import { AccountContext } from "./Account";

const Status = ({ onLogin, onLogout, onStatusChange }) => {
    const [status, setStatus] = useState(false);
    const { getSession, logout } = useContext(AccountContext);

    useEffect(() => {
        getSession()
        .then(session => {
            console.log("Session: ", session);
            setStatus(true);
            onStatusChange(true);
        })
    }, [])

    return <div></div>

}

export default Status;