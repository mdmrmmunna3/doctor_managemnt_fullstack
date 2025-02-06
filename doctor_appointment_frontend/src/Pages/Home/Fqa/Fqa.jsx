import React from 'react';
import { FiPlus } from 'react-icons/fi';

const Fqa = () => {
    return (
        <div className='lg:pb-16 lg:px-16 md:p-10 p-6'>
            <div className='py-5'>
                <h3 className='text-3xl md:text-4xl lg:text-5xl text-center titel'>Get Your Answer</h3>
                <p className='titel_content md:text-5xl text-3xl text-center'>Frequently Asked Question</p>
            </div>
            <div className='grid md:grid-cols-2 gap-4'>
                <div>

                </div>
                <div
                    style={{
                        boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                    }}
                >
                    <section className="w-full divide-y rounded divide-slate-200 ">
                        <details className="p-4 group" open>
                            <summary className="relative cursor-pointer list-none pr-8 font-medium  transition-colors duration-300 focus-visible:outline-none group-hover:text-[#00838d]  [&::-webkit-details-marker]:hidden ">
                                How do I book an appointment with a doctor?
                                <FiPlus
                                    className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 group-open:rotate-45"

                                >
                                    <title id="title-ac01">Open icon</title>
                                </FiPlus>
                            </summary>
                            <p className="mt-4 text-slate-500">
                                Yes, simply visit our website and log in or create an account. Search for a doctor based on specialization, location, or availability & confirm your booking.
                            </p>
                        </details>
                        <details className="p-4 group">
                            <summary className="relative cursor-pointer list-none pr-8 font-medium  transition-colors duration-300 focus-visible:outline-none group-hover:text-[#00838d]  [&::-webkit-details-marker]:hidden">
                                Can I request a specific doctor when booking my appointment?
                                <FiPlus
                                    className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 group-open:rotate-45"

                                >
                                    <title id="title-ac01">Open icon</title>
                                </FiPlus>
                            </summary>
                            <p className="mt-4 text-slate-500">
                                Yes, you can usually request a specific doctor when booking your appointment, though availability may vary based on their schedule.
                            </p>
                        </details>
                        <details className="p-4 group">
                            <summary className="relative cursor-pointer list-none pr-8 font-medium  transition-colors duration-300 focus-visible:outline-none group-hover:text-[#00838d]  [&::-webkit-details-marker]:hidden">
                                What should I do if I need to cancel or reschedule my appointment?
                                <FiPlus
                                    className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 group-open:rotate-45"

                                >
                                    <title id="title-ac01">Open icon</title>
                                </FiPlus>
                            </summary>
                            <p className="mt-4 text-slate-500">
                                If you need to cancel or reschedule your appointment, contact the doctor as soon as possible to inform them and to reschedule for another available time slot.
                            </p>
                        </details>
                        <details className="p-4 group">
                            <summary className="relative cursor-pointer list-none pr-8 font-medium  transition-colors duration-300 focus-visible:outline-none group-hover:text-[#00838d]  [&::-webkit-details-marker]:hidden">
                                What if I'm running late for my appointment?
                                <FiPlus
                                    className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 group-open:rotate-45"

                                >
                                    <title id="title-ac01">Open icon</title>
                                </FiPlus>
                            </summary>
                            <p className="mt-4 text-slate-500">
                                If you know you will be late, it's courteous to call the doctor's office and inform them. Depending on their policy and schedule, they may be able to accommodate you or reschedule your appointment.
                            </p>
                        </details>
                        <details className="p-4 group">
                            <summary className="relative cursor-pointer list-none pr-8 font-medium  transition-colors duration-300 focus-visible:outline-none group-hover:text-[#00838d]  [&::-webkit-details-marker]:hidden">
                                Can I book appointments for family members or dependents?
                                <FiPlus
                                    className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 group-open:rotate-45"

                                >
                                    <title id="title-ac01">Open icon</title>
                                </FiPlus>
                            </summary>
                            <p className="mt-4 text-slate-500">
                                Yes, in many cases, you can book appointments for family members or dependents. However, you may need to provide their personal information and consent to do so.
                            </p>
                        </details>

                        <div className="collapse bg-base-200">
                            <input type="radio" name="my-accordion-1" defaultChecked />
                            <div className="collapse-title text-xl font-medium">Click to open this one and close others</div>
                            <div className="collapse-content">
                                <p>hello</p>
                            </div>
                        </div>
                        <div className="collapse bg-base-200">
                            <input type="radio" name="my-accordion-1" />
                            <div className="collapse-title text-xl font-medium">Click to open this one and close others</div>
                            <div className="collapse-content">
                                <p>hello</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Fqa;