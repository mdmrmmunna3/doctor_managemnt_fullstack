import React from 'react';
import Banner from '../Banner/Banner';
import About from '../About/About';
import WeProvide from '../WeProvide/WeProvide';
import Specialities from '../Specialities/Specialities';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <WeProvide></WeProvide>
            <Specialities></Specialities>
        </div>
    );
};

export default Home;