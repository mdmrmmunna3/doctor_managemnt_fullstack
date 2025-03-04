import React, { useEffect, useState } from 'react';
import ShareButton from '../../components/ShareButton/ShareButton';
import { useAuthApi } from '../../Hooks/useAuthApi';

const BasicInfo = ({ nextStep, prevStep, updateFormData }) => {
    const { getUserData } = useAuthApi();
    const [patient, setPatient] = useState(null);
    const [reason, setReason] = useState('');


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const patientData = await getUserData();
                setPatient(patientData);

                // Create an object for basicInfo with patient data and reason
                const basicInfo = {
                    patient_id: patientData.id,
                    name: patientData.name,
                    email: patientData.email,
                    age: patientData.age,
                    phone: patientData.phone,
                    address: patientData.address,
                    reason: reason,
                };

                // Update form data with the basicInfo object
                updateFormData('basicInfo', basicInfo);
            } catch (error) {
                console.error('Error fetching authenticated user data:', error);
            }
        };

        fetchUserData();
    }, [getUserData, updateFormData, reason]);


    const handleReasonChange = (e) => {
        const newReason = e.target.value;
        setReason(newReason);

        updateFormData('basicInfo', {
            patient_id: patient?.id,
            name: patient?.name,
            email: patient?.email,
            age: patient?.age,
            phone: patient?.phone,
            address: patient?.address,
            reason: newReason,
        });
    };


    return (
        <div>
            <div>
                <h2 className="text-2xl font-bold">Select Basic Info Type</h2>
                <div
                    style={{
                        boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                    }}
                    className="w-full max-w-4xl bg-[--primary-color] shadow-lg rounded-xl p-8 space-y-6">

                    <div className="rounded-full">
                        <img className='h-[400px] w-full' src={`http://localhost:8000/storage/${patient?.image}`} alt={patient?.name} />
                    </div>

                    <form className="space-y-4">
                        <div className='grid md:grid-cols-2 gap-4'>
                            <input
                                type="text"
                                className="w-full p-4 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="Full Name"
                                name="name"
                                id="name"
                                value={patient?.name || ''}
                                readOnly
                            />

                            <input type="hidden" name='patient_id' id='patient_id' value={patient?.id || ''} />

                            <input
                                type="email"
                                className="w-full p-4 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="Email"
                                name="email"
                                id="email"
                                value={patient?.email || ''}
                                readOnly
                            />
                        </div>

                        <div className='grid md:grid-cols-2 gap-4'>
                            <input
                                type="text"
                                className="w-full p-4 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="Enter Age"
                                name="age"
                                id="age"
                                value={patient?.age || ''}
                                readOnly
                            />
                            <input
                                type="text"
                                className="w-full p-4 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="Enter Phone"
                                name="phone"
                                id="phone"
                                value={patient?.phone || ''}
                                readOnly
                            />
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <textarea
                                className="w-full p-4 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="Enter Address"
                                name="address"
                                id="address"
                                value={patient?.address || ''}
                                rows={2}
                                readOnly
                            />
                            <textarea
                                className="w-full p-4 border bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="Reason for visit"
                                name="reason"
                                id="reason"
                                value={reason}
                                onChange={handleReasonChange}
                                rows={2}
                            />
                        </div>
                    </form>
                </div>

                <div className='flex justify-between items-center'>
                    <button
                        className="w-[20%] mt-2"
                        onClick={prevStep}
                    >
                        <ShareButton width="100%">Prev</ShareButton>
                    </button>
                    <button
                        className="w-[20%] mt-2"
                        onClick={nextStep}
                    >
                        <ShareButton width="100%">Payment</ShareButton>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BasicInfo;
