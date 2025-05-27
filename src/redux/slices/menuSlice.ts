import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuState {
  restaurants: any[];
  currentRestaurant: any | null;
  categories: any[];
  menu: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  restaurants: [],
  currentRestaurant: null,
  categories: [],
  menu: null,
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setRestaurants: (state, action: PayloadAction<any[]>) => {
      state.restaurants = action.payload;
      state.error = null;
    },
    setCurrentRestaurant: (state, action: PayloadAction<any>) => {
      state.currentRestaurant = action.payload;
      state.error = null;
    },
    setCategories: (state, action: PayloadAction<any[]>) => {
      state.categories = action.payload;
      state.error = null;
    },
    setMenu: (state, action: PayloadAction<any>) => {
      state.menu = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearMenuState: (state) => {
      state.currentRestaurant = null;
      state.categories = [];
      state.menu = null;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setRestaurants,
  setCurrentRestaurant,
  setCategories,
  setMenu,
  setError,
  clearMenuState,
} = menuSlice.actions;

export default menuSlice.reducer;
