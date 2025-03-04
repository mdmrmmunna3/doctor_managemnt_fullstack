import React, { useEffect, useState } from "react"
import { AiOutlineMessage } from "react-icons/ai"
import { CiSettings } from "react-icons/ci"
import { FaFileInvoice, FaNotesMedical, FaUserPlus } from "react-icons/fa"
import { FaUserDoctor } from "react-icons/fa6"
import { IoMdNotifications } from "react-icons/io"
import { MdOutlineDateRange, MdOutlineFolderSpecial, MdPayments } from "react-icons/md"
import { RxDashboard } from "react-icons/rx"
import { Link, Outlet, useLocation } from "react-router-dom"

export default function DashboardLayout() {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const role = params.get("role") || "patient";
    useEffect(() => {
        console.log("Current Role:", role);
    }, [role]);
    const handleNavigation = (path) => {
        navigate(`/dashboard/${path}?role=${role}`);
    };

    // define the sidebar items based on the role 
    const menuItems = {
        admin: [
            { path: 'adminDashboard', label: 'Dashboard', icon: <RxDashboard /> },
            { path: 'appointments', label: 'Appointments', icon: <MdOutlineDateRange /> },
            { path: 'specialities', label: 'Specialities', icon: <MdOutlineFolderSpecial /> },
            { path: 'doctorList', label: 'Doctors', icon: <FaUserDoctor /> },
            { path: 'patients', label: 'Patients', icon: <FaUserPlus /> },
            { path: 'transactions', label: 'Transactions', icon: <MdPayments /> },
            { path: 'invoiceReports', label: 'Invoice Reports', icon: <FaFileInvoice /> },
            { path: 'profileSetting', label: 'Profile Setting', icon: <CiSettings /> },
        ],
        doctor: [
            { path: 'doctorDashboard', label: 'Dashboard', icon: <RxDashboard /> },
            { path: 'appointments', label: 'Appointments', icon: <MdOutlineDateRange /> },
            { path: 'profileSetting', label: 'Profile Setting', icon: <CiSettings /> },
        ],
        patient: [
            { path: 'patientDashboard', label: 'Dashboard', icon: <RxDashboard /> },
            { path: 'appointments', label: 'Appointments', icon: <MdOutlineDateRange /> },
            { path: 'profileSetting', label: 'Profile Setting', icon: <CiSettings /> },
        ],
    };

    // Get the menu items for the current role
    const currentMenuItems = menuItems[role];

    return (
        <>
            {/*  <!-- Component: Side navigation menu with user profile and alert message --> */}
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
                            {currentMenuItems.map((item) => (
                                <li key={item.path} className="px-3">
                                    <Link
                                        to={`/dashboard/${item.path}?role=${role}`}
                                        onClick={() => handleNavigation(item.path)}
                                        className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                    >
                                        <div className="flex items-center self-center">
                                            {item.icon}
                                        </div>
                                        <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                            {item.label}
                                        </div>
                                    </Link>
                                </li>
                            ))}


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
                        <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm font-medium">
                            Logout
                        </div>
                    </Link>
                </footer>
            </aside>

            <main className="flex-1 p-6 lg:ml-72">
                <Outlet /> {/* Dynamic content will be rendered here */}
            </main>

            {/*  <!-- Backdrop --> */}
            <div
                className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${isSideNavOpen ? "block" : "hidden"
                    }`}
                onClick={() => setIsSideNavOpen(false)}
            ></div>
            {/*  <!-- End Side navigation menu with user profile and alert message --> */}
        </>
    )
}


<li className="px-3">
    <Link
        to='/dashboard/patientDashboard?role=patient'
        className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
    >
        <div className="flex items-center self-center">
            <RxDashboard className="h-6 w-6" />
        </div>
        <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
            Dashboard
        </div>
    </Link>
</li>


import React, { useEffect, useState } from "react"
import { AiOutlineMessage } from "react-icons/ai"
import { CiSettings } from "react-icons/ci"
import { FaFileInvoice, FaNotesMedical, FaUserPlus } from "react-icons/fa"
import { FaUserDoctor } from "react-icons/fa6"
import { IoMdNotifications } from "react-icons/io"
import { MdOutlineDateRange, MdOutlineFolderSpecial, MdPayments } from "react-icons/md"
import { RxDashboard } from "react-icons/rx"
import { Link, Outlet, useLocation } from "react-router-dom"

export default function DashboardLayout() {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const role = params.get("role") || "patient";
    useEffect(() => {
        console.log("Current Role:", role);
    }, [role]);
    const handleNavigation = (path) => {
        navigate(`${path}?role=${role}`);
    };

    return (
        <>
            {/*  <!-- Component: Side navigation menu with user profile and alert message --> */}
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
                            {role === 'patient' &&
                                <>
                                    <li className="px-3">
                                        <Link
                                            to='/dashboard/patientDashboard?role=patient'
                                            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                        >
                                            <div className="flex items-center self-center">
                                                <RxDashboard className="h-6 w-6" />
                                            </div>
                                            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                Dashboard
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="px-3">
                                        <a
                                            href="#"
                                            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                        >
                                            <div className="flex items-center self-center">
                                                <MdOutlineDateRange className="h-6 w-6" />
                                            </div>
                                            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                My Appointment
                                            </div>
                                        </a>
                                    </li>
                                    <li className="px-3">
                                        <a
                                            href="#"
                                            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                        >
                                            <div className="flex items-center self-center ">
                                                <AiOutlineMessage className="h-6 w-6" />
                                            </div>
                                            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                Messages
                                            </div>
                                            <span className="inline-flex items-center justify-center rounded-full bg-pink-100 px-2 text-xs text-pink-500 ">
                                                2<span className="sr-only"> new notifications</span>
                                            </span>
                                        </a>
                                    </li>

                                    <li className="px-3">
                                        <a
                                            href="#"
                                            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                        >
                                            <div className="flex items-center self-center ">
                                                <IoMdNotifications className="h-6 w-6" />
                                            </div>
                                            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                notifications
                                            </div>
                                            <span className="inline-flex items-center justify-center rounded-full bg-pink-100 px-2 text-xs text-pink-500 ">
                                                7<span className="sr-only"> new notifications</span>
                                            </span>
                                        </a>
                                    </li>
                                    <li className="px-3">
                                        <a
                                            href="#"
                                            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                        >
                                            <div className="flex items-center self-center">
                                                <FaNotesMedical className="h-6 w-6" />
                                            </div>
                                            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                Medical Report
                                            </div>
                                        </a>
                                    </li>
                                    <li className="px-3">
                                        <a
                                            href="#"
                                            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                        >
                                            <div className="flex items-center self-center">
                                                <CiSettings className="h-6 w-6" />
                                            </div>
                                            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                Setting
                                            </div>
                                        </a>
                                    </li>
                                </>
                            }
                            {/* for doctor  */}
                            {
                                role === 'doctor' &&
                                <>
                                    <li className="px-3">
                                        <Link
                                            to='/dashboard/doctorDashboard?role=doctor'
                                            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                        >
                                            <div className="flex items-center self-center">
                                                <RxDashboard className="h-6 w-6" />
                                            </div>
                                            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                Dashboard
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="px-3">
                                        <a
                                            href="#"
                                            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                        >
                                            <div className="flex items-center self-center">
                                                <MdOutlineDateRange className="h-6 w-6" />
                                            </div>
                                            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                Appointment
                                            </div>
                                        </a>
                                    </li>

                                    <li className="px-3">
                                        <a
                                            href="#"
                                            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                        >
                                            <div className="flex items-center self-center ">
                                                <IoMdNotifications className="h-6 w-6" />
                                            </div>
                                            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                Request
                                            </div>
                                            <span className="inline-flex items-center justify-center rounded-full bg-pink-100 px-2 text-xs text-pink-500 ">
                                                7<span className="sr-only"> new notifications</span>
                                            </span>
                                        </a>
                                    </li>
                                    <li className="px-3">
                                        <a
                                            href="#"
                                            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                        >
                                            <div className="flex items-center self-center ">
                                                <AiOutlineMessage className="h-6 w-6" />
                                            </div>
                                            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                Messages
                                            </div>
                                            <span className="inline-flex items-center justify-center rounded-full bg-pink-100 px-2 text-xs text-pink-500 ">
                                                2<span className="sr-only"> new notifications</span>
                                            </span>
                                        </a>
                                    </li>
                                    <li className="px-3">
                                        <a
                                            href="#"
                                            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                        >
                                            <div className="flex items-center self-center">
                                                <FaNotesMedical className="h-6 w-6" />
                                            </div>
                                            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                Available Timing
                                            </div>
                                        </a>
                                    </li>
                                    <li className="px-3">
                                        <a
                                            href="#"
                                            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                        >
                                            <div className="flex items-center self-center">
                                                <FaNotesMedical className="h-6 w-6" />
                                            </div>
                                            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                My Patients
                                            </div>
                                        </a>
                                    </li>
                                    <li className="px-3">
                                        <a
                                            href="#"
                                            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                        >
                                            <div className="flex items-center self-center">
                                                <CiSettings className="h-6 w-6" />
                                            </div>
                                            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                Profile Setting
                                            </div>
                                        </a>
                                    </li>
                                </>
                            }
                            {/* for admin  */}
                            {
                                role === 'admin' &&
                                <>
                                    <li className="px-3">
                                        <Link
                                            to='/dashboard/adminDashboard?role=admin'
                                            onClick={() => handleNavigation(item.path)}
                                            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                        >
                                            <div className="flex items-center self-center">
                                                <RxDashboard className="h-6 w-6" />
                                            </div>
                                            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                Dashboard
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="px-3">
                                        <Link
                                            to='#'
                                            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                        >
                                            <div className="flex items-center self-center">
                                                <MdOutlineDateRange className="h-6 w-6" />
                                            </div>
                                            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                Appointments
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="px-3">
                                        <Link
                                            to='#'
                                            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                        >
                                            <div className="flex items-center self-center">
                                                <MdOutlineFolderSpecial className="h-6 w-6" />
                                            </div>
                                            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                Specialities
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="px-3">
                                        <Link
                                            to='/dashboard/adminDashboard'
                                            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                        >
                                            <div className="flex items-center self-center">
                                                <FaUserDoctor className="h-6 w-6" />
                                            </div>
                                            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                Doctors
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="px-3">
                                        <Link
                                            to=''
                                            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                        >
                                            <div className="flex items-center self-center">
                                                <FaUserPlus className="h-6 w-6" />
                                            </div>
                                            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                Patients
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="px-3">
                                        <Link
                                            to=''
                                            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                        >
                                            <div className="flex items-center self-center">
                                                <MdPayments className="h-6 w-6" />
                                            </div>
                                            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                Transations
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="px-3">
                                        <Link
                                            to=''
                                            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                        >
                                            <div className="flex items-center self-center">
                                                <FaFileInvoice className="h-6 w-6" />
                                            </div>
                                            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                Invoice Reports
                                            </div>
                                        </Link>
                                    </li>

                                    <li className="px-3">
                                        <Link
                                            to=''
                                            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                        >
                                            <div className="flex items-center self-center">
                                                <CiSettings className="h-6 w-6" />
                                            </div>
                                            <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                Profile Setting
                                            </div>
                                        </Link>
                                    </li>
                                </>
                            }

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
                        <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm font-medium">
                            Logout
                        </div>
                    </Link>
                </footer>
            </aside>

            <main className="flex-1 p-6 lg:ml-72">
                <Outlet /> {/* Dynamic content will be rendered here */}
            </main>

            {/*  <!-- Backdrop --> */}
            <div
                className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${isSideNavOpen ? "block" : "hidden"
                    }`}
                onClick={() => setIsSideNavOpen(false)}
            ></div>
            {/*  <!-- End Side navigation menu with user profile and alert message --> */}
        </>
    )
}


