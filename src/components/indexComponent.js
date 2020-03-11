import React, { Component } from "react";
import { Link } from "react-router-dom";


export default function IndexComponent(props) {
    return (
        <div>
            <h1>Welcome to TreePal!</h1>
            <p>This is an app which helps you track trees you are growing for your business or personal.</p>
            <Link to="/register">Register</Link><br /><br />
            <Link to="/login">Login</Link>
        </div>
    );
}
