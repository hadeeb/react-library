import React, {Component} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

class AuthorDetail extends Component {
    constructor(props) {
        super(props);
        this.books = null;
        this.selectedBook = null;
        this.state = {
            loaded: false,
            redirect: false
        };
        this.fetch_details();
    }

    navigateTo(book) {
        this.selectedBook = book;
        this.setState({redirect: true});
    }

    fetch_details() {
        const that = this;
        axios.get('/viewauthor/' + this.props.match.params.id)
            .then(function (response) {
                console.log(typeof response.data);
                that.books = response.data;
                console.log(that.books);
                that.setState({loaded: true});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={"/book/" + this.selectedBook}/>;
        }
        let list = [];
        if (this.state.loaded) {
            for (let book in this.books) {
                list.push(
                    <div key={book} onClick={() => this.navigateTo(this.books[book].id)}>
                        <span>{this.books[book].name}</span>
                        <span>{this.books[book].isbn}</span>
                        <br/>
                        <span>{this.books[book].about}</span>
                        <hr/>
                    </div>
                );
            }
        }
        return (
            <div>
                Books by Author {this.props.match.params.id}
                <hr/>
                <hr/>
                {list}
            </div>
        );
    }
}

export default AuthorDetail;