// appointment part
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

// import { useState } from "react";

// const AvailableSlotTiming = () => {
//     const [selectedDay, setSelectedDay] = useState("Monday");
//     const [slots, setSlots] = useState({

//     });
//     const [appointmentFee, setAppointmentFee] = useState(0);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [newSlot, setNewSlot] = useState({ startTime: "", endTime: "", interval: "10 Minutes", duration: "30 Minutes", space: "Space 1" });


//     const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

//     // const addSlot = (time) => {
//     //     setSlots({
//     //         ...slots,
//     //         [selectedDay]: [...(slots[selectedDay] || []), time],
//     //     });
//     // };

//     const openModal = () => setIsModalOpen(true);
//     const closeModal = () => setIsModalOpen(false);

//     const formatTime = (time) => {
//         const [hour, minute] = time.split(":");
//         const formattedHour = (hour % 12) || 12;
//         const ampm = hour >= 12 ? "PM" : "AM";
//         return `${formattedHour}:${minute} ${ampm}`;
//     };

//     const handleSlotChange = (e) => {
//         const { name, value } = e.target;
//         setNewSlot({ ...newSlot, [name]: value });
//     };

//     const saveSlot = () => {
//         setSlots({
//             ...slots,
//             [selectedDay]: [...(slots[selectedDay] || []), `${formatTime(newSlot.startTime)} - ${formatTime(newSlot.endTime)}`],
//         });
//         closeModal();
//     };

