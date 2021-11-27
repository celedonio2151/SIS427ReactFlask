import React, { Component } from "react";

export default class PopUp extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return <div>{this.props.message}</div>;
    }
}
