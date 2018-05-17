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
        this.closeModal = this.closeModal.bind(this);
    }

    navigateTo(author) {
        this.selectedAuthor = author;
        this.setState({redirect: true});
    }

    fetch_details() {
        const that = this;
        axios.get('/authorlist')
            .then(function (response) {
                that.authors = response.data;
                that.setState({loaded: true});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidMount() {
        this.fetch_details();
    }

    closeModal(added) {
        this.setState({addauthor:false});
        if(added) {
            this.fetch_details();
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={"/author/" + this.selectedAuthor}/>;
        }
        const addbtn =
            <button onClick={()=>this.setState({addauthor:true})}>Add Author</button>
        ;
        let list = <div className="list-item">Loading</div>;
        if (this.state.loaded) {
            list = [];
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
                    <div className="list-item" key={author} onClick={() => this.navigateTo(this.authors[author].id)}>
                        <img src={authorlogo} alt=""/>
                        <div className="list-content">
                            <div className="authorlist-row1">
                                <span className="author-name">{this.authors[author].name}</span>
                                <span> Born in {this.authors[author].born}</span>
                            </div>
                            <div className="authorlist-row2">
                                <span>Age {this.authors[author].age}</span> /
                                <span> {gender}</span>
                            </div>
                        </div>
                    </div>
                );
            }
            if(this.authors.length === 0)
                list = <div className="list-item">No Authors</div>;
        }
        return (
            <div className="component-container">
                <TopBar active="authors"/>
                <div className="container">
                    <div className="content-heading">
                    <span className="heading-text">AUTHORS</span>
                        <span className="heading-book-count">{this.state.loaded?this.authors.length+' Authors':''}</span>
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
                {this.state.addauthor?<AddAuthor close={this.closeModal}/>:""}
            </div>
        );
    }
}

export default AuthorList;
