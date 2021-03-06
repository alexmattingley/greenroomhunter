import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from 'pages/home/index.jsx';
import Location from 'pages/location/index.jsx';
import About from 'pages/about/index.jsx';
import Contact from './pages/contact.jsx';
import NotFound from './pages/notFound.jsx';
import * as serviceWorker from './serviceWorker';


const routing = (
  <>
    <CssBaseline />
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/location/:location" component={Location} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
