import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    firstName: "Narendra",
    lastName: "Yadav",
    email: "yadavnarendra@gmail.com",
    balance: 1000,
  },

  logged: false,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.logged = true;
    },
    updateUser: (state, action) => {
      const { field, value } = action.payload;
      state.userInfo[field] = value;
    },
    logout: (state) => {
      state.userInfo = {
        firstName: "",
        lastName: "",
        email: "",
        balance: 0,
      };
      state.logged = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, updateUser,logout, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;
