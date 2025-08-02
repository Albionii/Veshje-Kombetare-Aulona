import React, { useState } from 'react'
import Logo from '../../public/Logoja.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [formData, setFormData] = useState(
    {
      username: "",
      password: ""
    }
  )

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post(import.meta.env.VITE_API_BASE_URL + "/login", formData, {withCredentials: true})
    .then((response) => {
      if (response.data == "404"){
        alert("Provoni edhe njehere")
      }
      else {
        navigate("/")
      }
    })
    .catch((error)=> console.log("error : " + error))
    
  }


  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <form className='w-[500px] bg-[#faf6ea] rounded p-9 flex justify-center items-center flex-col' onSubmit={handleSubmit}>
        <div className='flex justify-center items-center flex-col gap-4 mb-5'>
          <span className='text-[30px] font-extralight text-black'>WELCOME</span>
          <img src={Logo} alt="" width={"70px"}/>
        </div>

       <div className="relative z-0 w-full group mb-7">
          <input
            type="text"
            name="username"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            autoComplete="off"
            value={formData.username ?? ""}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
          
          <label
            htmlFor="username"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Username
          </label>
        </div>
        <div className="relative z-0 w-full group mb-5">
          <input
            type="password"
            name="password"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            autoComplete="off"
            value={formData.password ?? ""}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>

        
        <div className="relative z-0 w-full mb-5 group flex justify-center items-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-11 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Nuk keni llogari?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Regjistrohu
          </span>
        </p>
      </form>


    </div>

  )
}
