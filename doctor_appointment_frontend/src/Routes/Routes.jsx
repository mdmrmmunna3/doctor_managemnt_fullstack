import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Services from "../Pages/Services/Services";
import ContactUs from "../Pages/ContactUs/ContactUs";
import OurBlogs from "../Pages/OurBlogs/OurBlogs";
import Register from "../auth/Register";
import Login from "../auth/Login";
import DashboardLayout from "../Layout/DashboardLayout";
import AdminDashboard from "../DashboardPages/AdminDashboard/AdminDashboard";
import DoctorDashboard from "../DashboardPages/DoctorDashboard/DoctorDashboard";
import PatientDashboard from "../DashboardPages/PatientDashboard/PatientDashboard";
import DoctorList from "../DashboardPages/AdminDashboard/DoctorList";
import PatientList from "../DashboardPages/AdminDashboard/PatientList";
import Appointments from "../DashboardPages/AdminDashboard/Appointments";
import Specialities from "../DashboardPages/AdminDashboard/Specialities";
import DoctorAppointment from "../DashboardPages/DoctorDashboard/DoctorAppointment";
import EditSpecialiy from "../DashboardPages/AdminDashboard/EditSpecialiy";
import DoctorEditProfile from "../DashboardPages/DoctorDashboard/DoctorEditProfile";
import ErrorPage from "../Pages/Shared/ErrorPage/ErrorPage";
import AvailableSlotTiming from "../DashboardPages/DoctorDashboard/AvailableSlotTiming";
import AppointmentSystem from "../Pages/AppointmentSystem/AppointmentSystem";
// import Gallery from "../Pages/Home/Gallery/Gallery";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "about",
                element: <AboutUs></AboutUs>
            },
            {
                path: "service",
                element: <Services></Services>
            },
            {
                path: "blogs",
                element: <OurBlogs></OurBlogs>
            },
            {
                path: "contact",
                element: <ContactUs></ContactUs>
            },
            // {
            //     path: "gallery",
            //     element: <Gallery></Gallery>
            // }
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "register",
                element: <Register></Register>
            },
            {
                path: 'appointsystem/:id',
                element: <AppointmentSystem></AppointmentSystem>
            }

        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            // For Admin Dashboard 
            {
                path: 'adminDashboard',
                element: <AdminDashboard />,
                // children: [
                //     {
                //         path: 'doctorList',
                //         element: <DoctorList />,
                //     },
                // ],
            },

            {
                path: 'adminDashboard/appointments',
                element: <Appointments />,
            },
            {
                path: 'adminDashboard/specialities',
                element: <Specialities />,
            },
            {
                path: 'adminDashboard/speciality/:id',
                element: <EditSpecialiy />,
            },
            {
                path: 'adminDashboard/doctorList',
                element: <DoctorList />,
            },
            {
                path: 'adminDashboard/patientList',
                element: <PatientList />,
            },

            // For DoctorDashboard 
            {
                path: 'doctorDashboard',
                element: <DoctorDashboard />,
            },
            {
                path: 'doctorDashboard/doctorAppoint',
                element: <DoctorAppointment />,
            },
            {
                path: 'doctorDashboard/avilableSlot',
                element: <AvailableSlotTiming />,
            },
            {
                path: 'doctorDashboard/editProfile',
                element: <DoctorEditProfile />,
            },

            // For PatientDashboard 
            {
                path: 'patientDashboard',
                element: <PatientDashboard />,
            },
        ],
    },
]);