import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addInterview } from "../utils/interviewSlice";

const AddInterview = () => {
  const [interviewDate, setInterviewDate] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddInterview = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/interviews",
        { interviewDate, companyName },
        { withCredentials: true }
      );

      dispatch(addInterview(res.data.interview));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="w-2/6 m-auto bg-gray-950  p-5 flex  flex-col justify-center rounded-box mt-10">
        <fieldset className="fieldset w-full p-4 rounded-box">
          <legend className="fieldset-legend text-center text-3xl font-light">
            ADD INTERVIEW
          </legend>
          <div className="grid grid-cols-1">
            <label className="fieldset-label">Interview Date</label>
            <input
              type="date"
              className="input w-full my-3 py-3 focus:outline-none"
              placeholder="Name"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
            />
            <label className="fieldset-label">Company Name</label>
            <input
              type="text"
              className="input w-full my-3 py-3 focus:outline-none"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          {error && (
            <p className="text-red-500 font-semibold text-[13px]">{error}</p>
          )}
          <button
            className="btn bg-green-600 mt-4 py-3"
            onClick={handleAddInterview}
          >
            Save
          </button>
        </fieldset>
      </div>
    </>
  );
};

export default AddInterview;
