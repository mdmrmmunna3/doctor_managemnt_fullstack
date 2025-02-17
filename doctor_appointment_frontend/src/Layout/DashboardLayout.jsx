import React, { useEffect, useState } from "react";
import { AiOutlineMessage, AiOutlineClose } from "react-icons/ai"; // Added close icon
import { CiSettings } from "react-icons/ci";
import { FaFileInvoice, FaNotesMedical, FaUserPlus } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";
import { MdOutlineDateRange, MdOutlineFolderSpecial, MdPayments } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import DashboardNavbar from "../Pages/Shared/DashboardNavbar/DashboardNavbar";

export default function DashboardLayout() {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const [role, setRole] = useState(localStorage.getItem("role"));
    const navigate = useNavigate();

    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        if (!storedRole) {
            navigate("/login"); // Redirect to login if no role found
        } else {
            setRole(storedRole);
        }
    }, [navigate]);

    const handleLogout = () => {
        navigate('/login');
    };

    const NavItem = ({ to, icon: Icon, title, notifications = 0, onClick }) => (
        <li className="px-3">
            <Link
                to={to}
                onClick={onClick}
                className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500"
            >
                <div className="flex items-center self-center">
                    <Icon className="h-6 w-6" />
                </div>
                <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    {title}
                </div>
                {notifications > 0 && (
                    <span className="inline-flex items-center justify-center rounded-full bg-pink-100 px-2 text-xs text-pink-500">
                        {notifications}
                        <span className="sr-only"> new notifications</span>
                    </span>
                )}
            </Link>
        </li>
    );

    const AdminMenu = () => (
        <>
            <NavItem to="/dashboard/adminDashboard" icon={RxDashboard} title="Dashboard" />
            <NavItem to="/dashboard/adminDashboard/appointments" icon={MdOutlineDateRange} title="Appointments" />
            <NavItem to="/dashboard/adminDashboard/specialities" icon={MdOutlineFolderSpecial} title="Specialities" />
            <NavItem to="/dashboard/adminDashboard/doctorList" icon={FaUserDoctor} title="Doctors" />
            <NavItem to="/dashboard/adminDashboard/patientList" icon={FaUserPlus} title="Patients" />
            <NavItem to="/dashboard/adminDashboard/transactions" icon={MdPayments} title="Transactions" />
            <NavItem to="/dashboard/adminDashboard/invoiceReports" icon={FaFileInvoice} title="Invoice Reports" />
            <NavItem to="/dashboard/adminDashboard/settings" icon={CiSettings} title="Profile Setting" />
        </>
    );

    const DoctorMenu = () => (
        <>
            <NavItem to="/dashboard/doctorDashboard" icon={RxDashboard} title="Dashboard" />
            <NavItem to="/dashboard/doctorDashboard/doctorAppoint" icon={MdOutlineDateRange} title="Appointment" />
            <NavItem to="/dashboard/doctorDashboard/requests" icon={IoMdNotifications} title="Request" notifications={7} />
            <NavItem to="/dashboard/doctorDashboard/messages" icon={AiOutlineMessage} title="Messages" notifications={2} />
            <NavItem to="/dashboard/doctorDashboard/timing" icon={FaNotesMedical} title="Available Timing" />
            <NavItem to="/dashboard/doctorDashboard/patients" icon={FaNotesMedical} title="My Patients" />
            <NavItem to="/dashboard/doctorDashboard/settings" icon={CiSettings} title="Profile Setting" />
        </>
    );

    const PatientMenu = () => (
        <>
            <NavItem to="/dashboard/patientDashboard" icon={RxDashboard} title="Dashboard" />
            <NavItem to="/dashboard/patientDashboard/appointments" icon={MdOutlineDateRange} title="My Appointment" />
            <NavItem to="/dashboard/patientDashboard/messages" icon={AiOutlineMessage} title="Messages" notifications={2} />
            <NavItem to="/dashboard/patientDashboard/notifications" icon={IoMdNotifications} title="Notifications" notifications={7} />
            <NavItem to="/dashboard/patientDashboard/reports" icon={FaNotesMedical} title="Medical Report" />
            <NavItem to="/dashboard/patientDashboard/settings" icon={CiSettings} title="Profile Setting" />
        </>
    );

    return (
        <>
            {/*  <!-- Mobile trigger --> */}
            <button
                title="Side navigation"
                type="button"
                className={`visible fixed left-6 top-6 z-40 order-10 block h-10 w-10 self-center rounded bg-white opacity-100 lg:hidden ${isSideNavOpen
                    ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
                    : ""
                    }`}
                aria-haspopup="menu"
                aria-label="Side navigation"
                aria-expanded={isSideNavOpen ? " true" : "false"}
                aria-controls="nav-menu-4"
                onClick={() => setIsSideNavOpen(!isSideNavOpen)}
            >
                <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                    <span
                        aria-hidden="true"
                        className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300"
                    ></span>
                    <span
                        aria-hidden="true"
                        className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                    ></span>
                    <span
                        aria-hidden="true"
                        className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                    ></span>
                </div>
            </button>

            {/*  <!-- Side Navigation --> */}
            <aside
                id="nav-menu-4"
                aria-label="Side navigation"
                className={`fixed top-0 bottom-0 left-0 z-40 flex w-72 flex-col border-r border-r-slate-200 bg-white transition-transform lg:translate-x-0 ${isSideNavOpen ? "translate-x-0" : " -translate-x-full"
                    }`}
            >
                {/* Close Icon Button */}
                <button
                    onClick={() => setIsSideNavOpen(false)}
                    className="lg:hidden absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-200 text-slate-700"
                    aria-label="Close sidebar"
                >
                    <AiOutlineClose className="h-6 w-6" />
                </button>

                <div className="flex flex-col items-center gap-4 border-b border-slate-200 p-6">
                    <div className="shrink-0">
                        <a
                            href="#"
                            className="relative flex h-12 w-12 items-center justify-center rounded-full text-white"
                        >
                            <img
                                src="https://i.pravatar.cc/40?img=7"
                                alt="user name"
                                title="user name"
                                width="48"
                                height="48"
                                className="max-w-full rounded-full"
                            />
                            <span className="absolute bottom-0 right-0 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-emerald-500 p-1 text-sm text-white">
                                <span className="sr-only"> online </span>
                            </span>
                        </a>
                    </div>
                    <div className="flex min-h-[2rem] w-full min-w-0 flex-col items-start justify-center gap-0 text-center">
                        <h4 className="w-full truncate text-base text-slate-700">
                            Mustafijur
                        </h4>
                        <p className="w-full truncate text-sm text-slate-500">
                            Patient
                        </p>
                    </div>
                </div>
                <nav
                    aria-label="side navigation"
                    className="flex-1 divide-y divide-slate-100 overflow-auto"
                >
                    <div>
                        <ul className="flex flex-1 flex-col gap-1 py-3">
                            {role === 'patient' && <PatientMenu />}
                            {role === 'doctor' && <DoctorMenu />}
                            {role === 'admin' && <AdminMenu />}
                        </ul>
                    </div>
                </nav>

                <footer className="border-t border-slate-200 p-3">
                    <Link
                        to=''
                        className="flex items-center gap-3 rounded p-3 text-slate-900 transition-colors hover:text-emerald-500 "
                    >
                        <div className="flex items-center self-center ">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                                aria-label="Dashboard icon"
                                role="graphics-symbol"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <div onClick={handleLogout} className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm font-medium">
                            Logout
                        </div>
                    </Link>
                </footer>
            </aside>

            <DashboardNavbar />
            <main className="flex-1 px-6 lg:ml-72 overflow-x-auto">
                <Outlet /> {/* Dynamic content will be rendered here */}
            </main>

            {/* Backdrop */}
            <div
                className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${isSideNavOpen ? "block" : "hidden"
                    }`}
                onClick={() => setIsSideNavOpen(false)}
            ></div>
        </>
    );
}
