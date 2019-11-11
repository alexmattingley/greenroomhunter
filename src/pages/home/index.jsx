import React from 'react';
import Hero from './components/Hero/index.jsx';
import Navigation from './components/Navigation/index.jsx';
import LocationsList from './components/LocationList/index.jsx';


const Home = () => (
  <>
    <Navigation currentPage="Home" />
    <Hero />
    <LocationsList />
  </>
);

export default Home;
