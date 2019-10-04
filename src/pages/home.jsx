import React from 'react';
import ReactDOM from 'react-dom'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import Navigation from '../components/Navigation.jsx';


function Home() {
  return (
    <div>
      <Navigation />
      Home Page
      <div>Locations</div>
      <ul>
        <li>San Diego</li>
        <li>Santa Barbara</li>
      </ul>
    </div>
  );
}

export default Home;
