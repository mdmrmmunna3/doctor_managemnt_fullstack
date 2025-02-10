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
// import Gallery from "../Pages/Home/Gallery/Gallery";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
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
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            // Admin Dashboard
            {
                path: 'adminDashboard',
                element: <AdminDashboard />
            },
            // Doctor Dashboard
            {
                path: 'doctorDashboard',
                element: <DoctorDashboard />
            },
            // Patient Dashboard
            {
                path: 'patientDashboard',
                element: <PatientDashboard />
            }
        ]
    }
]);