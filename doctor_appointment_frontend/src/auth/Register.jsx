import React, { useState } from "react";

const Register = () => {
  const [selectedRole, setSelectedRole] = useState("patient");

  // Handle role selection via button clicks
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  // Render registration form based on selected role
  const renderRegistrationForm = () => {
    switch (selectedRole) {
      case "doctor":
        return <DoctorForm />;
      case "admin":
        return <AdminForm />;
      case "patient":
      default:
        return <PatientForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-xl w-[360px] p-6">
        <h2 className="text-center text-3xl font-semibold mb-4">
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
            className={`w-[32%] py-2 px-4 rounded-lg text-white font-bold transition duration-200 ${
              selectedRole === "patient"
                ? "bg-teal-500"
                : "bg-teal-300 hover:bg-teal-400"
            }`}
          >
            Patient
          </button>
          <button
            onClick={() => handleRoleSelect("doctor")}
            className={`w-[32%] py-2 px-4 rounded-lg text-white font-bold transition duration-200 ${
              selectedRole === "doctor"
                ? "bg-teal-500"
                : "bg-teal-300 hover:bg-teal-400"
            }`}
          >
            Doctor
          </button>
          <button
            onClick={() => handleRoleSelect("admin")}
            className={`w-[32%] py-2 px-4 rounded-lg text-white font-bold transition duration-200 ${
              selectedRole === "admin"
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
const PatientForm = () => (
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
    <button
      type="submit"
      className="w-full py-3 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200"
    >
      Register as Patient
    </button>
  </form>
);

// Doctor Registration Form
const DoctorForm = () => (
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
      type="text"
      className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      placeholder="Specialization"
    />
    <button
      type="submit"
      className="w-full py-3 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200"
    >
      Register as Doctor
    </button>
  </form>
);

// Admin Registration Form
const AdminForm = () => (
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
    <button
      type="submit"
      className="w-full py-3 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200"
    >
      Register as Admin
    </button>
  </form>
);

export default Register;
