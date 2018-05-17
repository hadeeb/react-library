import React, {Component} from "react";
import axios from "axios";

import "./style.css";

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.authors = null;
        this.state = {loaded: false};
        this.handleSubmit = this.handleSubmit.bind(this);
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

    static preventClick(event) {
        event.stopPropagation();
    }

    handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        let that = this;
        if(!this.refs.bookAuthor.value){
            alert("Select an author or add one");
            return;
        }
        if(!this.refs.bookName.value) {
            alert("Enter a name for book");
            return;
        }
        axios.post("/addbook", {
            name: this.refs.bookName.value,
            author: this.refs.bookAuthor.value,
            isbn: this.refs.bookISBN.value,
            about: this.refs.bookAbout.value
        })
            .then(function () {
                that.props.close(true);

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentWillReceiveProps(nextProps){
        //this.setState({show:nextProps.show});
    }
    componentDidMount() {
        this.fetch_details();
    }
    render() {
        let authorslist = [];
        if (this.state.loaded) {
            for (let author in this.authors) {
                authorslist.push(
                    <option value={this.authors[author].id} key={author}>
                        {this.authors[author].name}
                    </option>
                );
            }
        }
        return (
            <div className="modal modal-show" onClick={()=>this.props.close()}>
                <div className="modal-content" onClick={AddBook.preventClick}>
                    <span onClick={()=>this.props.close()} className="close">&times;</span>
                    <div className="modal-heading">ADD BOOK</div>
                    <form onSubmit={this.handleSubmit}>
                        <input className="modal-input" ref="bookName" placeholder="Book Name"/>
                        <select className="modal-input" ref="bookAuthor">
                            {authorslist}
                        </select>
                        <input className="modal-input" ref="bookISBN" type="number" placeholder="ISBN Number"/>
                        <input className="modal-input" ref="bookAbout" placeholder="Description of content"/>
                        <div className="modal-input modal-btns">
                            <button type="reset" onClick={()=>this.props.close()}>Cancel</button>
                            <button type="submit">Add Book</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddBook;
