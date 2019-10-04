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
        <Link to="/location/north-oc">North Orange County</Link>
      </li>
      <li>
        <Link to="/location/south-oc">South Orange County</Link>
      </li>
      <li>
        <Link to="/location/north-sd">North San Diego</Link>
      </li>
      <li>
        <Link to="/location/south-sd">South San Diego</Link>
      </li>
    </ul>
  </div>
);

export default Home;
