import {createSlice} from '@reduxjs/toolkit';
import {Apis} from '../services';

const initialState = {
  token: '',
  user: {},
  userLocation: {
    lat: null,
    long: null,
  },
  isFirstLaunch: true,
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setLogout: state => {
      state.user = {};
      state.token = null;
    },
    saveUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
    setOnboardingDone: state => {
      state.isFirstLaunch = false;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(Apis.endpoints.login.matchFulfilled, (state, action) => {
        if (action.payload?.data && action.payload?.token) {
          state.user = action.payload.data;
          state.token = action.payload.token;
        }
      })
      .addMatcher(
        Apis.endpoints.createProfile.matchFulfilled,
        (state, action) => {
          if (action.payload?.data) {
            state.user = action.payload?.data;
          }
        },
      );
  },
});

export const {setLogout, saveUserLocation, setOnboardingDone} =
  appSlice.actions;

export default appSlice.reducer;
