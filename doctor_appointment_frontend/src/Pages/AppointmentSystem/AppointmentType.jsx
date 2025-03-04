import React, { useState } from 'react';
import { FaHospital, FaVideo } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { IoLogoWechat } from 'react-icons/io5';
import { MdSpatialAudioOff } from 'react-icons/md';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import img from "../../assets/services/better-health.png";
import ShareButton from '../../components/ShareButton/ShareButton';

const AppointmentType = ({ nextStep, prevStep, updateFormData }) => {
    const [selectedClinics, setSelectedClinics] = useState([]);
    const [selectedAppointmentType, setSelectedAppointmentType] = useState('clinic'); // Default to 'clinic'

    const handleCheckboxChange = (clinic) => {
        setSelectedClinics((prevState) => {
            if (prevState.includes(clinic)) {
                return prevState.filter((item) => item !== clinic);
            } else {
                return [...prevState, clinic];
            }
        });
    };

    const handleNext = () => {
        // Update form data when moving to the next step
        updateFormData('appointmentType', selectedAppointmentType);
        updateFormData('clinics', selectedClinics);
        nextStep();
    };

    return (
        <div>
            <h2 className="text-2xl font-bold">Select Appointment Type</h2>
            <Tabs>
                <TabList className="grid grid-cols-4 gap-4">
                    <Tab onClick={() => setSelectedAppointmentType('clinic')}>
                        <p className="flex gap-2 items-center">
                            <span><FaHospital /></span>Clinic
                        </p>
                    </Tab>
                    <Tab onClick={() => setSelectedAppointmentType('video')}>
                        <p className="flex gap-2 items-center">
                            <span><FaVideo /></span>Video Call
                        </p>
                    </Tab>
                    <Tab onClick={() => setSelectedAppointmentType('audio')}>
                        <p className="flex gap-2 items-center">
                            <span><MdSpatialAudioOff /></span>Audio Call
                        </p>
                    </Tab>
                    <Tab onClick={() => setSelectedAppointmentType('chat')}>
                        <p className="flex gap-2 items-center">
                            <span><IoLogoWechat /></span>Chat
                        </p>
                    </Tab>
                </TabList>

                {/* Clinic Tab */}
                <TabPanel>
                    <div>
                        <div
                            style={{
                                boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`
                            }}
                            className="flex items-center gap-3 p-5 mb-2"
                        >
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('clinic1')}
                                checked={selectedClinics.includes('clinic1')}
                                className="mr-4"
                            />
                            <div className="w-20 h-20">
                                <img src={img} alt="clinic" />
                            </div>
                            <div>
                                <h4>InstanCare Clinic</h4>
                                <p className="flex items-center gap-3">
                                    <span><FaLocationDot /></span>Dhaka, Agargaon
                                </p>
                            </div>
                        </div>
                        <div
                            style={{
                                boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`
                            }}
                            className="flex items-center gap-3 p-5"
                        >
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('clinic2')}
                                checked={selectedClinics.includes('clinic2')}
                                className="mr-4"
                            />
                            <div className="w-20 h-20">
                                <img src={img} alt="clinic" />
                            </div>
                            <div>
                                <h4>InstanCare Clinic</h4>
                                <p className="flex items-center gap-3">
                                    <span><FaLocationDot /></span>Dhaka, Agargaon
                                </p>
                            </div>
                        </div>
                    </div>
                </TabPanel>

                {/* Video Call Tab */}
                <TabPanel>
                    <p>Video Call Appointment will be scheduled at a time of your convenience.</p>
                </TabPanel>

                {/* Audio Call Tab */}
                <TabPanel>
                    <p>Audio Call Appointment will be scheduled at a time of your convenience.</p>
                </TabPanel>

                {/* Chat Tab */}
                <TabPanel>
                    <p>Chat Appointment will be scheduled at a time of your convenience.</p>
                </TabPanel>
            </Tabs>

            <div className="flex justify-between items-center mt-4">
                <button
                    className="w-[20%] mt-2"
                    onClick={prevStep}
                >
                    <ShareButton width="100%">Prev</ShareButton>
                </button>
                <button
                    className="w-[20%] mt-2"
                    onClick={handleNext}
                    disabled={selectedClinics.length === 0 && selectedAppointmentType === 'clinic'}
                >
                    <ShareButton width="100%">Date Time</ShareButton>
                </button>
            </div>
        </div>
    );
};

export default AppointmentType;
