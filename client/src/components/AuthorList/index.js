import React, {Component} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

import AddAuthor from "../AddAuthor/index";

class BookList extends Component {
    constructor(props) {
        super(props);
        this.authors = null;
        this.selectedAuthor = null;
        this.state = {
            loaded: false,
            redirect: false
        };
        this.fetch_details();
    }

    navigateTo(author) {
        this.selectedAuthor = author;
        this.setState({redirect: true});
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

    render() {
        if (this.state.redirect) {
            return <Redirect push to={"/author/" + this.selectedAuthor}/>;
        }
        const addbtn =
            <button>Add Author</button>
        ;
        let list = [];
        if (this.state.loaded) {
            for (let author in this.authors) {
                let gender = "";
                switch (this.authors[author].gender) {
                    case 1:
                        gender = "Male";
                        break;
                    case 2:
                        gender = "Female";
                        break;
                    case 3:
                        gender = "Non-binary";
                        break;
                    default:
                        gender = " "
                }
                list.push(
                    <div key={author} onClick={() => this.navigateTo(this.authors[author].id)}>
                        <span>{this.authors[author].name}</span>
                        <span> Born in{this.authors[author].born}</span>
                        <br/>
                        <span>Age {this.authors[author].age}</span>
                        /
                        <span>{gender}</span>
                        <hr/>
                    </div>
                );
            }
        }
        return (
            <div>
                Authors
                <hr/>
                <hr/>
                {list}
                <hr/>
                {addbtn}
                <hr/>
                <AddAuthor/>
            </div>
        );
    }
}

export default BookList;