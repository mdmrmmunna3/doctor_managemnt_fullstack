import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Services from "../Pages/Services/Services";
import Blogs from "../Pages/Blogs/Blogs";
import ContactUs from "../Pages/ContactUs/ContactUs";
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
                element: <Blogs></Blogs>
            },
            {
                path: "contact",
                element: <ContactUs></ContactUs>
            }
            // {
            //     path: "gallery",
            //     element: <Gallery></Gallery>
            // }
        ]
    }
]);