//     const deleteAllSlots = () => {
//         setSlots({ ...slots, [selectedDay]: [] });
//     };

//     return (
//         <div
//             style={{
//                 boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
//             }}
//             className="p-6 bg-[--primary-color] text-white rounded-lg">
//             <h3 className='titel md:text-4xl text-3xl font-medium text-center text-[--secondary-color] '>Available Slot Timings</h3>
//             <div className="flex gap-2 mt-4 titel_content">
//                 <button className="px-4 py-2 bg-blue-500 rounded-lg">General Availability</button>
//                 <button className="px-4 py-2 bg-gray-700 rounded-lg">Clinic Availability</button>
//             </div>
//             <div
//                 style={{
//                     boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`
//                 }}
//                 className=" rounded-md p-5 mt-5">
//                 <h3 className="text-lg text-[--secondary-color] font-medium">Select Available Slots</h3>
//                 <div className="flex flex-wrap gap-2 mt-2 titel_content">
//                     {days.map((day) => (
//                         <button
//                             key={day}
//                             onClick={() => setSelectedDay(day)}
//                             className={`px-4 py-2 rounded-lg ${selectedDay === day ? "bg-blue-500" : "bg-gray-700"}`}
//                         >
//                             {day}
//                         </button>
//                     ))}
//                 </div>
//                 <div
//                     style={{
//                         boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`
//                     }}
//                     className=" my-3 rounded-md shadow-zinc-600 py-5 px-3">
//                     <h4 className="mt-4 text-lg font-semibold text-[--secondary-color] titel_content">{selectedDay}</h4>
//                     <div className="mt-2 flex gap-2 flex-wrap">
//                         {slots[selectedDay] && slots[selectedDay].length > 0 ? (
//                             slots[selectedDay].map((slot, index) => (
//                                 <span key={index} className="px-3 py-1 bg-gray-700 rounded-lg">
//                                     {slot}
//                                 </span>
//                             ))
//                         ) : (
//                             <p className="text-gray-400">No Slots Available</p>
//                         )}
//                     </div>
//                     <div className="mt-4">
//                         {/* <button onClick={addSlot} className="mr-4 px-4 py-2 bg-green-500 rounded-lg">Add Slots</button> */}
//                         <button onClick={openModal} className="mr-4 px-4 py-2 bg-green-500 rounded-lg">Add Slots</button>
//                         <button onClick={deleteAllSlots} className="px-4 py-2 bg-red-500 rounded-lg">Delete All</button>
//                     </div>
//                 </div>
//                 <div className="mt-6">
//                     <label className="block mb-2 text-[--secondary-color]">Appointment Fees ($)</label>
//                     <input
//                         type="number"
//                         value={appointmentFee}
//                         onChange={(e) => setAppointmentFee(e.target.value)}
//                         className="px-4 py-2 w-full bg-gray-800 rounded-lg"
//                     />
//                 </div>
//                 {isModalOpen && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                         <div className="bg-gray-800 p-6 rounded-lg w-96">
//                             <h3 className="text-lg font-semibold">Add New Slot</h3>
//                             <label className="block mt-2">Start Time</label>
//                             <input type="time" name="startTime" value={newSlot.startTime} onChange={handleSlotChange} className="w-full p-2 rounded bg-gray-700" />
//                             <label className="block mt-2">End Time</label>
//                             <input type="time" name="endTime" value={newSlot.endTime} onChange={handleSlotChange} className="w-full p-2 rounded bg-gray-700" />
//                             <label className="block mt-2">Appointment Intervals</label>
//                             <select name="interval" value={newSlot.interval} onChange={handleSlotChange} className="w-full p-2 rounded bg-gray-700">
//                                 <option>10 Minutes</option>
//                                 <option>15 Minutes</option>
//                                 <option>30 Minutes</option>
//                             </select>
//                             <label className="block mt-2">Appointment Durations</label>
//                             <select name="duration" value={newSlot.duration} onChange={handleSlotChange} className="w-full p-2 rounded bg-gray-700">
//                                 <option>30 Minutes</option>
//                                 <option>45 Minutes</option>
//                                 <option>60 Minutes</option>
//                             </select>
//                             <label className="block mt-2">Assign Appointment Spaces</label>
//                             <div className="flex gap-2 mt-1">
//                                 {["Space 1", "Space 2", "Space 3", "Space 4"].map((space) => (
//                                     <label key={space} className="flex items-center gap-1">
//                                         <input type="radio" name="space" value={space} checked={newSlot.space === space} onChange={handleSlotChange} />
//                                         {space}
//                                     </label>
//                                 ))}
//                             </div>
//                             <div className="mt-4 flex gap-2">
//                                 <button onClick={closeModal} className="px-4 py-2 bg-gray-600 rounded-lg">Cancel</button>
//                                 <button onClick={saveSlot} className="px-4 py-2 bg-blue-500 rounded-lg">Save Changes</button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AvailableSlotTiming;


