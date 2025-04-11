import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [count, setCount] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      setError("");
      setSuccess("");
      const res = await axios.post(BASE_URL + "/auth/signup", {
        email,
        password,
      });

      setSuccess(res.data.message);
      setError("");

      let timeLeft = 5;

      setCount(timeLeft);

      const interval = setInterval(() => {
        timeLeft -= 1;
        setCount(timeLeft);

        if (timeLeft === 0) {
          clearInterval(interval);
          navigate("/login");
        }
      }, 1000);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
        setSuccess("");
      }
    }
  };

  return (
    <>
      <div className="w-2/6 m-auto bg-gray-950  p-5 flex  flex-col justify-center rounded-box mt-32">
        <fieldset className="fieldset w-full p-4 rounded-box">
          <legend className="fieldset-legend text-center text-3xl font-light">
            Sign Up
          </legend>
          <label className="fieldset-label">Email</label>
          <input
            type="email"
            className="input w-full my-3 py-6 focus:outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="fieldset-label">Password</label>
          <input
            type="text"
            className="input w-full my-3 py-6 focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <p className="text-red-500 font-semibold text-[13px]">{error}</p>
          )}
          {success && (
            <p className="text-green-500 font-semibold text-[13px]">
              {success}.{" "}
              {count !== null && `Redirecting to login page in ${count}...`}
            </p>
          )}
          <button onClick={handleSignUp} className="btn bg-green-600 mt-4 py-6">
            Sign up
          </button>
        </fieldset>
      </div>
    </>
  );
};

export default Signup;
