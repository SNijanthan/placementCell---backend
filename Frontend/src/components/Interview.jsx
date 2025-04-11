import { Link } from "react-router-dom";
import useFetchInterview from "../customHooks/useFetchInterview";
import { useSelector } from "react-redux";

const Interview = () => {
  const interviews = useSelector((store) => store.interview);
  useFetchInterview();

  return (
    <div>
      <h1 className="text-center my-5 text-5xl font-light text-purple-500">
        INTERVIEW DETAILS
      </h1>
      {interviews.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No interview found.</p>
      ) : (
        <>
          <div className="overflow-x-auto w-5/6 m-auto bg-gray-900 rounded-box p-2">
            <table className="table">
              <thead>
                <tr className="text-center font-mono">
                  <th>Interview Date</th>
                  <th>Company Name</th>
                  <th>Student Name</th>
                </tr>
              </thead>
              <tbody>
                {interviews.map((interview) => (
                  <tr
                    key={interview._id}
                    className="hover:bg-base-300 text-center"
                  >
                    <td>
                      {new Date(interview.interviewDate).toLocaleDateString()}
                    </td>
                    <td>{interview.companyName}</td>
                    {interview.students.map((student) => (
                      <td
                        key={student._id}
                        className="flex items-center justify-center"
                      >
                        {student.name}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <div className="flex justify-end mt-5">
        <button className="btn bg-green-700 mr-8">
          <Link to="/interview">Add Interview</Link>
        </button>
        <button className="btn bg-green-700 mr-32">
          <Link to="/assign-interview">Assign Interview</Link>
        </button>
      </div>
    </div>
  );
};

export default Interview;
