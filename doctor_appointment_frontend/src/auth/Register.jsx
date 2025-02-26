import React, { useState, useEffect } from 'react';
import { FcUndo } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt } from 'react-icons/fa';
import googleIcon from '../assets/social/google.png';
import facebookIcon from '../assets/social/facebook.png';
import twiterIcon from '../assets/social/twitter.png';
import animationGif from '../assets/work/—Pngtree—female and male doctors pointing_20287153.png';
import { useAuthApi } from '../Hooks/useAuthApi';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [selectedRole, setSelectedRole] = useState(localStorage.getItem('selectedRole') || 'patient'); // Use localStorage to persist the role
  const { register } = useAuthApi();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    specialty: '',
    age: '',
    phone: '',
    address: '',
    image: null,
  });

  // Handle form field changes
  const handleOnChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setUser((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setUser((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Role selection handling
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    localStorage.setItem('selectedRole', role);
  };

  // Use URL params to determine the role if coming from the URL
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const role = params.get('role') || 'patient'; // Default to "patient" if no role is found
    setSelectedRole(role);
    localStorage.setItem('selectedRole', role); // Save the role to localStorage on page load
  }, [location]);

  // Handle form submission
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('age', user.age);
    formData.append('phone', user.phone);
    formData.append('address', user.address);
    formData.append('role', selectedRole);
    if (user.specialty) formData.append('specialty', user.specialty);
    if (user?.image) formData.append('image', user.image); // Append the image file

    try {
      const res = await register(formData);
      console.log(res); // Handle successful registration
      // Redirect based on the selected role
      if (selectedRole === 'admin') {
        navigate('/login?role=admin');
      } else if (selectedRole === 'doctor') {
        navigate('/login?role=doctor');
      } else {
        navigate('/login?role=patient');
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err);
      if (err.response?.data?.errors) {
        console.log("Validation Errors:", err.response?.data.errors);
      }
    }
  };

  // visible password handler
  const showPasswordHandler = () => {
    setShowPass(!showPass);
  }

  return (
    <div className="min-h-screen bg-gray-100 grid lg:grid-cols-2 gap-5 lg:px-16 pb-8 md:px-10 p-5">
      <div>
        <div className="bg-white shadow-lg rounded-xl w-full p-6">
          <h2 className="flex justify-center items-center text-3xl font-semibold mb-4 titel_content text-black">
            <Link to="/" className="pe-3" title="go to home">
              <FcUndo />
            </Link>
            {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Registration
          </h2>

          {/* Buttons to switch between different roles */}
          <div className="flex justify-between mb-6">
            {['patient', 'doctor', 'admin'].map((role) => (
              <button
                key={role}
                onClick={() => handleRoleSelect(role)}
                className={`w-[32%] py-2 px-4 rounded-lg text-white font-bold transition duration-200 ${selectedRole === role ? 'bg-teal-500' : 'bg-teal-300 hover:bg-teal-400'}`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>

          <form onSubmit={handleOnSubmit} className="space-y-4">
            <input
              type="text"
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Full Name"
              name="name"
              id="name"
              value={user?.name}
              onChange={handleOnChange}
            />
            <input
              type="text"
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Full Name"
              name="age"
              id="age"
              value={user?.age}
              onChange={handleOnChange}
            />
            <input
              type="text"
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Full Name"
              name="phone"
              id="phone"
              value={user?.phone}
              onChange={handleOnChange}
            />
            <input
              type="text"
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Full Name"
              name="address"
              id="address"
              value={user?.address}
              onChange={handleOnChange}
            />
            <input
              type="email"
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Email"
              name="email"
              id="email"
              value={user?.email}
              onChange={handleOnChange}
            />
            <div className='relative'>
              <input
                type={showPass ? "text" : "password"}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Password"
                name="password"
                id="password"
                value={user?.password}
                onChange={handleOnChange}
              />
              <button type="button" onClick={showPasswordHandler} className="absolute right-3 top-3 text-xl">
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {selectedRole !== 'patient' && selectedRole !== 'admin' && (
              <div>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Specialization"
                  name="specialty"
                  id="specialty"
                  value={user?.specialty}
                  onChange={handleOnChange}
                />
              </div>
            )}

            <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center w-full">
              <div className="text-gray-600 flex flex-col items-center">
                <div className="bg-gray-600 text-white p-1 rounded-full">
                  <FaCloudUploadAlt />
                </div>
                <label className="mt-1 px-4 py-1 bg-gray-700 text-white rounded cursor-pointer">
                  Browse file
                  <input
                    type="file"
                    className="hidden"
                    name="image"
                    id="image"
                    accept="image/jpeg, image/png, image/jpg, image/gif"
                    onChange={handleOnChange}
                  />
                </label>
              </div>
              {user && <p className="mt-2 text-sm text-gray-700">{user?.image?.name}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200"
            >
              Register as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
            </button>
            <div className="text-center">
              <span className="text-black">---- Login With Social Account ----</span>
              <div className="flex justify-center items-center space-x-5 py-3">
                <Link to="/">
                  <img src={googleIcon} alt="google" className="w-10" />
                </Link>
                <Link to="/">
                  <img src={facebookIcon} alt="facebook" className="w-10" />
                </Link>
                <Link to="/">
                  <img src={twiterIcon} alt="twitter" className="w-10" />
                </Link>
              </div>
              <div className="text-center pt-3">
                <span className="text-black">
                  Already have an account?{' '}
                  <Link to={`/login?role=${selectedRole}`}>
                    <span className="underline text-teal-400 font-medium text-xl">Login</span>
                  </Link>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <img src={animationGif} className="" alt="animation" />
      </div>
    </div>
  );
};

export default Register;
