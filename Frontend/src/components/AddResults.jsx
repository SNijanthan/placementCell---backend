import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addResult } from "../utils/resultSlice";
import { useNavigate } from "react-router-dom";

const AddResults = () => {
  const [student, setStudent] = useState("");
  const [company, setCompany] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const students = useSelector((store) => store.student);

  const interviews = useSelector((store) => store.interview);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateResult = async () => {
    if (student.length === 0 || company.length === 0) {
      setError("Fields cannot be empty");
      return;
    }
    try {
      const res = await axios.post(
        BASE_URL + "/results",
        { studentID: student, interviewID: company, result },
        { withCredentials: true }
      );

      dispatch(addResult(res.data.results));
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
      <div className="w-2/6 m-auto bg-gray-950 p-5 flex flex-col justify-center rounded-box mt-10">
        <fieldset className="fieldset w-full p-4 rounded-box">
          <legend className="fieldset-legend text-center text-3xl font-light">
            Update Results
          </legend>

          <div className="grid grid-cols-1">
            <label className="fieldset-label">Student Name</label>
            <select
              className="input w-full my-3 focus:outline-none"
              value={student}
              onChange={(e) => setStudent(e.target.value)}
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name}
                </option>
              ))}
            </select>

            <label className="fieldset-label">Company Name</label>
            <select
              className="input w-full my-3 focus:outline-none"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              <option value="">Select Company</option>
              {interviews.map((interview) => (
                <option key={interview._id} value={interview._id}>
                  {interview.companyName}
                </option>
              ))}
            </select>

            <label className="fieldset-label">Result</label>
            <select
              className="input w-full my-3 focus:outline-none"
              value={result}
              onChange={(e) => setResult(e.target.value)}
            >
              <option value="">Select Result</option>
              <option value="PASS">Pass</option>
              <option value="FAIL">Fail</option>
              <option value="ON_HOLD">On hold</option>
              <option value="DID_NOT_ATTEND">Did not attend</option>
            </select>
          </div>

          {error && (
            <p className="text-red-500 font-semibold text-[13px]">{error}</p>
          )}

          <button
            className="btn bg-green-600 mt-4 py-3"
            onClick={handleUpdateResult}
          >
            Update Result
          </button>
        </fieldset>
      </div>
    </>
  );
};

export default AddResults;