<div
    style={{
        boxShadow: `rgba(0, 131, 141, 0.16) 0px 3px 6px, rgba(0, 131, 141, 0.23) 0px 3px 6px`
    }}
    className="p-6 bg-[--primary-color] text-white rounded-lg">
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
                            {slot}
                        </span>
                    ))
                ) : (
                    <p className="text-gray-400">No Slots Available</p>
                )}
            </div>
            <div className="mt-4">
                {/* <button onClick={addSlot} className="mr-4 px-4 py-2 bg-green-500 rounded-lg">Add Slots</button> */}
                <button onClick={openModal} className="mr-4 px-4 py-2 bg-green-500 rounded-lg">Add Slots</button>
                <button onClick={deleteAllSlots} className="px-4 py-2 bg-red-500 rounded-lg">Delete All</button>
            </div>
        </div>
        <div className="mt-6">
            <label className="block mb-2 text-[--secondary-color]">Appointment Fees ($)</label>
            <input
                type="number"
                value={appointmentFee}
                onChange={(e) => setAppointmentFee(e.target.value)}
                className="px-4 py-2 w-full bg-gray-800 rounded-lg"
            />
        </div>
        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center lg:mt-20 mx-5">
                <div className="bg-gray-800 p-6 rounded-lg w-full sm:w-[700px] lg:ms-[250px]">
                    <h3 className="text-lg font-semibold">Add New Slot</h3>
                    <input type="hidden" name='doctor_id' id='doctor_id' value={doctor?.id} onChange={handleSlotChange} />

                    <label className="block mt-2">Start Time</label>
                    <input type="time" name="startTime" value={newSlot.startTime} onChange={handleSlotChange} className="w-full p-2 rounded bg-gray-700" />

                    <label className="block mt-2">End Time</label>
                    <input type="time" name="endTime" value={newSlot.endTime} onChange={handleSlotChange} className="w-full p-2 rounded bg-gray-700" />

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

                    <div className="mt-4 flex gap-2">
                        <button onClick={closeModal} className="px-4 py-2 bg-gray-600 rounded-lg">Cancel</button>
                        <button onClick={saveSlot} className="px-4 py-2 bg-blue-500 rounded-lg">Save Changes</button>
                    </div>
                </div>
            </div>

        )}
    </div>
