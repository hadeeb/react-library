import React, {Component} from "react";

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
            <div>
                <span>Library</span>
                <div className={bookclass}>Books</div>
                <div className={authclass}>Authors</div>
            </div>
        );
    }
}

export default TopBar;