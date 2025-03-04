// import React from 'react';
// import ShareButton from '../../components/ShareButton/ShareButton';
// import { useAxios } from '../../Hooks/AxiosProvider';

// const Confirmation = ({ prevStep, formData }) => {
//     const axiosInstantApi = useAxios();

//     const { selectedDateTime, appointmentType, selectedService, basicInfo } = formData;
//     console.log(formData);
//     const formatTime = (time) => {
//         const [hour, minute] = time.split(":");
//         const formattedHour = (hour % 12) || 12;
//         const ampm = hour >= 12 ? "PM" : "AM";
//         return `${formattedHour}:${minute} ${ampm}`;
//     };

//     return (
//         <div>
//             <h2>Confirm Your Appointment</h2>
//             <div>
//                 <div>
//                     <h4 className=' mb-2 text-2xl'>Booking Info</h4>
//                     <p className='text-xl'>Date & Time</p>
//                     <div className='flex items-center gap-3 my-2 text-xl'>
//                         <p><span>{formatTime(slot?.start_time)} - {formatTime(slot?.end_time)}</span></p>
//                         <p className='text-xl'><span>{date.toLocaleDateString()}</span></p>
//                     </div>
//                     <p className='text-xl'>Appointment Type: {appointmentType}</p>
//                     <div>
//                         <h4 className='text-xl mb-2'>Payment Info</h4>
//                         <p className='text-xl'>
//                             <span>Service : {selectedService?.service_name}</span> -
//                             <span> ${selectedService?.service_price}</span>
//                         </p>
//                         <p className='text-xl'>Booking Fee : ${slot?.appointment_fee}</p>
//                         <p className='text-2xl'>Total : ${totalCost}</p>
//                     </div>
//                 </div>
//             </div>
//             <div className="buttons">
//                 <button
//                     className="w-[20%] mt-2"
//                     onClick={prevStep}
//                 >
//                     <ShareButton width="100%">Prev</ShareButton>
//                 </button>
//                 <button>Confirm Appointment</button>
//             </div>
//         </div>
//     );
// };

// export default Confirmation;