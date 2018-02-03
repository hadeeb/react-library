import React, {Component} from "react";
import axios from "axios";

class AddAuthor extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        alert(this.refs.authName.value);
        axios.post("/addauthor", {
            name: this.refs.authName.value,
            age: this.refs.authAge.value,
            gender: this.refs.authGender.value,
            born: this.refs.authBorn.value,
            about: this.refs.authAbout.value
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h3>ADD AUTHOR</h3><br/>
                <form onSubmit={this.handleSubmit}>
                    <input ref="authName" placeholder="Author Name"/><br/>
                    <input ref="authAge" type="number" placeholder="Age"/>
                    <select ref="authGender">
                        <option value={1}>Male</option>
                        <option value={2}>Female</option>
                        <option value={3}>Non-binary</option>
                    </select>
                    <br/>
                    <input ref="authBorn" placeholder="Born In"/><br/>
                    <input ref="authAbout" placeholder="About Author"/><br/>
                    <button>Cancel</button>
                    <button type="submit">Save Author</button>
                </form>
            </div>
        );
    }
}

export default AddAuthor;
