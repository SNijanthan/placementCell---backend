import { createSlice } from "@reduxjs/toolkit";

const interviewSlice = createSlice({
  name: "interview",
  initialState: [],
  reducers: {
    setInterview: (state, action) => {
      return action.payload;
    },
    addInterview: (state, action) => {
      const index = state.findIndex((i) => i._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload; // Update existing interview
      } else {
        state.push(action.payload); // Add new interview only if not existing
      }
    },
    removeInterview: () => [],
  },
});

export default interviewSlice.reducer;
export const { setInterview, addInterview, removeInterview } =
  interviewSlice.actions;
