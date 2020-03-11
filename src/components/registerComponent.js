import React, { Component } from "react";
import { Link } from "react-router-dom";


export default function RegisterComponent(props) {
    const {
        email, password, firstName, lastName, onEmailChange, onPasswordChange,
        onFirstNameChange, onLastNameChange, onClick
    } = props;
    return (
        <div>
            <h1>Register</h1>
            <p>Please fill out this form and click submit when ready.</p>
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
            <input
                type="text"
                value={firstName}
                onChange={ (event)=>onFirstNameChange(event) }
                placeholder="First Name"
            />
            <br />
            <br />
            <input
                type="text"
                value={lastName}
                onChange={ (event)=>onLastNameChange(event) }
                placeholder="Last Name"
            />
            <br />
            <br />

            <Link to="/">Back</Link>&nbsp;&nbsp;
            <button onClick={(event)=>onClick(event)}>Submit</button>

        </div>
    );
}
