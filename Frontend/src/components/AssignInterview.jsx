import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { addInterview } from "../utils/interviewSlice";

const AssignInterview = () => {
  const [error, setError] = useState("");
  const [selectedInterview, setSelectedInterview] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const interviews = useSelector((store) => store.interview);
  const students = useSelector((store) => store.student);

  const handleAssign = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/interviews/${selectedInterview}/assign/${selectedStudent}`,
        {},
        { withCredentials: true }
      );
      navigate("/");
      dispatch(addInterview(res.data.updateInterview));
    } catch (error) {
      console.error("Error assigning student:", error);
      setError(error.response?.data?.message || "Failed to assign student.");
    }
  };

  return (
    <div className="w-2/6 m-auto bg-gray-950 p-5 flex flex-col justify-center rounded-box mt-10">
      <fieldset className="fieldset w-full p-4 rounded-box">
        <legend className="fieldset-legend text-center text-3xl font-light">
          Assign Interview To Student
        </legend>

        <div className="grid grid-cols-1">
          <label className="fieldset-label">Company Name</label>
          <select
            className="input w-full my-3 focus:outline-none"
            value={selectedInterview}
            onChange={(e) => setSelectedInterview(e.target.value)}
          >
            <option value="">Select Company</option>
            {interviews.map((interview) => (
              <option key={interview._id} value={interview._id}>
                {interview.companyName}
              </option>
            ))}
          </select>

          <label className="fieldset-label">Student Name</label>
          <select
            className="input w-full my-3 focus:outline-none"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className="text-red-500 font-semibold text-[13px]">{error}</p>
        )}

        <button className="btn bg-green-600 mt-4 py-3" onClick={handleAssign}>
          Assign
        </button>
      </fieldset>
    </div>
  );
};

export default AssignInterview;
