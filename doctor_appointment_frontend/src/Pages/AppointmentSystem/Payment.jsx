import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios for making the API request
import ShareButton from '../../components/ShareButton/ShareButton';
import { useAxios } from '../../Hooks/AxiosProvider';
import Swal from 'sweetalert2';

const Payment = ({ nextStep, prevStep, updateFormData, formData }) => {
    const [cardNumber, setCardNumber] = useState("");
    const [cardHolder, setCardHolder] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const { selectedDateTime, appointmentType, selectedService, basicInfo } = formData;
    const { date, slot } = selectedDateTime;
    const [totalCost, setTotalCost] = useState(0);
    const axiosInstantApi = useAxios();
    const [paymentStatus, setPaymentStatus] = useState("pending");

    const formatTime = (time) => {
        const [hour, minute] = time.split(":");
        const formattedHour = (hour % 12) || 12;
        const ampm = hour >= 12 ? "PM" : "AM";
        return `${formattedHour}:${minute} ${ampm}`;
    };

    useEffect(() => {
        updateFormData("paymentDetails", { cardHolder, cardNumber, expiryDate, cvv });
    }, [cardHolder, cardNumber, expiryDate, cvv]);

    useEffect(() => {
        if (slot?.appointment_fee) {
            const serviceFee = 250; // Base booking fee
            const appointmentFee = parseInt(slot?.appointment_fee);
            const total = serviceFee + appointmentFee;
            setTotalCost(total);
        }
    }, [slot]);

    // Function to handle payment submission
    const handlePaymentSubmit = async () => {
        if (!cardHolder || !cardNumber || !expiryDate || !cvv) {
            // alert('Please fill in all required fields');
            Swal.fire({
                icon: "error",
                title: "Please fill in all required fields",
                showConfirmButton: false,
                timer: 2000,
            });
            return;
        }

        // Optional: Check if card number is exactly 16 digits
        if (cardNumber.length !== 16) {
            // alert('Card number must be 16 digits');
            Swal.fire({
                icon: "error",
                title: "Card number must be 16 digits",
                showConfirmButton: false,
                timer: 2000,
            });
            return;
        }

        if (cvv.length !== 3) {
            // alert('CVV must be 3 digits');
            Swal.fire({
                icon: "error",
                title: "CVV must be 3 digits",
                showConfirmButton: false,
                timer: 2000,
            });
            return;
        }
        const formattedExpiryDate = expiryDate ? expiryDate.split('-').reverse().join('/') : '';
        // Construct the payment data object
        const paymentData = {
            cardHolder,
            cardNumber,
            expiryDate: formattedExpiryDate,
            cvv,
            selectedDateTime,
            appointmentType,
            basicInfo,
            selectedService,
            totalCost,
            paymentStatus
        };

        try {
            const response = await axiosInstantApi.post('payments', paymentData);

            if (response.status === 200) {
                // Payment was successful, proceed to the next step
                // setPaymentStatus('pending');
                nextStep();
            } else {
                console.log('Payment failed', response.data);
                setPaymentStatus("failed");
            }
        } catch (error) {
            // Log detailed error message
            console.error('Error submitting payment:', error.response?.data || error.message);

        }
    };


    return (
        <div>
            <div
                style={{
                    boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`
                }}
                className='grid md:grid-cols-2 gap-5 titel_content p-5 rounded-md'>
                <div className='text-xl'>
                    <h2 className='text-2xl'>Payment Details</h2>
                    <div>
                        <label>Card Holder Name:</label>
                        <input
                            type="text"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            placeholder="Enter card Holder Name"
                            className='bg-white my-1 text-black rounded-sm w-full border p-1'
                        />
                    </div>
                    <div>
                        <label>Card Number:</label>
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="Enter your card number"
                            className='bg-white my-1 text-black rounded-sm w-full border p-1'
                        />
                    </div>
                    <div>
                        <label>Expiry Date:</label>
                        <input
                            type="month"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            placeholder="MM/YYYY"
                            className='bg-white my-1 text-black rounded-sm w-full border p-1'
                        />
                    </div>
                    <div>
                        <label>CVV:</label>
                        <input
                            type="text"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            placeholder="Enter CVV"
                            className='bg-white my-1 text-black rounded-sm w-full border p-1'
                        />
                    </div>
                </div>

                <div>
                    <div>
                        <h4 className=' mb-2 text-2xl'>Booking Info</h4>
                        <p className='text-xl'>Date & Time</p>
                        <div className='flex items-center gap-3 my-2 text-xl'>
                            <p><span>{formatTime(slot?.start_time)} - {formatTime(slot?.end_time)}</span></p>
                            <p className='text-xl'><span>{date.toLocaleDateString()}</span></p>
                        </div>
                        <p className='text-xl'>Appointment Type: {appointmentType}</p>
                        <div>
                            <h4 className='text-xl mb-2'>Payment Info</h4>
                            <p className='text-xl'>
                                <span>Service : {selectedService?.service_name}</span> -
                                <span> ${selectedService?.service_price}</span>
                            </p>
                            <p className='text-xl'>Booking Fee : ${slot?.appointment_fee}</p>
                            <p className='text-2xl'>Total : ${totalCost}</p>
                        </div>
                    </div>
                </div>
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
                    onClick={handlePaymentSubmit}
                >
                    <ShareButton width="100%">Pay & Go</ShareButton>
                </button>
            </div>
        </div>
    );
};

export default Payment;
