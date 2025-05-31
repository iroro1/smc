import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: null | {
    id: number;
    email: string;
    fullName: string;
    imageUrl?: string;
    phoneNumber: string;
    token: string;
  };
  loading: boolean;
  error: string | null;
  registerData: null | {
    email: string;
    password: string;
    phoneNumber: string;
    fullName: string;
  };
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  registerData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setRegisterData: (
      state,
      action: PayloadAction<AuthState["registerData"]>
    ) => {
      state.registerData = action.payload;
    },
    setUser: (state, action: PayloadAction<AuthState["user"]>) => {
      state.user = action.payload;
      console.log(action.payload, "payload");

      state.isAuthenticated = action.payload?.token ? true : false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { setLoading, setUser, setError, logout, setRegisterData } =
  authSlice.actions;
export default authSlice.reducer;
