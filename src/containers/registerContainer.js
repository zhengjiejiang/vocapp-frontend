import React, { Component } from "react";

import RegisterComponent from "../components/registerComponent";
import UserDAO from "../models/userDAO";


export default class RegisterContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
        };
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onEmailChange(event) {
        this.setState({
            email: event.target.value,
        })
    }

    onPasswordChange(event) {
        this.setState({
            password: event.target.value,
        })
    }

    onFirstNameChange(event) {
        this.setState({
            firstName: event.target.value,
        })
    }

    onLastNameChange(event) {
        this.setState({
            lastName: event.target.value,
        })
    }

    onClick(event) {
        event.preventDefault();
        const { email, password, firstName, lastName } = this.state;

        //TODO: Validate that `email` is unique.
        //TODO: Force validation for a "secure password".

        const userDAO = new UserDAO();
        userDAO.addObject(email, password, firstName, lastName);

        //TODO: implement `sessionDAO`.

        this.props.history.push("/dashboard");
    }

    render() {
        const { email, password, firstName, lastName } = this.state;
        const { onEmailChange, onPasswordChange, onFirstNameChange, onLastNameChange, onClick } = this;
        return (
            <RegisterComponent
                email={email}
                password={password}
                firstName={firstName}
                lastName={lastName}
                onEmailChange={onEmailChange}
                onPasswordChange={onPasswordChange}
                onFirstNameChange={onFirstNameChange}
                onLastNameChange={onLastNameChange}
                onClick={onClick}
            />
        );
    }
