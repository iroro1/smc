import { apiClient } from "./config";

// Types
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// Auth Services
export const authService = {
  login: async (
    credentials: LoginCredentials
  ): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  },

  register: async (
    data: RegisterData
  ): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },
};

// Menu Services
export const menuService = {
  getRestaurants: async (): Promise<ApiResponse<any[]>> => {
    const response = await apiClient.get("/restaurants");
    return response.data;
  },

  getRestaurantMenu: async (
    restaurantId: string
  ): Promise<ApiResponse<any>> => {
    const response = await apiClient.get(`/restaurants/${restaurantId}/menu`);
    return response.data;
  },

  getCategories: async (restaurantId: string): Promise<ApiResponse<any[]>> => {
    const response = await apiClient.get(
      `/restaurants/${restaurantId}/categories`
    );
    return response.data;
  },
};

// Order Services
export const orderService = {
  createOrder: async (orderData: any): Promise<ApiResponse<any>> => {
    const response = await apiClient.post("/orders", orderData);
    return response.data;
  },

  getOrders: async (): Promise<ApiResponse<any[]>> => {
    const response = await apiClient.get("/orders");
    return response.data;
  },

  getOrderDetails: async (orderId: string): Promise<ApiResponse<any>> => {
    const response = await apiClient.get(`/orders/${orderId}`);
    return response.data;
  },
};
