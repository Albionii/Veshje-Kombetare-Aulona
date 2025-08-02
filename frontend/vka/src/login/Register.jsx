// src/pages/Register.jsx
import React, { useState } from 'react';
import Logo from '../../public/Logoja.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(import.meta.env.VITE_API_BASE_URL + '/register', formData)
      .then((response) => {
        alert("Llogaria u krijua me sukses!");
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
        alert("Diçka shkoi keq. Provoni përsëri.");
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        className="w-[500px] bg-[#faf6ea] rounded p-9 flex justify-center items-center flex-col"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center items-center flex-col gap-4 mb-5">
          <span className="text-[30px] font-extralight text-black">REGISTER</span>
          <img src={Logo} alt="" width={'70px'} />
        </div>

        <div className="relative z-0 w-full group mb-5">
          <input
            type="text"
            name="username"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <label htmlFor="username" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
            Username
          </label>
        </div>

        <div className="relative z-0 w-full group mb-5">
          <input
            type="text"
            name="name"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <label htmlFor="name" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
            Name
          </label>
        </div>

        <div className="relative z-0 w-full group mb-5">
          <input
            type="password"
            name="password"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <label htmlFor="password" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
            Password
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group flex justify-center items-center">
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-11 py-2.5 text-center"
          >
            Regjistrohu
          </button>
        </div>

        <p className="text-sm text-gray-600 mt-4">
          Ke llogari?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Kyçu këtu
          </span>
        </p>
      </form>
    </div>
  );
}
