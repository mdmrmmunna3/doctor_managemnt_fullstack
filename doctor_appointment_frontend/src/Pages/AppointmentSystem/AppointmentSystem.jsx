import React, { useEffect } from 'react';
import { useState } from "react";
import AppointmentType from './AppointmentType';
import DateTime from './DateTime';
import BasicInfo from './BasicInfo';
import Payment from './Payment';
import Confirmation from './Confirmation';
import Specialty from './Specialty';
import { useParams } from 'react-router-dom';
import { useAxios } from '../../Hooks/AxiosProvider';
import Loader from '../Shared/Loader/Loader';
import { FaLocationDot } from 'react-icons/fa6';
import { FaGraduationCap } from 'react-icons/fa';


function AppointmentSystem() {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const axiosInstantApi = useAxios();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        specialty: "",
        appointmentType: "",
        dateTime: "",
        basicInfo: {},
        paymentDetails: {}
    });

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const res = await axiosInstantApi.get(`doctors/${id}`);
                // console.log(res?.data?.user);
                setDoctor(res?.data?.user);
            } catch (error) {
                console.error('Error fetching doctor data:', error);
            }
        };

        fetchDoctor();
    }, [id]);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const updateFormData = (field, data) => {
        setFormData(prevData => ({ ...prevData, [field]: data }));
    };

    const steps = [
        "Specialty",
        "Appointment Type",
        "Date & Time",
        "Basic Information",
        "Payment",
        "Confirmation"
    ];

    return (
        <div className='pt-28 titel_content'>
            <div
                style={{
                    boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`
                }}
                className="p-6 max-w-4xl mx-auto mb-2 rounded-md">
                {/* Step Indicator 
                flex items-center justify-between
                */}
                <div className="grid md:grid-cols-6 grid-cols-3 gap-2 mb-6 relative">
                    {steps.map((label, index) => (
                        <div key={index} className="flex items-center">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold 
              ${step > index + 1 ? 'bg-green-500' : step === index + 1 ? 'bg-blue-600' : 'bg-gray-300'}`}>
                                {index + 1}
                            </div>
                            {index !== steps.length - 1 && <div className={`w-16 border-t-2 border-dashed mx-2 
                        ${step > index + 1 ? 'border-green-500' : 'border-gray-300'}`}></div>}
                        </div>
                    ))}
                </div>
                <div className="grid md:grid-cols-6 grid-cols-3 gap-2 text-sm text-gray-700">
                    {steps.map((label, index) => (
                        <span key={index} className={step === index + 1 ? "font-bold text-blue-600" : step > index + 1 ? "text-green-600" : ""}>{label}</span>
                    ))}
                </div>

                <div
                    style={{
                        boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`
                    }}
                    className='my-5 p-5 rounded-md'>
                    {doctor ? (
                        <div className='flex space-x-5'>
                            <div className="avatar">
                                <div className="w-24 rounded-full">
                                    <img src={`http://localhost:8000/storage/${doctor?.image}`} alt={doctor?.name} />
                                </div>
                            </div>
                            <div>
                                <h2>Book an appointment with Dr. {doctor?.name}</h2>
                                <h3>Specialty: <span>{doctor?.specialty}</span></h3>
                                <p className='flex items-center gap-2'><span><FaLocationDot></FaLocationDot></span>{doctor?.address}</p>
                                <p className='flex items-center gap-2'><span><FaGraduationCap></FaGraduationCap></span>{doctor?.qualification}</p>
                            </div>
                        </div>
                    ) : (
                        <div><Loader></Loader></div>
                    )}
                </div>
                {/* Step Components */}
                {step === 1 && <Specialty nextStep={nextStep} updateFormData={updateFormData} specialty={doctor?.specialty} />}
                {step === 2 && <AppointmentType nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />}
                {step === 3 && <DateTime nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />}
                {step === 4 && <BasicInfo nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} />}
                {step === 5 && <Payment nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} />}
                {step === 6 && <Confirmation prevStep={prevStep} formData={formData} />}
            </div>
        </div>
    );
}

export default AppointmentSystem;


