export const LOG_IN = "LOG_IN";
export const GET_USER_INFO = "GET_USER_INFO";
// actions creator functions
export const login = (accessToken) => {
  return {
    type: LOG_IN,
    payload: {
      isLogin: true,
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
