import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, LOADING_FALSE, SAVE_PROFILE } from "../actions/actionTypes"

const initialState = {
  loading: true,
  user: {},
  isLoggedIn: false,
  token: "",
  successMsg: "",
  errorMsg: "",
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true, user: {}, isLoggedIn: false, token: "", successMsg: "", errorMsg: "", };
    case LOGIN_SUCCESS:
      return { loading: false, user: action.payload.user, isLoggedIn: true, token: action.payload.token, successMsg: action.payload.msg, errorMsg: "" };
    case LOGIN_FAILURE:
      return { loading: false, user: {}, isLoggedIn: false, token: "", successMsg: "", errorMsg: action.payload.msg };
    case LOGOUT:
      return { loading: false, user: {}, isLoggedIn: false, token: "", successMsg: "", errorMsg: "" }
    case SAVE_PROFILE:
      return { loading: false, user: action.payload.user, isLoggedIn: true, token: action.payload.token, successMsg: "", errorMsg: "" }
    case LOADING_FALSE:
      return { ...state, loading: false };
    default:
      return state;
  }
}

export default authReducer;