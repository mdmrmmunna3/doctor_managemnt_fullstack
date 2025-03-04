import React, { useEffect, useState } from 'react';
import ShareButton from '../../components/ShareButton/ShareButton';
import Calendar from 'react-calendar';
import { useAxios } from '../../Hooks/AxiosProvider';
import Swal from 'sweetalert2';

// Function to format the time as 12-hour AM/PM format
const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    const formattedHour = (hour % 12) || 12;
    const ampm = hour >= 12 ? "PM" : "AM";
    return `${formattedHour}:${minute} ${ampm}`;
};

// Function to get the day of the week ( 'Monday', 'Tuesday')
const getDayOfWeek = (date) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
};

const DateTime = ({ nextStep, prevStep, updateFormData }) => {
    const axiosInstantApi = useAxios();
    const [slots, setSlots] = useState([]);
    const [value, onChange] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);

    // Fetch slots for the selected day
    const fetchSlots = async (day) => {
        try {
            const response = await axiosInstantApi.get(`slots/${day}`);
            setSlots(response.data);
        } catch (error) {
            console.error('Error fetching slots:', error);
        }
    };

    // Fetch slots whenever the selected date changes
    useEffect(() => {
        const dayOfWeek = getDayOfWeek(value);
        fetchSlots(dayOfWeek);
    }, [value]);

    // Handle slot selection
    const handleSlotSelect = (slot) => {
        setSelectedSlot(slot);
    };

    const handleNext = () => {
        if (selectedSlot) {

            const selectedDateTime = {
                date: value,
                slot: selectedSlot,
            };
            updateFormData('selectedDateTime', selectedDateTime);
            nextStep();
        } else {
            Swal.fire({
                icon: "error",
                title: "Please select a slot first.",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold">Select Date Time</h2>
            <div className="flex gap-5">
                <div>
                    <Calendar
                        style={{
                            boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`,
                        }}
                        onChange={onChange}
                        value={value}
                        className="bg-[--primary-color] border-none"
                    />
                </div>
                <div className="mt-2 flex gap-2 flex-wrap">
                    {slots.length > 0 ? (
                        slots.map((slot, index) => (
                            <span
                                style={{
                                    boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`,
                                }}
                                key={index}
                                onClick={() => handleSlotSelect(slot)}
                                className={`px-3 py-1 rounded-lg h-20 ${selectedSlot === slot ? 'bg-blue-500 text-white' : 'bg-[--primary-color]'
                                    }`}
                            >
                                {formatTime(slot.start_time)} - {formatTime(slot.end_time)}<br />
                                Space: {slot.space} | Fee: ${slot.appointment_fee} <br />
                                Duration: {slot?.duration}
                            </span>
                        ))
                    ) : (
                        <p className="text-gray-400">No Slots Available</p>
                    )}
                </div>
            </div>
            <div className="flex justify-between items-center">
                <button className="w-[20%] mt-2" onClick={prevStep}>
                    <ShareButton width="100%">Prev</ShareButton>
                </button>
                <button
                    className="w-[20%] mt-2"
                    onClick={handleNext}
                >
                    <ShareButton width="100%">Basic Info</ShareButton>
                </button>
            </div>
        </div>
    );
};

export default DateTime;


