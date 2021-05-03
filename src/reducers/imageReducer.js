import { SET_IMAGES,
  SET_SEARCH_IMAGES,
  SET_SEARCH_KEYWORD,
  SET_IS_IMAGE_UPLOAD_MODAL_OPEN,
  SET_IMAGE_URL,
  SET_SINGLE_IMAGE } from "../actions/index";
import { initialState } from "./initialState";

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGES:
      return Object.assign({}, state, {
        images: action.payload
      })

    case SET_SEARCH_IMAGES:
    return Object.assign({}, state, {
      searchImages: action.payload
    })

    case SET_SEARCH_KEYWORD:
    return Object.assign({}, state, {
      searchKeyword: action.payload
    })

    case SET_IS_IMAGE_UPLOAD_MODAL_OPEN:
      return Object.assign({}, state, {
        isImageUploadModalOpen: action.payload
      })

    case SET_IMAGE_URL:
      return Object.assign({}, state, {
        imageUrl: action.payload
      })

    case SET_SINGLE_IMAGE:
      return Object.assign({}, state, {
        singleImage: {
          ...action.payload
        }
      })

    default:
      return state;
  }
}

export default imageReducer;