// src/services/authService.ts
import axios from "axios";
import { API_BASE_URL } from "../utils/api/config";
import { ApiResponse } from "../utils/types";
import {
  CHANGE_PASSWORD,
  CONFIRM_TOKEN,
  FORGOT_PASSWORD,
  LOGIN,
  LOGOUT,
  RESET_PASSWORD,
  SIGNUP,
} from ".";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

interface ForgotPasswordData {
  email: string;
}

interface ResetPasswordData {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

class AuthService {
  private apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Working
  async login(
    credentials: LoginCredentials
  ): Promise<ApiResponse<{ data: any }>> {
    const response = await this.apiClient.post(LOGIN, credentials);
    return response.data;
  }
  // Working
  async register(data: RegisterData): Promise<ApiResponse<{ data: any }>> {
    const response = await this.apiClient.post(SIGNUP, data);
    console.log("Registration response: from Auth Service", response);

    return response.data;
  }

  // Working
  async forgotPassword(
    data: ForgotPasswordData
  ): Promise<ApiResponse<{ message: string }>> {
    const response = await this.apiClient.post(FORGOT_PASSWORD, data);
    return response.data;
  }
  // Working
  async confirmToken(data: any): Promise<ApiResponse<{ message: string }>> {
    const response = await this.apiClient.post(CONFIRM_TOKEN, data);
    return response.data;
  }

  // WIP
  async resetPassword(
    data: ResetPasswordData
  ): Promise<ApiResponse<{ message: string }>> {
    const response = await this.apiClient.post(RESET_PASSWORD, data);
    return response.data;
  }

  // INAPP pasword change
  async changePassword(
    data: ChangePasswordData
  ): Promise<ApiResponse<{ message: string }>> {
    const response = await this.apiClient.post(CHANGE_PASSWORD, data);
    return response.data;
  }

  async logout(): Promise<ApiResponse<{ message: string }>> {
    const response = await this.apiClient.post(LOGOUT);
    return response.data;
  }

  async getCurrentUser(): Promise<ApiResponse<{ user: any }>> {
    const response = await this.apiClient.get("/auth/me");
    return response.data;
  }
}

export const authService = new AuthService();
