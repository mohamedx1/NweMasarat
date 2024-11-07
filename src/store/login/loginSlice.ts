import { createSlice , } from "@reduxjs/toolkit";
import getToken from './act/actLogin';


interface IinitialState {
     token: string,
    isLoading: "idle" | "pending" | "succeeded" | "failed",
    error:null| string,
}






const initialState : IinitialState = {
    token: "",
    isLoading: "idle",
    error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getToken.pending, (state) => {
      state.isLoading = "pending";
      state.error = null;

    })
    builder.addCase(getToken.fulfilled, (state , action) => {
      state.isLoading = "succeeded";
      state.error = null;
      console.log(action.payload)
      state.token = action.payload;

    })
    builder.addCase(getToken.rejected, (state , action) => {
      state.isLoading = "failed";
      if (action.payload && typeof action.payload  === "string"  ) {
        state.error  = action.payload ;
        console.log(action.payload)
      }
    })
  },
});
export {  };

export default loginSlice.reducer;