</div>


import { useState, useEffect } from "react";
import axios from "axios";
import ShareButton from "../../components/ShareButton/ShareButton";
import { useAxios } from "../../Hooks/AxiosProvider";

function Specialty({ nextStep, specialty }) {
    const axiosInstantApi = useAxios();
    const [specialties, setSpecialties] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    // console.log(specialty)

    useEffect(() => {
        axiosInstantApi.get("specialities").then((res) => {
            setSpecialties(res.data);
        });
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold">Select Specialty</h2>
            <select
                className="border p-2 w-full mt-4 bg-transparent"
                value={selectedSpecialty || ''}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
                <option className="bg-[--primary-color]" value="">Choose Specialty</option>
                {specialties.map((specialty) => (
                    <option className="bg-[--primary-color]" key={specialty.id} value={specialty.id}>
                        {specialty.name}
                    </option>
                ))}
            </select>

            <button className="w-[20%]" onClick={nextStep} disabled={!selectedSpecialty}>
                <ShareButton width="100%">Next</ShareButton>
            </button>
        </div>
    );
}

// export default Specialty;

import React from 'react';

function Confirmation({ prevStep, formData }) {
    const { specialty, appointmentType, dateTime, basicInfo, paymentDetails } = formData;

    return (
        <div>
            <h2>Confirm Your Appointment</h2>
            <div>
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
            </div>
            <div className="buttons">
                <button onClick={prevStep}>Back</button>
                <button>Confirm Appointment</button>
            </div>
        </div>
    );
}

// export default Confirmation;

import React, { useState, useEffect } from 'react';

function Payment({ nextStep, prevStep, updateFormData }) {
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");

    useEffect(() => {
        updateFormData("paymentDetails", { cardNumber, expiryDate, cvv });
    }, [cardNumber, expiryDate, cvv, updateFormData]);

    return (
        <div>
            <h2>Payment Details</h2>
            <div>
                <label>Card Number:</label>
                <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Enter your card number"
                />
            </div>
            <div>
                <label>Expiry Date:</label>
                <input
                    type="month"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/YYYY"
                />
            </div>
            <div>
                <label>CVV:</label>
                <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="Enter CVV"
                />
            </div>
            <div className="buttons">
                <button onClick={prevStep}>Back</button>
                <button onClick={nextStep}>Next</button>
            </div>
        </div>
    );
}

// export default Payment;

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

// Function to format the date into the required format
const formatDate = (date) => {
    return date.toString();  // This gives the exact format you mentioned
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
        // Create a new slot object with the formatted date
        const formattedDate = formatDate(value);  // Get the formatted current date
        const updatedSlot = {
            ...slot,
            selectedDate: formattedDate, // Add the formatted date to the slot
        };
        setSelectedSlot(updatedSlot);  // Update selected slot with the formatted date
    };

    const handleNext = () => {
        if (selectedSlot) {
            updateFormData('selectedSlot', selectedSlot);  // Pass the selected slot with the date
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
                                key={index}
                                onClick={() => handleSlotSelect(slot)}
                                style={{
                                    boxShadow: `rgba(149, 157, 165, 0.2) 0px 2px 12px`,
                                }}
                                className={`px-3 py-1 rounded-lg h-16 ${selectedSlot === slot ? 'bg-blue-500 text-white' : 'bg-[--primary-color]'}`}
                            >
                                {formatTime(slot.start_time)} - {formatTime(slot.end_time)}<br />
                                Space: {slot.space} | Fee: ${slot.appointment_fee}
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
                    <ShareButton width="100%">Next</ShareButton>
                </button>
            </div>
        </div>
    );
};

// export default DateTime;
const formatExpiryDateForDisplay = (expiryDate) => {
    if (!expiryDate) return '';
    const [year, month] = expiryDate.split('-');
    const date = new Date(year, month - 1); // Month is zero-based
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
};

// Example usage in the UI:
const formattedExpiry = formatExpiryDateForDisplay(expiryDate);


{/* Payment details */ }
<div className="space-y-4">
    {payments.map((payment, index) => {
        // Parse selected_date_time, basic_info, and selected_service
        const selectedDateTime = JSON.parse(payment.selected_date_time);
        const basicInfo = JSON.parse(payment.basic_info);
        const selectedService = JSON.parse(payment.selected_service);

        return (
            <div key={index} className="payment-details">
                <h3 className="font-bold text-lg">Payment {index + 1}</h3>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <strong>Card Holder:</strong> {payment.card_holder}
                    </div>
                    <div>
                        <strong>Card Number:</strong> {payment.card_number}
                    </div>
                    <div>
                        <strong>Expiry Date:</strong> {payment.expiry_date}
                    </div>
                    <div>
                        <strong>CVV:</strong> {payment.cvv}
                    </div>
                </div>

                <div className="mt-4">
                    <h4 className="font-semibold">Appointment Info:</h4>
                    <p><strong>Selected Date:</strong> {selectedDateTime.date}</p>
                    <p><strong>Slot Day:</strong> {selectedDateTime.slot.day}</p>
                    <p><strong>Slot Time:</strong> {selectedDateTime.slot.start_time} - {selectedDateTime.slot.end_time}</p>
                    <p><strong>Slot Interval:</strong> {selectedDateTime.slot.interval}</p>
                    <p><strong>Slot Duration:</strong> {selectedDateTime.slot.duration}</p>
                    <p><strong>Slot Space:</strong> {selectedDateTime.slot.space}</p>
                    <p><strong>Appointment Fee:</strong> {selectedDateTime.slot.appointment_fee}</p>
                </div>

                <div className="mt-4">
                    <h4 className="font-semibold">Patient Info:</h4>
                    <p><strong>Patient ID:</strong> {basicInfo.patient_id}</p>
                    <p><strong>Name:</strong> {basicInfo.name}</p>
                    <p><strong>Email:</strong> {basicInfo.email}</p>
                    <p><strong>Age:</strong> {basicInfo.age}</p>
                    <p><strong>Phone:</strong> {basicInfo.phone}</p>
                    <p><strong>Address:</strong> {basicInfo.address}</p>
                    <p><strong>Reason:</strong> {basicInfo.reason}</p>
                </div>

                <div className="mt-4">
                    <h4 className="font-semibold">Service Info:</h4>
                    <p><strong>Specialty:</strong> {selectedService.specialty}</p>
                    <p><strong>Service Name:</strong> {selectedService.service_name}</p>
                    <p><strong>Service Price:</strong> {selectedService.service_price}</p>
                </div>

                <div className="mt-4">
                    <p><strong>Total Cost:</strong> {payment.total_cost}</p>
                    <p><strong>Payment Status:</strong> {payment.payment_status}</p>
                    <p><strong>Created At:</strong> {payment.created_at}</p>
                    <p><strong>Updated At:</strong> {payment.updated_at}</p>
                </div>
            </div>
        );
    })}
</div>

const fetchPayments = async () => {
    try {
        const res = await axiosInstantApi.get('payments');
        setPayments(res?.data || []);  // Store payments data in state
    } catch (error) {
        console.error('Error fetching payments:', error);
    }
};