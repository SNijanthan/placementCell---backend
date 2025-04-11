import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: [],
  reducers: {
    setStudent: (state, action) => {
      return action.payload;
    },
    addStudent: (state, action) => {
      state.push(action.payload);
    },
    removeStudent: () => [],
  },
});

export const { setStudent, addStudent, removeStudent } = studentSlice.actions;
export default studentSlice.reducer;
