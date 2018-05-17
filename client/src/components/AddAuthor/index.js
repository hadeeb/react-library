import React, {Component} from "react";
import axios from "axios";

class AddAuthor extends Component {
    constructor(props) {
        super(props);
        this.state =({show:false});
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static preventClick(event) {
        event.stopPropagation();
    }

    handleSubmit(event) {
        event.preventDefault();
        alert(this.refs.authName.value);
        axios.post("/addauthor", {
            name: this.refs.authName.value,
            age: this.refs.authAge.value,
            gender: this.refs.authGender.value,
            born: this.refs.authBorn.value,
            about: this.refs.authAbout.value
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    componentWillReceiveProps(nextProps){
        this.setState({show:nextProps.show});
    }

    render() {
        let show = this.state.show?"modal modal-show":"modal";
        return (
            <div className={show} onClick={()=>this.setState({show:false})}>
                <div className="modal-content" onClick={AddAuthor.preventClick}>
                    <span onClick={()=>this.setState({show:false})} className="close">&times;</span>
                    <div className="modal-heading">ADD AUTHOR</div>                    <form onSubmit={this.handleSubmit}>
                        <input className="modal-input" ref="authName" placeholder="Author Name"/><br/>
                        <input className="modal-input" ref="authAge" type="number" placeholder="Age"/>
                        <select className="modal-input" ref="authGender">
                            <option value={1}>Male</option>
                            <option value={2}>Female</option>
                            <option value={3}>Other</option>
                        </select>
                        <input className="modal-input" ref="authBorn" placeholder="Born In"/>
                        <input className="modal-input" ref="authAbout" placeholder="About Author"/>
                        <div className="modal-input modal-btns">
                            <button type="reset" onClick={()=>this.setState({show:false})}>Cancel</button>
                            <button type="submit">Save Author</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddAuthor;
