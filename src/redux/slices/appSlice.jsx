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
  isGoogleSign: false,
  reminders: [],
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setLogout: state => {
      state.user = {};
      state.token = null;
      state.isGoogleSign = false;
    },
    saveUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
    setOnboardingDone: state => {
      state.isFirstLaunch = false;
    },
    addReminder: (state, action) => {
      state.reminders.push(action.payload);
    },
    deleteReminder: (state, action) => {
      state.reminders = state.reminders.filter(
        item => item.id !== action.payload,
      );
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
          if (action.payload?.token) {
            state.token = action.payload?.token;
          }
        },
      )
      .addMatcher(
        Apis.endpoints.googleSignIn.matchFulfilled,
        (state, action) => {
          if (action.payload?.data && action.payload?.token) {
            state.user = action.payload.data;
            state.token = action.payload.token;
            state.isGoogleSign = true;
          }
        },
      )
      .addMatcher(Apis.endpoints.verifyOTP.matchFulfilled, (state, action) => {
        // Only save during signup flow — response includes token + user data
        if (action.payload?.token) {
          state.token = action.payload.token;
        }
        if (action.payload?.data) {
          state.user = action.payload.data;
        }
      });
  },
});

export const {
  setLogout,
  saveUserLocation,
  setOnboardingDone,
  addReminder,
  deleteReminder,
} = appSlice.actions;

export default appSlice.reducer;
