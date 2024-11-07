import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const data = {
  username: "newuser",
  password: "password123"
};

const loginData = JSON.stringify(data);

const getToken = createAsyncThunk("login/getToken", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    console.log(loginData)
    const response = await axios.post("http://127.0.0.1:8000/users/login/", loginData, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    const token = response.data.access;
    return token;
  } catch (error) {
    console.log(loginData)
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An Unexpected Error");
    }
  }
});

export default getToken;
