import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation.jsx';


const Home = () => (
  <div>
    <Navigation />
    Home Page
    <div>Locations</div>
    <ul>
      <li>
        <Link to="/location/santa-barbara">Santa Barbara</Link>
      </li>
      <li>
        <Link to="/location/ventura">Ventura</Link>
      </li>
      <li>
        <Link to="/location/los-angeles">Los Angeles</Link>
      </li>
      <li>
        <Link to="/location/orange-county">Orange County</Link>
      </li>
      <li>
        <Link to="/location/san-diego">San Diego</Link>
      </li>
    </ul>
  </div>
);

export default Home;
