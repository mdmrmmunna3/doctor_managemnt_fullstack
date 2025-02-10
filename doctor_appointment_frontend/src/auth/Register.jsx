import React, { useEffect, useState } from "react";
import { FcUndo } from "react-icons/fc";
import { Link, useLocation } from "react-router-dom";
import googleIcon from "../assets/social/google.png";
import facebookIcon from "../assets/social/facebook.png";
import twiterIcon from "../assets/social/twitter.png";
import { FaCloudUploadAlt } from "react-icons/fa";
import animationGif from "../assets/work/—Pngtree—female and male doctors pointing_20287153.png";

const Register = () => {
  const [selectedRole, setSelectedRole] = useState("patient");
  const [file, setFile] = useState(null);

  // Handle role selection via button clicks
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const role = params.get("role") || "patient";  // Default to "patient" if no role is found
    setSelectedRole(role);
  }, [location]);

  // file updlod handler 
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Render registration form based on selected role
  const renderRegistrationForm = () => {
    switch (selectedRole) {
      case "doctor":
        return <DoctorForm selectedRole={selectedRole} handleFileChange={handleFileChange} file={file} />;  // Pass selectedRole as prop
      case "admin":
        return <AdminForm selectedRole={selectedRole} handleFileChange={handleFileChange} file={file} />;
      case "patient":
      default:
        return <PatientForm selectedRole={selectedRole} handleFileChange={handleFileChange} file={file} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 grid lg:grid-cols-2 gap-5 lg:px-16 pb-8 md:px-10 p-5">

      <div className="bg-white shadow-lg rounded-xl w-full p-6">
        <h2 className="flex justify-center items-center text-3xl font-semibold mb-4 titel_content text-black">
          <Link to='/' className="pe-3" title="go to home"><FcUndo /></Link>
          {selectedRole === "patient"
            ? "Patient Registration"
            : selectedRole === "doctor"
              ? "Doctor Registration"
              : "Admin Registration"}
        </h2>

        {/* Buttons to switch between different roles */}
        <div className="flex justify-between mb-6">
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
      <div className="flex justify-center items-center">
        <img src={animationGif} className="" alt="animation" />
      </div>
    </div>
  );
};

// Patient Registration Form
const PatientForm = ({ selectedRole, handleFileChange, file }) => (
  <form className="space-y-4">
    <input
      type="text"
      className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      placeholder="Full Name"
    />
    <input
      type="email"
      className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      placeholder="Email"
    />
    <input
      type="password"
      className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      placeholder="Password"
    />
    <input
      type="tel"
      className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      placeholder="Phone Number"
    />
    <div className="border-2 border-dashed  rounded-lg p-4 flex flex-col items-center justify-center w-full">
      <div className="text-gray-600 flex flex-col items-center">
        <div className="bg-gray-600 text-white p-1 rounded-full">
          <FaCloudUploadAlt />
        </div>
        {/* <p className="mt-2">Upload File</p> */}
        <label className="mt-1 px-4 py-1 bg-gray-700 text-white rounded cursor-pointer">
          Browse file
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
      {file && <p className="mt-2 text-sm text-gray-700">{file?.name}</p>}
    </div>
    <textarea className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      placeholder="Address" name="" id=""></textarea>
    <button
      type="submit"
      className="w-full py-3 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200"
    >
      Register as Patient
    </button>
    <div className="text-center">
      {/* social icons  */}
      {/* <span className="text-black">---- Login With Social Account ----</span> */}
      {/* <div className="flex justify-center items-center space-x-5 py-3">
        <Link to='/'><img src={googleIcon} alt="google" className="w-10" /></Link>
        <Link to='/'> <img src={facebookIcon} alt="facebook" className="w-10" /></Link>
        <Link to='/'> <img src={twiterIcon} alt="twiter" className="w-10" /></Link>
      </div> */}
      {/* Link to the registration page with the selected role */}
      <div className="text-center pt-3">
        <span className="text-black">You have account?{" "}
          <Link to={`/login?role=${selectedRole}`}>
            <span className="underline text-teal-400 font-medium text-xl">Login</span>
          </Link>
        </span>
      </div>
    </div>
  </form>
);

