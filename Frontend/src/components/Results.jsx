import { useSelector } from "react-redux";
import useFetchResult from "../customHooks/useFetchResult";
import { Link } from "react-router-dom";

const Results = () => {
  useFetchResult();

  const results = useSelector((store) => store.result);

  return (
    <div>
      <h1 className="text-center my-5 text-5xl font-light text-purple-500">
        INTERVIEW RESULTS
      </h1>
      {results.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No Results found..!</p>
      ) : (
        <>
          <div className="overflow-x-auto w-5/6 m-auto bg-gray-900 rounded-box p-2">
            <table className="table">
              <thead>
                <tr className="text-center font-mono">
                  <th>Company Name</th>
                  <th>Interview Date</th>
                  <th>Student Name</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr
                    key={result._id}
                    className="hover:bg-base-300 text-center"
                  >
                    <td>{result.interview?.companyName}</td>
                    <td>
                      {new Date(
                        result.interview?.interviewDate
                      ).toLocaleDateString()}
                    </td>
                    <td>{result.student.name}</td>
                    <td>{result.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <div className="flex justify-end mt-5 mr-32 my-10">
        <button className="btn bg-green-700">
          <Link to="/update-results">Update Results</Link>
        </button>
      </div>
    </div>
  );
};

export default Results;
