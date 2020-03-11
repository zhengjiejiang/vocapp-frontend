import React, { Component } from "react";
import { Link } from "react-router-dom";


export default function LoginComponent(props) {
    const {
        email, password, onEmailChange, onPasswordChange, onClick
    } = props;
    return (
        <div>
            <h1>Login</h1>
            <input
                type="email"
                value={email}
                onChange={ (event)=>onEmailChange(event) }
                placeholder="Email"
            />
            <br />
            <br />
            <input
                type="password"
                value={password}
                onChange={ (event)=>onPasswordChange(event) }
                placeholder="Password"
            />

            <br />
            <br />

            <Link to="/">Back</Link>&nbsp;&nbsp;
            <button onClick={(event)=>onClick(event)}>Submit</button>

        </div>
    );
}
