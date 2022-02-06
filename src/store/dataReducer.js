import {
  SET_SCREEN, SET_USER
} from './dataActionsTypes';

const initialState = {
  user: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREEN:
      return {
        ...state,
        screen: action.screen
      }
    case SET_USER:
      return {
        ...state,
        user: action.user,
      }
    default:
      return state
  }
}
