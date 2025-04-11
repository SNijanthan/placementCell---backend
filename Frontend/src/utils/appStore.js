import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import studentReducer from "./studentSlice";
import interviewReducer from "./interviewSlice";
import resultReducer from "./resultSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    student: studentReducer,
    interview: interviewReducer,
    result: resultReducer,
  },
});

export default appStore;
