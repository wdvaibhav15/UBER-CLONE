import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {

  const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState({});
  
    const submitHandler = (e) => {
      e.preventDefault();
  
      setUserData({
        fullName:{
          firstname: firstName,
          lastname: lastName,
        },
        email: email,
        password: password,
      });
  
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-9"
          src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png"
          alt="Uber"
        />
        <form onSubmit={(e)=>{
          submitHandler(e);
        }}>
          <h3 className="text-lg font-medium mb-2">Enter your Name</h3>
          <div className="flex gap-3 mb-2">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="bg-[#eeeeee] w-1/2  rounded px-4 py-4 border text-base placeholder:text-base h-12"
              type="text"
              placeholder="Fisrt name"
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="bg-[#eeeeee] w-1/2  rounded px-4 py-4 border text-base placeholder:text-base h-12"
              type="text"
              placeholder="Last name"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your Email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-[#eeeeee] mb-2 rounded px-4 py-4 border w-full text-base placeholder:text-base h-12"
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#eeeeee] mb-6 rounded px-4 py-4 border w-full text-base placeholder:text-base h-12"
            placeholder="password"
          />
          <button
            className="bg-[#111] text-white font-semibold mb-3 rounded-xl px-4 py-4 border w-full text-lg placeholder:text-base"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[12px]">
          By proceeding, you consent to get calls, WhatsApp or SMS messages,
          including by automated means, from Uber and its affiliates to the
          number provided.
        </p>
      </div>
    </div>
  )
}

export default CaptainSignup
