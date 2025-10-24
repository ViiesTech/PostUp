import {createSlice} from '@reduxjs/toolkit';
import {Apis} from '../services';

const initialState = {
  token: '',
  user: {},
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setLogout: state => {
      state.user = {};
      state.token = null;
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
  },
});

export const {setLogout} = appSlice.actions;

export default appSlice.reducer;
