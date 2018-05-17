import React, {Component} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

import TopBar from "../TopBar/index";

import "./style.css";
import authorlogo from "../../assets/author_icon.svg";
import booklogo from "../../assets/book_icon.svg";

class AuthorDetail extends Component {
    constructor(props) {
        super(props);
        this.books = null;
        this.author = null;
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
            url: '/viewauthor/' + this.props.match.params.id,
            method: 'get'
        };
        let authreq = {
            url: '/authorprofile/' + this.props.match.params.id,
            method: 'get'
        };
        axios.all([
            axios.request(listreq),
            axios.request(authreq)
        ])
            .then(axios.spread(function (res1, res2) {
                that.books = res1.data;
                that.author = res2.data[0];
                console.log(res2.data[0]);
                that.setState({loaded: true});
            }));
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={"/book/" + this.selectedBook}/>;
        }
        let detail = [];
        if (this.state.loaded) {
            let list =[];
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
                                {(this.books[book].about).substring(0,100)}...
                                <span className="more-btn">More</span>
                            </div>
                        </div>    
                    </div>
                );
            }
            let gender = "";
                switch (this.author.gender) {
                    case 1:
                        gender = "Male";
                        break;
                    case 2:
                        gender = "Female";
                        break;
                    case 3:
                        gender = "Other";
                        break;
                    default:
                        gender = " "
                }
            detail = (
                <div className="detail-container">
                    <img src={authorlogo} alt=""/>
                    <div className="author-details">
                        <div className="list-header">
                            <div className="authorlist-row1">
                                <span className="author-name">{this.author.name}</span>
                                <span> Born in {this.author.born}</span>
                            </div>
                            <div className="authorlist-row2">
                                <span>Age {this.author.age}</span> /
                                <span> {gender}</span>
                            </div>
                            <div className="">
                                <span>{this.author.about}</span>
                            </div>
                        </div>
                        <div className="author-noofbooks">
                        <span>BOOKS WRITTEN &emsp;</span>{this.books.length}
                        </div>
                        <div className="list-container">
                                    {list}
                        </div>
                    </div>
                </div>    
            );
            
        }
        return (
            <div className="component-container">
                <TopBar active="authors"/>
                <div className="container">
                    <div className="content-heading">
                        BOOKS
                    </div>
                    <div className="main-content">
                        {detail}
                        <div className="nav-btns">
                        <div>&lArr;</div>
                        <div>&rArr;</div>
                        </div>
                    </div>
                </div>        
            </div>
        );
    }
}

export default AuthorDetail;
