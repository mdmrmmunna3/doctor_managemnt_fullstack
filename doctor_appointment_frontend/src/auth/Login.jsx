import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
import googleIcon from "../assets/social/google.png";
import facebookIcon from "../assets/social/facebook.png";
import twiterIcon from "../assets/social/twitter.png";
import { FcUndo } from "react-icons/fc";
import animationGif from "../assets/work/—Pngtree—female and male doctors pointing_20287153.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [selectedRole, setSelectedRole] = useState("patient");
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const role = params.get("role") || "patient";
        setSelectedRole(role);
    }, [location]);

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // try {
        //     const response = await axios.post("http://localhost:8000/api/login", {
        //         email,
        //         password,
        //         role: selectedRole
        //     });

        //     if (response.data.success) {
        //         localStorage.setItem("token", response.data.token);
        //         localStorage.setItem("role", selectedRole);

        //         if (selectedRole === "patient") {
        //             navigate("/dashboard/patientDashboard");
        //         } else if (selectedRole === "doctor") {
        //             navigate("/dashboard/doctorDashboard");
        //         } else if (selectedRole === "admin") {
        //             navigate("/dashboard/adminDashboard");
        //         }
        //     } else {
        //         setError(response.data.message || "Invalid credentials");
        //     }
        // } catch (error) {
        //     setError("Login failed. Please check your credentials.");
        // }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="min-h-screen bg-gray-100 grid lg:grid-cols-2 gap-5 lg:px-16 pb-8 md:px-10 p-5">
            <div className="flex justify-center items-center">
                <img src={animationGif} className="" alt="animation" />
            </div>
            <div className="bg-white shadow-lg rounded-xl w-full p-6">
                <h2 className="flex justify-center items-center text-3xl font-semibold mb-4 titel_content text-black">
                    <Link to="/" className="pe-3" title="go to home"><FcUndo /></Link>
                    {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Login
                </h2>

                <div className="flex justify-between mb-6">
                    {['patient', 'doctor', 'admin'].map(role => (
                        <button
                            key={role}
                            onClick={() => handleRoleSelect(role)}
                            className={`w-[32%] py-2 px-4 rounded-lg text-white font-bold transition duration-200 ${selectedRole === role ? "bg-teal-500" : "bg-teal-300 hover:bg-teal-400"}`}
                        >
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 titel_content">
                    <input
                        type="email"
                        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-600"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-600"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-3 text-xl">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {error && <span className="text-red-500">{error}</span>}
                    <span className="text-black">Forgot Password?</span>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200 "
                    >
                        Login as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
                    </button>
                    <div className="text-center">
                        <span className="text-black">---- Login With Social Account ----</span>
                        <div className="flex justify-center items-center space-x-5 py-3">
                            <Link to='/'><img src={googleIcon} alt="google" className="w-10" /></Link>
                            <Link to='/'> <img src={facebookIcon} alt="facebook" className="w-10" /></Link>
                            <Link to='/'> <img src={twiterIcon} alt="twitter" className="w-10" /></Link>
                        </div>
                        <div className="text-center pt-3">
                            <span className="text-black">You have no account?{" "}
                                <Link to={`/register?role=${selectedRole}`}>
                                    <span className="underline text-teal-400 font-medium text-xl">Register</span>
                                </Link>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;