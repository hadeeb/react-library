import React, {Component} from "react";
import axios from "axios";

import TopBar from "../TopBar/index";

class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {loaded: false};
        this.fetch_details();
    }

    fetch_details() {
        const that = this;
        axios.get('/viewbook/' + this.props.match.params.id)
            .then(function (response) {
                console.log(typeof response.data);
                that.book = response.data[0];
                console.log(that.book);
                axios.get('/authorprofile/' + that.book.author)
                    .then(function (response) {
                        that.authname = response.data[0].name;
                        that.setState({loaded: true});
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        let content = <span>Loading</span>;
        if (this.state.loaded) {
            content =
                <div>
                    <span>{this.book.name}</span>
                    <span>{this.book.isbn}</span>
                    <br/>
                    <span>By {this.authname}</span>
                    <br/>
                    <span>{this.book.about}</span>
                    <hr/>
                </div>
            ;
        }
        return (
            <div>
                <TopBar active="books"/>
                Book Detail
                <hr/>
                <hr/>
                {content}
            </div>
        );
    }
}

export default BookDetail;