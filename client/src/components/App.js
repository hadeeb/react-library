import React, {Component} from "react";
import {Link} from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Library App</h1>
        </header>
        <p className="App-intro">
            <button>
                <Link to="/books">Books</Link>
            </button>
            <button>
                <Link to="/authors">Authors</Link>
            </button>
        </p>
      </div>
    );
  }
}

export default App;
