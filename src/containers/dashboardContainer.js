import React, { Component } from "react";

import DashboardComponent from "../components/dashboardComponent";


export default class DashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.state ={
        };
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick(event) {
        event.preventDefault();
        //TODO: Handle logging out of the system for the user.
        this.props.history.push("/login");
    }
    render() {
        const { onLogoutClick } = this;
        return (
            <DashboardComponent
                onLogoutClick={onLogoutClick}
            />
        );
    }
}
