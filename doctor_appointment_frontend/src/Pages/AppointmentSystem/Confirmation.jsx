import React from 'react';
import ShareButton from '../../components/ShareButton/ShareButton';
import { useAxios } from '../../Hooks/AxiosProvider';

const Confirmation = ({ prevStep, formData }) => {
    const axiosInstantApi = useAxios();

    // const { specialty, appointmentType, dateTime, basicInfo, paymentDetails } = formData;
    console.log(formData);

    return (
        <div>
            <h2>Confirm Your Appointment</h2>
            {/* <div>
                <h3>Specialty:</h3>
                <p>{specialty}</p>
            </div>
            <div>
                <h3>Appointment Type:</h3>
                <p>{appointmentType}</p>
            </div>
            <div>
                <h3>Date & Time:</h3>
                <p>{dateTime}</p>
            </div>
            <div>
                <h3>Basic Information:</h3>
                <p>Name: {basicInfo.name}</p>
                <p>Email: {basicInfo.email}</p>
                <p>Phone: {basicInfo.phone}</p>
            </div>
            <div>
                <h3>Payment Details:</h3>
                <p>Card Number: {paymentDetails.cardNumber}</p>
                <p>Expiry Date: {paymentDetails.expiryDate}</p>
            </div> */}
            <div className="buttons">
                <button
                    className="w-[20%] mt-2"
                    onClick={prevStep}
                >
                    <ShareButton width="100%">Prev</ShareButton>
                </button>
                <button>Confirm Appointment</button>
            </div>
        </div>
    );
};

export default Confirmation;