// Doctor Registration Form
const DoctorForm = ({ selectedRole, handleFileChange, file }) => (
  <form className="space-y-4 ">
    <input
      type="text"
      className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      placeholder="Full Name"
    />
    <input
      type="email"
      className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      placeholder="Email"
    />
    <input
      type="password"
      className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      placeholder="Password"
    />
    <input
      type="text"
      className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      placeholder="Specialization"
    />
    <div className="border-2 border-dashed  rounded-lg p-4 flex flex-col items-center justify-center w-full">
      <div className="text-gray-600 flex flex-col items-center">
        <div className="bg-gray-600 text-white p-1 rounded-full">
          <FaCloudUploadAlt />
        </div>
        {/* <p className="mt-2">Upload File</p> */}
        <label className="mt-1 px-4 py-1 bg-gray-700 text-white rounded cursor-pointer">
          Browse file
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
      {file && <p className="mt-2 text-sm text-gray-700">{file?.name}</p>}
    </div>
    <textarea className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      placeholder="Address" name="" id=""></textarea>
    <button
      type="submit"
      className="w-full py-3 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200"
    >
      Register as Doctor
    </button>
    <div className="text-center">
      {/* social icons  */}
      {/* <span className="text-black">---- Login With Social Account ----</span>
      <div className="flex justify-center items-center space-x-5 py-3">
        <Link to='/'><img src={googleIcon} alt="google" className="w-10" /></Link>
        <Link to='/'> <img src={facebookIcon} alt="facebook" className="w-10" /></Link>
        <Link to='/'> <img src={twiterIcon} alt="twiter" className="w-10" /></Link>
      </div> */}
      {/* Link to the registration page with the selected role */}
      <div className="text-center pt-3">
        <span className="text-black">You have account?{" "}
          <Link to={`/login?role=${selectedRole}`}>
            <span className="underline text-teal-400 font-medium text-xl">Login</span>
          </Link>
        </span>
      </div>
    </div>
  </form>
);

// Admin Registration Form
const AdminForm = ({ selectedRole, handleFileChange, file }) => (
  <form className="space-y-4">
    <input
      type="text"
      className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      placeholder="Full Name"
    />
    <input
      type="email"
      className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      placeholder="Email"
    />
    <input
      type="password"
      className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      placeholder="Password"
    />
    <div className="border-2 border-dashed  rounded-lg p-4 flex flex-col items-center justify-center w-full">
      <div className="text-gray-600 flex flex-col items-center">
        <div className="bg-gray-600 text-white p-1 rounded-full">
          <FaCloudUploadAlt />
        </div>
        {/* <p className="mt-2">Upload File</p> */}
        <label className="mt-1 px-4 py-1 bg-gray-700 text-white rounded cursor-pointer">
          Browse file
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
      {file && <p className="mt-2 text-sm text-gray-700">{file?.name}</p>}
    </div>
    <button
      type="submit"
      className="w-full py-3 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200"
    >
      Register as Admin
    </button>
    <div className="text-center">
      {/* social icons  */}
      <span className="text-black">---- Login With Social Account ----</span>
      <div className="flex justify-center items-center space-x-5 py-3">
        <Link to='/'><img src={googleIcon} alt="google" className="w-10" /></Link>
        <Link to='/'> <img src={facebookIcon} alt="facebook" className="w-10" /></Link>
        <Link to='/'> <img src={twiterIcon} alt="twiter" className="w-10" /></Link>
      </div>
      {/* Link to the registration page with the selected role */}
      <div className="text-center pt-3">
        <span className="text-black">You have account?{" "}
          <Link to={`/login?role=${selectedRole}`}>
            <span className="underline text-teal-400 font-medium text-xl">Login</span>
          </Link>
        </span>
      </div>
    </div>
  </form>
);

export default Register;
