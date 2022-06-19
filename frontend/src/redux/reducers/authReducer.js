import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOADING_INITIAL_FALSE, SAVE_PROFILE } from "../actions/actionTypes"

const initialState = {
  loadingInitial: true,
  loading: false,
  user: {},
  isLoggedIn: false,
  token: "",
  successMsg: "",
  errorMsg: "",
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loadingInitial: false, loading: true, user: {}, isLoggedIn: false, token: "", successMsg: "", errorMsg: "", };
    case LOGIN_SUCCESS:
      return { loadingInitial: false, loading: false, user: action.payload.user, isLoggedIn: true, token: action.payload.token, successMsg: action.payload.msg, errorMsg: "" };
    case LOGIN_FAILURE:
      return { loadingInitial: false, loading: false, user: {}, isLoggedIn: false, token: "", successMsg: "", errorMsg: action.payload.msg };
    case SAVE_PROFILE:
      return { loadingInitial: false, loading: false, user: action.payload.user, isLoggedIn: true, token: action.payload.token, successMsg: "", errorMsg: "" }
    case LOADING_INITIAL_FALSE:
      return { ...state, loadingInitial: false };
    default:
      return state;
  }
}

export default authReducer;