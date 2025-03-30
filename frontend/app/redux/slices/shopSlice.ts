import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images?: string[];
}

interface Shop {
  _id: string;
  name: string;
  description: string;
  owner_id: string;
  products: string[];
}

interface ShopState {
  shop: Shop | null;
  products: Product[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ShopState = {
  shop: null,
  products: [],
  loading: false,
  error: null,
};

// Async thunk to fetch shop and its products
export const fetchShopAndProducts = createAsyncThunk(
  "shop/fetchShopAndProducts",
  async (shopId: string, { rejectWithValue }) => {
    try {
      const shopResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/shops/${shopId}`);
      const shopData = shopResponse.data;
      const productIds = shopData.products || [];

      // Fetch product details
      const productRequests = productIds.map((productId: string) =>
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`)
      );
      const productResponses = await Promise.all(productRequests);
      const products = productResponses.map((res) => res.data);

      return { shop: shopData, products };
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data?.message || "Failed to fetch shop data");
      }
      return rejectWithValue("Failed to fetch shop data");
    }
  }
);

// Redux slice
const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopAndProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShopAndProducts.fulfilled, (state, action) => {
        state.shop = action.payload.shop;
        state.products = action.payload.products;
        state.loading = false;
      })
      .addCase(fetchShopAndProducts.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default shopSlice.reducer;
