import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import docImg from "../../../assets/banner/work-img.png";
import backgroundImage from "../../../assets/about/doctor-shape-img1.png";

const AccordionItem = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-200">
            <button
                className="flex justify-between items-center w-full px-4 py-6 text-left font-medium transition-colors duration-300 focus:outline-none hover:text-[#00838d]"
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                <FiPlus
                    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-45" : ""
                        }`}
                />
            </button>
            <div
                className={`overflow-hidden transition-max-height duration-300 ease-in-out ${isOpen ? "max-h-40" : "max-h-0"
                    }`}
            >
                <p className="px-4 pb-4 text-slate-500">{content}</p>
            </div>
        </div>
    );
};

const Fqa = () => {
    const faqs = [
        {
            question: "How do I book an appointment with a doctor?",
            answer:
                "Yes, simply visit our website and log in or create an account. Search for a doctor based on specialization, location, or availability & confirm your booking.",
        },
        {
            question: "Can I request a specific doctor when booking my appointment?",
            answer:
                "Yes, you can usually request a specific doctor when booking your appointment, though availability may vary based on their schedule.",
        },
        {
            question: "What should I do if I need to cancel or reschedule my appointment?",
            answer:
                "If you need to cancel or reschedule your appointment, contact the doctor as soon as possible to inform them and to reschedule for another available time slot.",
        },
        {
            question: "What if I'm running late for my appointment?",
            answer:
                "If you know you will be late, it's courteous to call the doctor's office and inform them. Depending on their policy and schedule, they may be able to accommodate you or reschedule your appointment.",
        },
        {
            question: "Can I book appointments for family members or dependents?",
            answer:
                "Yes, in many cases, you can book appointments for family members or dependents. However, you may need to provide their personal information and consent to do so.",
        },
    ];

    return (
        <div
            style={{ backgroundImage: `url(${backgroundImage})`, backgroundRepeat: "no-repeat" }}
        >
            <div className=" lg:px-16 md:p-10 p-6">
                <div className="py-5">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl text-center titel">
                        Get Your Answer
                    </h3>
                    <p className="titel_content md:text-5xl text-3xl text-center pt-3">
                        Frequently Asked Question
                    </p>
                </div>
                <div className="grid lg:grid-cols-2 gap-4">
                    <div className="flex justify-center items-center">
                        <img className="w-[400px]" src={docImg} alt="Doctor" />
                    </div>
                    <div
                        style={{
                            boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`,
                        }}
                    >
                        <section className="w-full divide-y rounded divide-slate-200">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} title={faq.question} content={faq.answer} />
                            ))}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Fqa;
