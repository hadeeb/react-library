import React, {Component} from "react";
import axios from "axios";

import TopBar from "../TopBar/index";

import './style.css';
import bookicon from "../../assets/book_icon.svg";
import { Redirect } from "react-router-dom";

class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {loaded: false};
    }

    fetch_details() {
        const that = this;
        axios.get('/viewbook/' + this.props.match.params.id)
            .then(function (response) {
                that.book = response.data;
                that.setState({loaded:true});
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    componentDidMount() {
        this.fetch_details();
    }

    render() {
        let content = <span>Loading</span>;
        if (this.state.loaded) {
            if(!this.book)
                return <Redirect to="/books"/>;
            content =
                <div className="detail-container">
                    <img src={bookicon} alt=""/>
                    <div className="book-detail">
                        <div className="row1">
                            <span className="book-name">{this.book.name}</span>
                            <span className="book-isbn">{this.book.isbn}</span>
                        </div>
                        
                        <div>by <span className="auth-name">{this.book.author}</span></div>
                        <div>{this.book.about}</div>
                    </div>
                </div>
            ;
        }
        return (
            <div className="component-container">
                <TopBar active="books"/>
                <div className="container">
                    <div className="content-heading">
                        Books / Details
                    </div>
                    <div className="main-content">
                        {content}
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

export default BookDetail;