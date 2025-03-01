// import React, { useState } from 'react';

// const AvailableSlotTiming = () => {
//     const [slots, setSlots] = useState([]);

//     const addSlot = (time) => {
//         setSlots([...slots, time]);
//     }
//     const deleteSlot = (index) => {
//         const newSlots = slots.filter((_, i) => i !== index);
//         setSlots(newSlots);
//     }
//     return (
//         <div className='h-screen'>
//             <h3 className='titel md:text-4xl text-3xl font-medium text-center'>Available Slot Timings</h3>
//             <div>
//                 <div className='grid md:grid-cols-4 lg:grid-cols-7'>
//                     {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
//                         <div key={day} className="border p-2">
//                             <h2 className="font-semibold">{day}</h2>
//                             {slots.map((slot, index) => (
//                                 <div key={index} className="flex justify-between items-center mt-2">
//                                     <span>{slot}</span>
//                                     <button onClick={() => deleteSlot(index)} className="text-red-500">Delete</button>
//                                 </div>
//                             ))}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="mt-4">
//                 <input type="time" className="border p-2" />
//                 <button onClick={() => addSlot(document.querySelector('input[type="time"]').value)} className="ml-2 bg-blue-500 text-white p-2">Add Slot</button>
//             </div>
//         </div>
//     );
// };

// export default AvailableSlotTiming;

import { useEffect, useState } from "react";
import { useAxios } from "../../Hooks/AxiosProvider";
import Swal from "sweetalert2";

