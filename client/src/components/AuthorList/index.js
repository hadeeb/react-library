import React, {Component} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

import AddAuthor from "../AddAuthor/index";
import TopBar from "../TopBar/index";
import './style.css';
import authorlogo from "../../assets/author_icon.svg";

class AuthorList extends Component {
    constructor(props) {
        super(props);
        this.authors = null;
        this.selectedAuthor = null;
        this.state = {
            loaded: false,
            redirect: false,
            addauthor:false
        };
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

    componentDidMount() {
        this.fetch_details();
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={"/author/" + this.selectedAuthor}/>;
        }
        const addbtn =
            <button onClick={()=>this.setState({addauthor:true})}>Add Author</button>
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
                        gender = "Other";
                        break;
                    default:
                        gender = " "
                }
                list.push(
                    <div className="list-item" key={author} onClick={() => this.navigateTo(this.authors[author].id)}>
                        <img src={authorlogo} alt=""/>
                        <div className="list-content">
                            <div className="authorlist-row1">
                                <span className="author-name">{this.authors[author].name}</span>
                                <span> Born in{this.authors[author].born}</span>
                            </div>
                            <div className="authorlist-row2">
                                <span>Age {this.authors[author].age}</span> /
                                <span> {gender}</span>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        return (
            <div className="component-container">
                <TopBar active="authors"/>
                <div className="container">
                    <div className="content-heading">
                        AUTHORS
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
                <AddAuthor show={this.state.addauthor}/>
            </div>
        );
    }
}

export default AuthorList;