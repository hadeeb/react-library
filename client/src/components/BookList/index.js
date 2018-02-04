import React, {Component} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

import AddBook from "../AddBook/index";
import TopBar from "../TopBar/index";

import './style.css';
import booklogo from "../../assets/book_icon.svg";

class BookList extends Component {
    constructor(props) {
        super(props);
        this.books = null;
        this.authors = null;
        this.selectedBook = null;
        this.state = {
            loaded: false,
            redirect: false,
            addbook:false
        };
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
        axios.all([
            axios.request(listreq),
            axios.request(authreq)
        ])
            .then(axios.spread(function (res1, res2) {
                that.books = res1.data;
                that.authors = res2.data;
                that.setState({loaded: true});
            }));
    }

    componentDidMount() {
        this.fetch_details();
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={"/book/" + this.selectedBook}/>;
        }
        const addbtn =
            <button onClick={()=>this.setState({addbook:true})}>Add Book</button>
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
                    <div className="list-item" key={book} onClick={() => this.navigateTo(this.books[book].id)}>
                        <img src={booklogo} alt=""/>
                        <div className="list-content">
                            <div className="booklist-row1">
                                <span className="book-name">
                                    {this.books[book].name}
                                </span>
                                <span className="book-isbn">
                                    ISBN - {this.books[book].isbn}
                                </span>
                            </div>
                            <div>   
                                by 
                                <span className="book-author">{authorname}</span>
                            </div>
                            <div>    
                                {(this.books[book].about).substring(0,100)}...
                                <span className="more-btn">More</span>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        return (
            <div className="component-container">
                <TopBar active="books"/>
                <div className="container">
                    <div className="content-heading">
                        BOOKS
                    </div>
                    <div className="main-content">
                        <div className="list-container">
                            {list}
                        </div>
                        <div className="add-btn">
                            {addbtn}
                        </div>
                    </div>    
                </div>
                <AddBook show={this.state.addbook}/>
            </div>
        );
    }
}

export default BookList;