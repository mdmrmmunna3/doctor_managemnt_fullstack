import React from 'react';
import ShareBanner from '../../components/ShareBanner/ShareBanner';
import contactBg from "../../assets/banner/cont.jpeg";
import { FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
const ContactUs = () => {
    return (
        <div className='pt-16 '>
            <ShareBanner bgImage={contactBg} title='Contact Us'>Contact</ShareBanner>

            <div className='grid lg:grid-cols-2 gap-5 lg:px-16 pb-8 md:px-10 p-5'>
                {/* contact info littelbit details  */}
                <div className='titel_content'>
                    <h4 className=' text-xl'>Get In Touch</h4>
                    <h3 className='text-3xl'>Have Any Question?</h3>
                    <div
                        style={{
                            boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                        }}
                        className='flex items-center space-x-3 text-2xl p-4 my-3'
                    >
                        <span className='hover:bg-[#17C3B2] p-5 rounded-full transform transition-all duration-300 hover:text-white'>
                            <FaLocationDot
                            />
                        </span>
                        <div>
                            <p>Address</p>
                            <p>Shymoli, Dhaka</p>
                        </div>
                    </div>

                    <div
                        style={{
                            boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                        }}
                        className='flex items-center space-x-3 text-2xl p-4 my-5'
                    >
                        <span className='hover:bg-[#17C3B2] p-5 rounded-full transform transition-all duration-300 hover:text-white'>
                            <FaPhoneAlt />
                        </span>
                        <div>
                            <p>Phone</p>
                            <p>088+ 0145200</p>
                        </div>
                    </div>

                    <div
                        style={{
                            boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                        }}
                        className='flex items-center space-x-3 text-2xl p-4 my-3'
                    >
                        <span className='hover:bg-[#17C3B2] p-5 rounded-full transform transition-all duration-300 hover:text-white'>
                            <MdEmail />
                        </span>
                        <div>
                            <p>Email Address</p>
                            <p>instantcare@gmail.com</p>
                        </div>
                    </div>
                </div>

                {/* form section  */}
                <div
                    style={{
                        boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
                    }}
                    className='p-5'
                >
                    <form className="space-y-4">
                        <div className='grid md:grid-cols-2 gap-5'>
                            <div>
                                <label htmlFor="name" className='font-semibold'>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    // value={formData.name}
                                    // onChange={handleChange}
                                    className="w-full p-2 border rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 mt-1"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className='font-semibold'>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    // value={formData.email}
                                    // onChange={handleChange}
                                    className="w-full p-2 border rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 mt-1"
                                    required
                                />
                            </div>
                        </div>

                        {/* phone and service  */}
                        <div className='grid md:grid-cols-2 gap-5'>
                            <div>
                                <label htmlFor="phone" className='font-semibold'>Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Your Phone Number"
                                    // value={formData.phone}
                                    // onChange={handleChange}
                                    className="w-full p-2 border rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 mt-1"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="service" className='font-semibold'>Service</label>
                                <select
                                    name="service"
                                    // value={formData.service}
                                    // onChange={handleChange}
                                    className="w-full p-2 border rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 mt-1"
                                    required
                                >
                                    <option className='bg-[--primary-color]' value="">Select a Service</option>
                                    <option className='bg-[--primary-color]' value="Neurology">Neurology</option>
                                    <option className='bg-[--primary-color]' value="Orthopedic">Orthopedic</option>
                                    <option className='bg-[--primary-color]' value="Dentis">Dentis</option>
                                    <option className='bg-[--primary-color]' value="Cardiology">Cardiology</option>
                                </select>
                            </div>
                        </div>

                        {/* message  */}
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            // value={formData.message}
                            // onChange={handleChange}
                            className="w-full p-2 border rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows="4"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full bg-[#17C3B2] text-white py-2 rounded-md hover:bg-cyan-500 transition"
                        >
                            Submit
                        </button>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default ContactUs;