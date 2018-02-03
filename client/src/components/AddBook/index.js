import React, {Component} from "react";
import axios from "axios";

class AddBook extends Component {
    constructor() {
        super();
        this.authors = null;
        this.state = {loaded: false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetch_details();
    }

    fetch_details() {
        const that = this;
        axios.get('/authorlist')
            .then(function (response) {
                console.log(typeof response.data);
                that.authors = response.data;
                console.log(that.authors);
                that.setState({loaded: true});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post("/addbook", {
            name: this.refs.bookName.value,
            author: this.refs.bookAuthor.value,
            isbn: this.refs.bookISBN.value,
            about: this.refs.bookAbout.value
        })
            .then(function (response) {
                console.log(response);

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        let authorslist = [];
        if (this.state.loaded) {
            for (let author in this.authors) {
                authorslist.push(
                    <option value={this.authors[author].id} key={author}>
                        {this.authors[author].name}
                    </option>
                );
            }
        }
        return (
            <div>
                <h3>ADD BOOK</h3><br/>
                <form onSubmit={this.handleSubmit}>
                    <input ref="bookName" placeholder="Book Name"/><br/>
                    <select ref="bookAuthor">
                        {authorslist}
                    </select>
                    <br/>
                    <input ref="bookISBN" type="number" placeholder="ISBN Number"/><br/>
                    <input ref="bookAbout" placeholder="Description of content"/><br/>
                    <button>Cancel</button>
                    <button type="submit">Add Book</button>
                </form>
            </div>
        );
    }
}

export default AddBook;
