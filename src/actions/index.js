export const SET_LOGIN_STATUS = "SET_LOGIN_STATUS";
export const GET_USER_INFO = "GET_USER_INFO";
export const SET_IMAGES = "SET_IMAGES";
export const SET_SEARCH_IMAGES = "SET_SEARCH_IMAGES";
export const SET_SEARCH_KEYWORD = "SET_SEARCH_KEYWORD";
export const SET_IS_IMAGE_UPLOAD_MODAL_OPEN = "SET_IS_IMAGE_UPLOAD_MODAL_OPEN";
export const SET_IMAGE_URL = "SET_IMAGE_URL";
export const SET_SINGLE_IMAGE = "SET_SINGLE_IMAGE";
// actions creator functions
export const setLoginStatus = (isLogin) => {
  return {
    type: SET_LOGIN_STATUS,
    payload: isLogin
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

export const setImages = (images) => {
  return {
    type: SET_IMAGES,
    payload: images
  }
}

export const setSearchImages = (images) => {
  return {
    type: SET_SEARCH_IMAGES,
    payload: images
  }
}

export const setSearchKeyword = (query) => {
  return {
    type: SET_SEARCH_KEYWORD,
    payload: query
  }
}

export const setIsImageUploadModalOpen = (boolean) => {
  return {
    type: SET_IS_IMAGE_UPLOAD_MODAL_OPEN,
    payload: boolean
  }
}

export const setImageUrl = (url) => {
  return {
    type: SET_IMAGE_URL,
    payload: url
  }
}

export const setSingleImage = (image) => {
  return {
    type: SET_SINGLE_IMAGE,
    payload: {
      ...image
    }
  }
}
