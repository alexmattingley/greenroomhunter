import React from 'react';
import Navigation from '../components/Navigation/index.jsx';
import Hero from '../components/Hero/index.jsx';
import LocationsList from '../components/LocationList/index.jsx';


const Home = () => (
  <div>
    <Navigation currentPage="Home" />
    <Hero />
    <div>Locations</div>
    <LocationsList />
  </div>
);

export default Home;
