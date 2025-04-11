import { createSlice } from "@reduxjs/toolkit";

const resultSlice = createSlice({
  name: "result",
  initialState: [],
  reducers: {
    setResult: (state, action) => {
      return action.payload;
    },
    addResult: (state, action) => {
      state.push(action.payload);
    },
    removeResult: () => null,
  },
});

export default resultSlice.reducer;
export const { setResult, addResult, removeResult } = resultSlice.actions;
