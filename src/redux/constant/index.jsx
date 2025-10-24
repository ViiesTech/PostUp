export const BASE_URL = 'https://p5vt75rb-3010.asse.devtunnels.ms/'
export const IMAGE_URL = 'https://p5vt75rb-3010.asse.devtunnels.ms/'

export const endpoints = {
  signup: 'api/user/signUpUser',
  login: 'api/user/loginUser',
  sendEmail: 'api/user/sendOtp',
  verifyOTP: 'api/user/verifyOtp',
  password: 'api/user/resetPassword',
  UPDATE_PROFILE: 'api/user/updateUser',
  GET_PROFILE: 'api/user/getUserById',
  GET_ALL_EVENTS: '/api/admin/getEvent',
  GET_EVENT_BY_ID: eventId =>  `/api/admin/getEventById?eventId=${eventId}`,
  ADD_OR_REMOVE_TO_FAV: '/api/user/addOrRemoveFavorite',
  GET_FAVORITES: '/api/user/getFavorites',
}