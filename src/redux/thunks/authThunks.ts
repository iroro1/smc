import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  authService,
  LoginCredentials,
  RegisterData,
} from "../../utils/api/services";
import { setLoading, setUser, setError } from "../slices/authSlice";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await authService.login(credentials);
      localStorage.setItem("auth_token", response.data.token);
      dispatch(setUser(response.data.user));
      return response.data;
    } catch (error: any) {
      dispatch(setError(error.response?.data?.message || "Login failed"));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data: RegisterData, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await authService.register(data);
      localStorage.setItem("auth_token", response.data.token);
      dispatch(setUser(response.data.user));
      return response.data;
    } catch (error: any) {
      dispatch(
        setError(error.response?.data?.message || "Registration failed")
      );
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      await authService.logout();
      localStorage.removeItem("auth_token");
      dispatch(setUser(null));
    } catch (error: any) {
      dispatch(setError(error.response?.data?.message || "Logout failed"));
      throw error;
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await authService.getCurrentUser();
      dispatch(setUser(response.data));
      return response.data;
    } catch (error: any) {
      dispatch(
        setError(error.response?.data?.message || "Failed to get user data")
      );
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
