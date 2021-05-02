  
import {LOG_IN,GET_USER_INFO} from "../actions/index";
import { initialState } from "./initialState";

const userReducer = (state = initialState, action) => {

  switch (action.type) {
    case LOG_IN:
      return Object.assign({}, state, {
        loginStatus: {
            ...state.loginStatus,
            isLogin:action.payload.isLogin,
            accessToken:action.payload.accessToken
        }
      })
    case GET_USER_INFO:
    return Object.assign({}, state, {
        userinfo: {
            ...state.userinfo,
            ...action.payload
        }
    })
    default:
      return state;
  }
}

export default userReducer;