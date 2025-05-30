import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: any;
  side?: {
    id: number;
    name: string;
    price: number;
  };
  proteins?: {
    id: number;
    name: string;
    price: number;
  }[];
  drink?: {
    id: number;
    name: string;
    price: number;
  };
  restaurantId?: number;
  restaurantName?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      state.total = state.items.reduce((sum, item) => {
        const itemTotal = item.price * item.quantity;
        const sideTotal = item.side ? item.side.price * item.quantity : 0;
        const proteinsTotal = item.proteins
          ? item.proteins.reduce((sum, protein) => sum + protein.price, 0) *
            item.quantity
          : 0;
        const drinkTotal = item.drink ? item.drink.price * item.quantity : 0;
        return sum + itemTotal + sideTotal + proteinsTotal + drinkTotal;
      }, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
