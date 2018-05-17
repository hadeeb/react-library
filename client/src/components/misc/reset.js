import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";

class ResetDB extends Component {
	constructor() {
		super();
		this.state=({loaded:false});
	}
	resetdb() {
		const that = this;
		axios.get("/resetdb")
			.then(function() {
				alert("DB Cleared");
				that.setState({loaded: true});
			});
		console.log("Test");

	}
	componentDidMount() {
        this.resetdb();
    }
	render() {
		if (this.state.loaded) {
            return <Redirect to="/books"/>;
        }
		return <div>Loading</div>;
	}
}

export default ResetDB;
