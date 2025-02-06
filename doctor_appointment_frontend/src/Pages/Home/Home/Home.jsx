import React from 'react';
import Banner from '../Banner/Banner';
import About from '../About/About';
import WeProvide from '../WeProvide/WeProvide';
import Specialities from '../Specialities/Specialities';
import Fqa from '../Fqa/Fqa';
import WorkProcess from '../WorkProcess/WorkProcess';
import Doctor from '../Doctor/Doctor';
import Testimonials from '../Testimonials/Testimonials';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <WeProvide></WeProvide>
            <Specialities></Specialities>
            <Doctor></Doctor>
            <WorkProcess></WorkProcess>
            <Fqa></Fqa>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;