import {
  SET_SCREEN, SET_USER
} from './dataActionsTypes'

export const setScreen = (screen) => ({
  type: SET_SCREEN,
  screen
})

export const setUser = (user) => ({
  type: SET_USER,
  user
})

