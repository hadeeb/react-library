import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import './index.css';
import App from './components/App';
import NotFound from './components/NotFound/index';
import registerServiceWorker from './registerServiceWorker';

class Routes extends Component {
    render() {
        return (
            <Router history="">
                <Switch>
                    <Route path="/home" component={App}/>
                    <Route path="/" exact render={() => <Redirect to="/home"/>}/>
                    <Route path="/" component={NotFound}/>
                </Switch>
            </Router>
        );
    }
}
ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
