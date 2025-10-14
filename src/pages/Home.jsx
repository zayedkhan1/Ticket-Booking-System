import React from 'react';
import Hero from '../components/Hero';
import FeaturedSection from '../components/FeaturedSection';
import TrailerSection from '../components/TrailerSection';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <FeaturedSection></FeaturedSection>
            <TrailerSection></TrailerSection>
        </div>
    );
};

export default Home;