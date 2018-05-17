import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

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
        this.closeModal = this.closeModal.bind(this);
    }

    navigateTo(book) {
        this.selectedBook = book;
        this.setState({redirect: true});
    }

    fetch_details() {
        const that = this;
        axios.get('/booklist')
            .then(function(response) {
                that.books = response.data;
                that.setState({loaded: true});
            })
    }

    componentDidMount() {
        this.fetch_details();
    }
    closeModal(added) {
        this.setState({addbook:false});
        if(added) {
            this.fetch_details();
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={"/book/" + this.selectedBook}/>;
        }
        const addbtn =
            <button onClick={()=>this.setState({addbook:true})}>Add Book</button>
        ;
        let list = <div className="list-item">Loading</div>;
        if (this.state.loaded) {
            list = [];
            for (let book in this.books) {
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
                                <span className="book-author">{this.books[book].author}</span>
                            </div>
                            <div>    
                                {(this.books[book].about).substring(0,100)}...
                                <span className="more-btn">More</span>
                            </div>
                        </div>
                    </div>
                );
            }
            if(this.books.length === 0) {
                list = <div className="list-item">No Books</div>;
            }
        }
        return (
            <div className="component-container">
                <TopBar active="books"/>
                <div className="container">
                    <div className="content-heading">
                        <span className="heading-text">BOOKS</span>
                        <span className="heading-book-count">{this.state.loaded?this.books.length+' Books':''}</span>
                        <span  className="heading-spacer"/>
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
                {this.state.addbook?<AddBook close={this.closeModal}/>:""}
            </div>
        );
    }
}

export default BookList;