import React from 'react';
import ShareBanner from '../../components/ShareBanner/ShareBanner';
import aboutBg from "../../assets/banner/about.jpg";
import CountUp from "react-countup";
import Blogs from '../Home/Blogs/Blogs';
import WorkProcess from '../Home/WorkProcess/WorkProcess';
import About from '../Home/About/About';
const AboutUs = () => {
    const stats = [
        { icon: "👥", end: 1000, label: "Happy Patients", formattedEnd: "1k" },
        { icon: "👨‍⚕️", end: 150, label: "Expert Doctors" },
        { icon: "🏆", end: 90, label: "Award Winning" },
        { icon: "⭐", end: 4.9, label: "Average Rating", decimals: 1 },
    ];
    return (
        <div className='pt-16'>
            <ShareBanner bgImage={aboutBg} title='About Us'>About Us</ShareBanner>
            <About></About>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 lg:px-16 md:p-10 p-5">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center p-6 shadow-md"
                        style={{ boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px` }}
                    >
                        <span className="text-4xl">{stat.icon}</span>
                        <h2 className="text-3xl font-bold mt-2">
                            {/* {stat.formattedEnd ? stat.formattedEnd : <CountUp end={stat.end} duration={2.5} decimals={stat.decimals || 0} />}+ */}
                            <CountUp end={stat.end} duration={2.5} decimals={stat.decimals || 0} />+
                        </h2>
                        <p className=" mt-1 text-lg">{stat.label}</p>
                    </div>
                ))}
            </div>
            <WorkProcess></WorkProcess>
            <Blogs></Blogs>
        </div >
    );
};

export default AboutUs;