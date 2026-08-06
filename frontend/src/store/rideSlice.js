import { createSlice } from '@reduxjs/toolkit';

const rideSlice = createSlice({
  name: 'ride',
  initialState: {
    currentRide: null,
    selectedTariff: 'economy',
    fromAddress: '',
    toAddress: '',
    fromCoords: null,
    toCoords: null,
    estimatedPrice: null,
    estimatedTime: null,
    driver: null,
    status: 'idle', // idle | searching | found | in_progress | completed
    history: [],
  },
  reducers: {
    setAddress: (state, action) => {
      const { type, address, coords } = action.payload;
      if (type === 'from') {
        state.fromAddress = address;
        state.fromCoords = coords;
      } else {
        state.toAddress = address;
        state.toCoords = coords;
      }
    },
    setTariff: (state, action) => {
      state.selectedTariff = action.payload;
    },
    setEstimate: (state, action) => {
      state.estimatedPrice = action.payload.price;
      state.estimatedTime = action.payload.time;
    },
    startSearch: (state) => {
      state.status = 'searching';
      state.driver = null;
    },
    driverFound: (state, action) => {
      state.status = 'found';
      state.driver = action.payload;
    },
    startRide: (state) => {
      state.status = 'in_progress';
    },
    completeRide: (state, action) => {
      state.status = 'completed';
      state.currentRide = action.payload;
      if (action.payload) {
        state.history.unshift(action.payload);
      }
    },
    cancelRide: (state) => {
      state.status = 'idle';
      state.driver = null;
      state.currentRide = null;
    },
    resetRide: (state) => {
      state.status = 'idle';
      state.driver = null;
      state.currentRide = null;
      state.fromAddress = '';
      state.toAddress = '';
      state.fromCoords = null;
      state.toCoords = null;
      state.estimatedPrice = null;
    },
  },
});

export const {
  setAddress, setTariff, setEstimate, startSearch,
  driverFound, startRide, completeRide, cancelRide, resetRide,
} = rideSlice.actions;
export default rideSlice.reducer;
