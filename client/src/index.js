import React, {Component} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import "./index.css";
import BookList from "./components/BookList/index";
import BookDetail from "./components/BookDetail/index";
import AuthorList from "./components/AuthorList/index";
import AuthorDetail from "./components/AuthorDetail/index";
import ResetDB from "./components/misc/reset";
import registerServiceWorker from "./registerServiceWorker";

class Routes extends Component {
    render() {
        return (
            <Router history="">
                <Switch>
                    <Route path="/books" exact component={BookList}/>
                    <Route path="/book/:id" exact component={BookDetail}/>
                    <Route path="/authors" exact component={AuthorList}/>
                    <Route path="/author/:id" exact component={AuthorDetail}/>
					<Route path="/resetdb" exact component={ResetDB}/>
                    <Route path="/" render={() => <Redirect to="/books"/>}/>
                </Switch>
            </Router>
        );
    }
}
ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
