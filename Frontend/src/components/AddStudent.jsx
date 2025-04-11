import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addStudent } from "../utils/studentSlice";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [dsaScore, setDsaScore] = useState("");
  const [webDScore, setWebDScore] = useState("");
  const [reactScore, setReactScore] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddStudents = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/students",
        { name, college, dsaScore, webDScore, reactScore, status },
        { withCredentials: true }
      );

      dispatch(addStudent(res.data?.student));
      navigate("/");
    } catch (error) {
      if (error.status === 400 || error.status === 409) {
        setError(error.response.data.message);
      }
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-3/6 m-auto bg-gray-950  p-5 flex  flex-col justify-center rounded-box mt-10">
        <fieldset className="fieldset w-full p-4 rounded-box">
          <legend className="fieldset-legend text-center text-3xl font-light">
            ADD STUDENT
          </legend>
          <div className="grid grid-cols-2">
            <label className="fieldset-label">Name</label>
            <input
              type="text"
              className="input w-full my-3 py-3 focus:outline-none"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="fieldset-label">College</label>
            <input
              type="text"
              className="input w-full my-3 py-3 focus:outline-none"
              placeholder="College"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            />
            <label className="fieldset-label">DSA Score</label>
            <input
              type="number"
              className="input w-full my-3 py-3 focus:outline-none"
              placeholder="DSA Score"
              value={dsaScore}
              onChange={(e) => setDsaScore(e.target.value)}
            />
            <label className="fieldset-label">Web Development Score</label>
            <input
              type="number"
              className="input w-full my-3 py-3 focus:outline-none"
              placeholder="Web Development Score"
              value={webDScore}
              onChange={(e) => setWebDScore(e.target.value)}
            />
            <label className="fieldset-label">React Score</label>
            <input
              type="number"
              className="input w-full my-3 py-3 focus:outline-none"
              placeholder="React Score"
              value={reactScore}
              onChange={(e) => setReactScore(e.target.value)}
            />
            <label className="fieldset-label">Status</label>
            <input
              type="text"
              className="input w-full my-3 py-3 focus:outline-none"
              placeholder="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          {error && (
            <p className="text-red-500 font-semibold text-[13px]">{error}</p>
          )}
          <button
            className="btn bg-green-600 mt-4 py-6"
            onClick={handleAddStudents}
          >
            Save
          </button>
        </fieldset>
      </div>
    </>
  );
};

export default AddStudent;
