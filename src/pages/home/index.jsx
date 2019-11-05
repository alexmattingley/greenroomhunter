import React from 'react';
import Navigation from './components/Navigation/index.jsx';
import Hero from './components/Hero/index.jsx';
import LocationsList from './components/LocationList/index.jsx';


const Home = () => (
  <>
    <Navigation currentPage="Home" />
    <Hero />
    <LocationsList />
  </>
);

export default Home;
