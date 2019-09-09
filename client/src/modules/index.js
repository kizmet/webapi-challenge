import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'
import projects from "./projects";
import actions from './actions'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  projects,
  actions
})

export default createRootReducer
