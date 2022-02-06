import { combineReducers } from 'redux'
import dataReducer from './store/dataReducer'

export default combineReducers({
  data: dataReducer
})
