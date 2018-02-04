import React, {Component} from "react";
import {Link} from "react-router-dom";
import './style.css';

class TopBar extends Component {
    constructor(props) {
        super(props);
        switch (props.active) {
            case "books":
                this.active = 1;
                break;
            case "authors":
                this.active = 2;
                break;
            default:
                this.active = 0;
        }
    }

    render() {
        let bookclass = this.active === 1 ? "active" : "";
        let authclass = this.active === 2 ? "active" : "";
        return (
            <div className="top-bar">
                <span className="brand-name">Library</span>
                <div className={bookclass}><Link to="/books">Books</Link></div>
                <div className={authclass}><Link to="/authors">Authors</Link></div>
            </div>
        );
    }
}

export default TopBar;