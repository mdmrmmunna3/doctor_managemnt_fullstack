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