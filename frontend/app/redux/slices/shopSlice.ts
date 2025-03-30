import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Shop } from "../types";

interface ShopState {
  shops: Shop[];
}

const initialState: ShopState = {
  shops: [],
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addShop: (state, action: PayloadAction<Shop>) => {
      state.shops.push(action.payload);
    },
    removeShop: (state, action: PayloadAction<number>) => {
      state.shops = state.shops.filter(shop => shop.id !== action.payload);
    },
  },
});

export const { addShop, removeShop } = shopSlice.actions;
export default shopSlice.reducer;
