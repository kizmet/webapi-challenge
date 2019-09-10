import { createStore, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import * as History from 'history'
import createRootReducer from './modules'
import { createBrowserHistory } from 'history'

//export const history = History.createBrowserHistory()
export const history = createBrowserHistory({
  basename: '/projects/'
})
const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

export default function configureStore(initialState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  return store
}

// export default createStore(
//   connectRouter(history)(rootReducer),
//   initialState,
//   composedEnhancers
// )
