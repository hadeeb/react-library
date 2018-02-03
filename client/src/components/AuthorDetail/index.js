import React, {Component} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

import TopBar from "../TopBar/index";

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
        let list = [];
        let topcontent = "";
        if (this.state.loaded) {
            topcontent = <div>Books by {this.author.name}</div>;
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
                <TopBar active="books"/>
                {topcontent}
                <hr/>
                <hr/>
                {list}
            </div>
        );
    }
}

export default AuthorDetail;