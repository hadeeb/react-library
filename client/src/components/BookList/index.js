import React, {Component} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

import AddBook from "../AddBook/index";

class BookList extends Component {
    constructor(props) {
        super(props);
        this.books = null;
        this.authors = null;
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
        let listreq = {
            url: '/booklist',
            method: 'get'
        };
        let authreq = {
            url: '/authorlist',
            method: 'get'
        };
        /*
         axios.get('/booklist')
         .then(function (response) {
         console.log(typeof response.data);
         that.books = response.data;
         console.log(that.books);
         that.setState({loaded:true});
         })
         .catch(function (error) {
         console.log(error);
         })
         */
        axios.all([
            axios.request(listreq),
            axios.request(authreq)
        ])
            .then(axios.spread(function (res1, res2) {
                that.books = res1.data;
                that.authors = res2.data;
                that.setState({loaded: true});
            }))
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={"/book/" + this.selectedBook}/>;
        }
        const addbtn =
            <button>Add Book</button>
        ;
        let list = [];
        if (this.state.loaded) {
            for (let book in this.books) {
                let authorname = "";
                for (let author in this.authors) {
                    if (this.books[book].author === this.authors[author].id) {
                        authorname = this.authors[author].name;
                        break;
                    }
                }
                list.push(
                    <div key={book} onClick={() => this.navigateTo(this.books[book].id)}>
                        <span>{this.books[book].name}</span>
                        <span>{this.books[book].isbn}</span>
                        <br/>
                        <span>By {authorname}</span>
                        <br/>
                        <span>{this.books[book].about}</span>
                        <hr/>
                    </div>
                );
            }
        }
        return (
            <div>
                Books
                <hr/>
                <hr/>
                {list}
                <hr/>
                {addbtn}
                <hr/>
                <AddBook/>
            </div>
        );
    }
}

export default BookList;