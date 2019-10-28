import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Normalize } from 'styled-normalize';
import { createGlobalStyle } from 'styled-components'
import { AppContainer } from './components/Container/index.styled.js';
import Home from './pages/home.jsx';
import About from './pages/about.jsx';
import Contact from './pages/contact.jsx';
import Location from './pages/location.jsx';
import NotFound from './pages/notFound.jsx';
import * as serviceWorker from './serviceWorker';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Montserrat', sans-serif;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto', sans-serif;
  }
`;

const routing = (
  <>
    <GlobalStyle />
    <Normalize />
    <AppContainer>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/location/:location" component={Location} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </AppContainer>
  </>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
