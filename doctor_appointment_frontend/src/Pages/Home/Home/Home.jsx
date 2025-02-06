import React from 'react';
import Banner from '../Banner/Banner';
import About from '../About/About';
import WeProvide from '../WeProvide/WeProvide';
import Specialities from '../Specialities/Specialities';
import Fqa from '../Fqa/Fqa';
import WorkProcess from '../WorkProcess/WorkProcess';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <WeProvide></WeProvide>
            <Specialities></Specialities>
            <WorkProcess></WorkProcess>
            <Fqa></Fqa>
        </div>
    );
};

export default Home;