const AvailableSlotTiming = () => {
    const [selectedDay, setSelectedDay] = useState("Monday");
    const [slots, setSlots] = useState({});
    const [appointmentFee, setAppointmentFee] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const axiosInstantApi = useAxios();
    const [doctor, setDoctor] = useState(null);
    const [newSlot, setNewSlot] = useState({ startTime: "", endTime: "", interval: "10 Minutes", duration: "30 Minutes", space: "Space 1", doctor_id: '' });

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const formatTime = (time) => {
        const [hour, minute] = time.split(":");
        const formattedHour = (hour % 12) || 12;
        const ampm = hour >= 12 ? "PM" : "AM";
        return `${formattedHour}:${minute} ${ampm}`;
    };

    const fetchDoctor = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error("No token found");

            const res = await axiosInstantApi.get('roleuser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log(res?.data);
            setDoctor(res?.data);
            return res.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchDoctor();
    }, []);

    const handleSlotChange = (e) => {
        const { name, value } = e.target;
        setNewSlot({ ...newSlot, [name]: value });
    };

    const saveSlot = async () => {
        const newSlotData = {
            doctor_id: doctor?.id,
            day: selectedDay,
            start_time: newSlot.startTime,
            end_time: newSlot.endTime,
            interval: newSlot.interval,
            duration: newSlot.duration,
            space: newSlot.space,
            appointment_fee: appointmentFee,
        };

        try {
            const response = await axiosInstantApi.post('slots', newSlotData);
            console.log('Slot saved:', response.data);
            setSlots((prevSlots) => ({
                ...prevSlots,
                [selectedDay]: [
                    ...(prevSlots[selectedDay] || []),
                    response.data
                ]
            }));
            Swal.fire({
                position: "top-middle",
                icon: "success",
                title: "Slot create Successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            closeModal();
        } catch (error) {
            console.error('Error saving slot:', error);
            Swal.fire({
                icon: "error",
                title: "There was an error create the slot ",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const fetchSlots = async (day) => {
        try {
            const response = await axiosInstantApi.get(`slots/${day}`);
            setSlots((prevSlots) => ({
                ...prevSlots,
                [day]: response.data
            }));
        } catch (error) {
            console.error('Error fetching slots:', error);
        }
    };

    useEffect(() => {
        fetchSlots(selectedDay);
    }, [selectedDay]);

    const deleteSlotsForDay = async () => {
        try {
            const response = await axiosInstantApi.delete(`slots/${selectedDay}`);
            // console.log('All slots for this day have been deleted:', response.data);

            // Remove the slots from the state for the selected day
            setSlots((prevSlots) => ({
                ...prevSlots,
                [selectedDay]: []
            }));
            Swal.fire({
                position: "top-middle",
                icon: "success",
                title: "Slot Delete Successfully",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error('Error deleting slots:', error);
            Swal.fire({
                position: "top-middle",
                icon: "success",
                title: 'Error deleting slots:', error,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div
            style={{
                boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
            }}
            className="p-6 bg-[--primary-color] text-white rounded-lg h-screen relative">
            <h3 className='titel md:text-4xl text-3xl font-medium text-center text-[--secondary-color] '>Available Slot Timings</h3>
            <div className="flex gap-2 mt-4 titel_content">
                <button className="px-4 py-2 bg-blue-500 rounded-lg">General Availability</button>
                <button className="px-4 py-2 bg-gray-700 rounded-lg">Clinic Availability</button>
            </div>
            <div
                style={{
                    boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`
                }}
                className=" rounded-md p-5 mt-5">
                <h3 className="text-lg text-[--secondary-color] font-medium">Select Available Slots</h3>
                <div className="flex flex-wrap gap-2 mt-2 titel_content">
                    {days.map((day) => (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`px-4 py-2 rounded-lg ${selectedDay === day ? "bg-blue-500" : "bg-gray-700"}`}
                        >
                            {day}
                        </button>
                    ))}
                </div>
                <div
                    style={{
                        boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`
                    }}
                    className=" my-3 rounded-md shadow-zinc-600 py-5 px-3">
                    <h4 className="mt-4 text-lg font-semibold text-[--secondary-color] titel_content">{selectedDay}</h4>
                    <div className="mt-2 flex gap-2 flex-wrap">
                        {slots[selectedDay] && slots[selectedDay].length > 0 ? (
                            slots[selectedDay].map((slot, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-700 rounded-lg">
                                    {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                                </span>
                            ))
                        ) : (
                            <p className="text-gray-400">No Slots Available</p>
                        )}
                    </div>
                    <div className="mt-4">
                        <button onClick={openModal} className="mr-4 px-4 py-2 bg-green-500 rounded-lg">Add Slots</button>
                        <button onClick={deleteSlotsForDay} className="px-4 py-2 bg-red-500 rounded-lg">Delete All</button>
                    </div>
                </div>

                {isModalOpen && (
                    <div className="absolute overflow-y-auto h-full inset-0 bg-black bg-opacity-50 flex items-center justify-center mx-5">
                        <div className="bg-gray-800 p-6 rounded-lg w-full sm:w-[700px] ">
                            <h3 className="text-lg font-semibold">Add New Slot</h3>
                            <input type="hidden" name='doctor_id' id='doctor_id' value={doctor?.id} onChange={handleSlotChange} />

                            <label className="block mt-2">Start Time</label>
                            <input type="time" name="startTime" value={newSlot.startTime || ''} onChange={handleSlotChange} className="w-full p-2 rounded bg-gray-700" />

                            <label className="block mt-2">End Time</label>
                            <input type="time" name="endTime" value={newSlot.endTime || ''} onChange={handleSlotChange} className="w-full p-2 rounded bg-gray-700" />

                            <label className="block mt-2">Appointment Intervals</label>
                            <select name="interval" value={newSlot.interval} onChange={handleSlotChange} className="w-full p-2 rounded bg-gray-700">
                                <option>10 Minutes</option>
                                <option>15 Minutes</option>
                                <option>30 Minutes</option>
                            </select>

                            <label className="block mt-2">Appointment Durations</label>
                            <select name="duration" value={newSlot.duration} onChange={handleSlotChange} className="w-full p-2 rounded bg-gray-700">
                                <option>30 Minutes</option>
                                <option>45 Minutes</option>
                                <option>60 Minutes</option>
                            </select>

                            <label className="block mt-2">Assign Appointment Spaces</label>
                            <div className="flex gap-2 mt-1">
                                {["Space 1", "Space 2", "Space 3", "Space 4"].map((space) => (
                                    <label key={space} className="flex items-center gap-1">
                                        <input type="radio" name="space" value={space} checked={newSlot.space === space} onChange={handleSlotChange} />
                                        {space}
                                    </label>
                                ))}
                            </div>

                            <div className="mt-6">
                                <label className="block mb-2 text-[--secondary-color]">Appointment Fees ($)</label>
                                <input
                                    type="number"
                                    value={appointmentFee}
                                    onChange={(e) => setAppointmentFee(e.target.value)}
                                    className="px-4 py-2 w-full bg-gray-700 rounded-lg"
                                />
                            </div>

                            <div className="mt-4 flex gap-2">
                                <button onClick={closeModal} className="px-4 py-2 bg-gray-600 rounded-lg">Cancel</button>
                                <button onClick={saveSlot} className="px-4 py-2 bg-blue-500 rounded-lg">Save Changes</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AvailableSlotTiming;
