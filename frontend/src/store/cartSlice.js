import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    storeId: null,
    storeName: null,
    isDelivery: false,
  },
  reducers: {
    addItem: (state, action) => {
      const { item, storeId, storeName, isDelivery } = action.payload;
      // Agar boshqa do'kondan buyurtma bo'lsa, savatni tozala
      if (state.storeId && state.storeId !== storeId) {
        state.items = [];
      }
      state.storeId = storeId;
      state.storeName = storeName;
      state.isDelivery = isDelivery || false;

      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      if (state.items.length === 0) {
        state.storeId = null;
        state.storeName = null;
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((i) => i.id !== id);
        if (state.items.length === 0) {
          state.storeId = null;
          state.storeName = null;
        }
      } else {
        const item = state.items.find((i) => i.id === id);
        if (item) item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.storeId = null;
      state.storeName = null;
    },
  },
});

// Selectors
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
