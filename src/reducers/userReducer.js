  
import { SET_LOGIN_STATUS, GET_USER_INFO } from "../actions/index";
import { initialState } from "./initialState";

const userReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_LOGIN_STATUS:
      return Object.assign({}, state, {
        loginStatus: {
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