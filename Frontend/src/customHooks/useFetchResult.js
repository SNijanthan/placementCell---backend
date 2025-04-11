import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { setResult } from "../utils/resultSlice";

const useFetchResult = () => {
  const dispatch = useDispatch();
  const result = useSelector((store) => store.result);

  useEffect(() => {
    if (!result || result.length === 0) {
      const fetchResult = async () => {
        try {
          const res = await axios.get(BASE_URL + "/results", {
            withCredentials: true,
          });
          dispatch(setResult(res?.data?.results));
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      };

      fetchResult();
    }
  }, [dispatch, result]);
};

export default useFetchResult;
