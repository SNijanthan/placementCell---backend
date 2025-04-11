import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/view-profile", {
        withCredentials: true,
      });
      dispatch(addUser(res?.data?.user));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user]);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Body;
