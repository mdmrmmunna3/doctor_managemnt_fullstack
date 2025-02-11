import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import googleIcon from "../assets/social/google.png";
import facebookIcon from "../assets/social/facebook.png";
import twiterIcon from "../assets/social/twitter.png";
import { FcUndo } from "react-icons/fc";
import animationGif from "../assets/work/—Pngtree—female and male doctors pointing_20287153.png";

const Login = () => {
    const [selectedRole, setSelectedRole] = useState("patient");
    const location = useLocation();
    const [email, setEmail] = useState('patient@gmail.com');
    const [password, setPassword] = useState('123');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const role = params.get("role") || "patient";  // Default to "patient" if no role is found
        setSelectedRole(role);
    }, [location]);

    // Handle role selection via button clicks
    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setError(""); // Clear error when switching roles
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            (selectedRole === 'patient' && email === 'patient@gmail.com' && password === '123') ||
            (selectedRole === 'doctor' && email === 'doctor@gmail.com' && password === '123') ||
            (selectedRole === 'admin' && email === 'admin@gmail.com' && password === '123')
        ) {
            // Store role and authentication token
            localStorage.setItem('role', selectedRole);
            // localStorage.setItem('authToken', 'your_auth_token_here'); // This would be the real token in a real app
            // navigate(`/dashboard?role=${selectedRole}`);
            if (selectedRole === "patient") {
                navigate("/dashboard/patientDashboard");
            } else if (selectedRole === "doctor") {
                navigate("/dashboard/doctorDashboard");
            } else if (selectedRole === "admin") {
                navigate("/dashboard/adminDashboard");
            }
        } else {
            setError('Invalid email or password');
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    // Render registration form based on selected role
    const renderRegistrationForm = () => {
        switch (selectedRole) {
            case "doctor":
                return <DoctorForm selectedRole={selectedRole} handleSubmit={handleSubmit} setEmail={setEmail} setPassword={setPassword} email={email} password={password} error={error} togglePasswordVisibility={togglePasswordVisibility} showPassword={showPassword} />;
            case "admin":
                return <AdminForm selectedRole={selectedRole} handleSubmit={handleSubmit} setEmail={setEmail} setPassword={setPassword} email={email} password={password} error={error} togglePasswordVisibility={togglePasswordVisibility} showPassword={showPassword} />;
            case "patient":
            default:
                return <PatientForm selectedRole={selectedRole} handleSubmit={handleSubmit} setEmail={setEmail} setPassword={setPassword} email={email} password={password} error={error} togglePasswordVisibility={togglePasswordVisibility} showPassword={showPassword} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 grid lg:grid-cols-2 gap-5 lg:px-16 pb-8 md:px-10 p-5">
            <div className="flex justify-center items-center">
                <img src={animationGif} className="" alt="animation" />
            </div>
            <div className="bg-white shadow-lg rounded-xl w-full p-6">
                <h2 className="flex justify-center items-center text-3xl font-semibold mb-4 titel_content text-black">
                    <Link to="/" className="pe-3" title="go to home"><FcUndo /></Link>
                    {selectedRole === "patient"
                        ? "Patient Login"
                        : selectedRole === "doctor"
                            ? "Doctor Login"
                            : "Admin Login"}
                </h2>

                {/* Buttons to switch between different roles */}
                <div className="flex justify-between mb-6 titel_content">
                    <button
                        onClick={() => handleRoleSelect("patient")}
                        className={`w-[32%] py-2 px-4 rounded-lg text-white font-bold transition duration-200 ${selectedRole === "patient"
                            ? "bg-teal-500"
                            : "bg-teal-300 hover:bg-teal-400"
                            }`}
                    >
                        Patient
                    </button>
                    <button
                        onClick={() => handleRoleSelect("doctor")}
                        className={`w-[32%] py-2 px-4 rounded-lg text-white font-bold transition duration-200 ${selectedRole === "doctor"
                            ? "bg-teal-500"
                            : "bg-teal-300 hover:bg-teal-400"
                            }`}
                    >
                        Doctor
                    </button>
                    <button
                        onClick={() => handleRoleSelect("admin")}
                        className={`w-[32%] py-2 px-4 rounded-lg text-white font-bold transition duration-200 ${selectedRole === "admin"
                            ? "bg-teal-500"
                            : "bg-teal-300 hover:bg-teal-400"
                            }`}
                    >
                        Admin
                    </button>
                </div>

                {/* Show the respective form based on selected role */}
                {renderRegistrationForm()}
            </div>
        </div>
    );
};

// Patient Registration Form
const PatientForm = ({ selectedRole, handleSubmit, setEmail, setPassword, email, password, error, togglePasswordVisibility, showPassword }) => (
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
            <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-3 text-teal-500">
                {showPassword ? "Hide" : "Show"}
            </button>
        </div>
        {error && <span className="text-red-500">{error}</span>}
        <span className="text-black">Forgot Password?</span>
        <button
            type="submit"
            className="w-full py-3 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200"
        >
            Login as Patient
        </button>
        <div className="text-center">
            <span className="text-black">---- Login With Social Account ----</span>
            <div className="flex justify-center items-center space-x-5 py-3">
                {/* Social icons */}
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
);

// Doctor Registration Form
const DoctorForm = ({ selectedRole, handleSubmit, setEmail, setPassword, email, password, error, togglePasswordVisibility, showPassword }) => (
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
            <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-3 text-teal-500">
                {showPassword ? "Hide" : "Show"}
            </button>
        </div>
        {error && <span className="text-red-500">{error}</span>}
        <span className="text-black">Forgot Password?</span>
        <button
            type="submit"
            className="w-full py-3 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200 "
        >
            Login as Doctor
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
);

// Admin Registration Form
const AdminForm = ({ selectedRole, handleSubmit, setEmail, setPassword, email, password, error, togglePasswordVisibility, showPassword }) => (
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
            <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-3 text-teal-500">
                {showPassword ? "Hide" : "Show"}
            </button>
        </div>
        {error && <span className="text-red-500">{error}</span>}
        <span className="text-black">Forgot Password?</span>
        <button
            type="submit"
            className="w-full py-3 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200 "
        >
            Login as Admin
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
);

export default Login;
