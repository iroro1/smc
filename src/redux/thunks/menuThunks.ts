import { createAsyncThunk } from "@reduxjs/toolkit";
import { menuService } from "../../utils/api/services";
import {
  setLoading,
  setRestaurants,
  setCurrentRestaurant,
  setCategories,
  setMenu,
  setError,
} from "../slices/menuSlice";

export const fetchRestaurants = createAsyncThunk(
  "menu/fetchRestaurants",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await menuService.getRestaurants();
      dispatch(setRestaurants(response.data));
      return response.data;
    } catch (error: any) {
      dispatch(
        setError(error.response?.data?.message || "Failed to fetch restaurants")
      );
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchRestaurantMenu = createAsyncThunk(
  "menu/fetchRestaurantMenu",
  async (restaurantId: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await menuService.getRestaurantMenu(restaurantId);
      dispatch(setMenu(response.data));
      return response.data;
    } catch (error: any) {
      dispatch(
        setError(error.response?.data?.message || "Failed to fetch menu")
      );
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "menu/fetchCategories",
  async (restaurantId: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await menuService.getCategories(restaurantId);
      dispatch(setCategories(response.data));
      return response.data;
    } catch (error: any) {
      dispatch(
        setError(error.response?.data?.message || "Failed to fetch categories")
      );
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
