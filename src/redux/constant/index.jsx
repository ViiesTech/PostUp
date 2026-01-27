export const BASE_URL = 'https://apiforapp.link/PostUp/';
export const IMAGE_URL = 'https://apiforapp.link/PostUp/';

export const endpoints = {
  signup: 'api/user/signUpUser',
  login: 'api/user/loginUser',
  sendEmail: 'api/user/sendOtp',
  verifyOTP: 'api/user/verifyOtp',
  password: 'api/user/resetPassword',
  UPDATE_PROFILE: 'api/user/updateUser',
  GET_PROFILE: 'api/user/getUserById',
  GET_ALL_EVENTS: '/api/admin/getEvent',
  GET_EVENT_BY_ID: eventId => `/api/admin/getEventById?eventId=${eventId}`,
  ADD_OR_REMOVE_TO_FAV: '/api/user/addOrRemoveFavorite',
  GET_FAVORITES: '/api/user/getFavorites',
  CHANGE_PASSWORD: '/api/user/resetPassword',
  GET_BANNER: '/api/admin/getBanner',
  CREATE_POST: '/api/user/createPost',
  GET_ALL_POST: '/api/user/getAllPost',
  LIKE_POST: '/api/user/likeAndUnLikePost',
  COMMENT_POST: '/api/user/commentByUser',
  REPLY_COMMENT_POST: '/api/user/replyByUser',
  CREATE_EVENT: '/api/admin/createEvent',
  GET_NEAR_BY_USERS: (longitude, latitude) =>
    `/api/user/getNearbyUsers?longitude=${longitude}&latitude=${latitude}`,
  ADD_REQUEST: '/api/user/sendFollowRequest',
  IGNORE_USER: '/api/user/ignoreUser',
  BLOCK_USER: '/api/user/blockUser',
  GET_FOLLOWINGS_FOLLOWREQ: type => `/api/user/getFollowingsAndFollowReq?type=${type}`,
  SEARCH_BY_EVENT_NAME: eventName => `/api/admin/getEvent?eventName=${eventName}`,
  APPROVE_REJECT: '/api/user/followRequest',
};
