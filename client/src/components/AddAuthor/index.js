import React, { Component } from "react";
import axios from "axios";

class AddAuthor extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static preventClick(event) {
    event.stopPropagation();
  }

  handleSubmit(event) {
    let that = this;
    event.preventDefault();
    if (!this.refs.authName.value) {
      alert("Enter a name for author");
      return;
    }
    axios
      .post("/api/addauthor", {
        name: this.refs.authName.value,
        age: this.refs.authAge.value,
        gender: this.refs.authGender.value,
        born: this.refs.authBorn.value,
        about: this.refs.authAbout.value
      })
      .then(function() {
        that.props.close(true);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  componentWillReceiveProps(nextProps) {
    // this.setState({show:nextProps.show});
  }

  render() {
    return (
      <div className="modal modal-show" onClick={() => this.props.close()}>
        <div className="modal-content" onClick={AddAuthor.preventClick}>
          <span onClick={() => this.props.close()} className="close">
            &times;
          </span>
          <div className="modal-heading">ADD AUTHOR</div>{" "}
          <form onSubmit={this.handleSubmit}>
            <input
              className="modal-input"
              ref="authName"
              placeholder="Author Name"
            />
            <br />
            <input
              className="modal-input"
              ref="authAge"
              type="number"
              placeholder="Age"
            />
            <select className="modal-input" ref="authGender">
              <option value={1}>Male</option>
              <option value={2}>Female</option>
              <option value={3}>Non-binary</option>
            </select>
            <input
              className="modal-input"
              ref="authBorn"
              placeholder="Born In"
            />
            <input
              className="modal-input"
              ref="authAbout"
              placeholder="About Author"
            />
            <div className="modal-input modal-btns">
              <button type="reset" onClick={() => this.props.close()}>
                Cancel
              </button>
              <button type="submit">Save Author</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddAuthor;
