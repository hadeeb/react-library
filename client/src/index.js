import React, {Component} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import "./index.css";

import App from "./components/App";
import NotFound from "./components/NotFound/index";
import BookList from "./components/BookList/index";
import BookDetail from "./components/BookDetail/index";
import AuthorList from "./components/AuthorList/index";
import AuthorDetail from "./components/AuthorDetail/index";
import registerServiceWorker from "./registerServiceWorker";

class Routes extends Component {
    render() {
        return (
            <Router history="">
                <Switch>
                    <Route path="/home" component={App}/>
                    <Route path="/books" exact component={BookList}/>
                    <Route path="/book/:id" exact component={BookDetail}/>
                    <Route path="/authors" exact component={AuthorList}/>
                    <Route path="/author/:id" exact component={AuthorDetail}/>
                    <Route path="/" exact render={() => <Redirect to="/home"/>}/>
                    <Route path="/" component={NotFound}/>
                </Switch>
            </Router>
        );
    }
}
ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
