export const SET_LOGIN_STATUS = "SET_LOGIN_STATUS";
export const GET_USER_INFO = "GET_USER_INFO";
// actions creator functions
export const setLoginStatus = (accessToken, isLogin) => {
  return {
    type: SET_LOGIN_STATUS,
    payload: {
      isLogin: isLogin,
      accessToken
    }
  }
}

export const getUserInfo = (userinfo) => {
  return {
    type: GET_USER_INFO,
    payload: {
      ...userinfo
    }
  }
}
