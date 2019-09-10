export const ACTIONS_REQUESTED = 'actions/ACTIONS_REQUESTED'
export const ACTIONS_RECEIVED = 'actions/ACTIONS_RECEIVED'
export const ACTION_REQUESTED = 'action/ACTION_REQUESTED'
export const ACTION_RECEIVED = 'action/ACTION_RECEIVED'
export const ACTION_UPDATE_REQUESTED = 'action/ACTION_UPDATE_REQUESTED'
export const ACTION_UPDATE_RECEIVED = 'action/ACTION_UPDATE_RECEIVED'
export const ADD_ACTION_REQUESTED = 'action/ADD_ACTION_REQUESTED'
export const ADD_ACTION_RECEIVED = 'action/ADD_ACTION_RECEIVED'
export const DEL_ACTION_REQUESTED = 'action/DEL_ACTION_REQUESTED'
export const DEL_ACTION_RECEIVED = 'action/DEL_ACTION_RECEIVED'

//const serverURL = "https://77eh0-5000.sse.codesandbox.io/";
const serverURL = 'http://localhost:4000/'

const initialState = {
  actions: [],
  action: [],
  isActionFetching: false,
  isUpdating: false,
  isAdding: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS_REQUESTED:
      return {
        ...state,
        isActionFetching: true
      }

    case ACTIONS_RECEIVED:
      return {
        ...state,
        actions: action.actions,
        isActionFetching: !state.isActionFetching
      }
    case ACTION_REQUESTED:
      return {
        ...state,
        isActionFetching: true
      }

    case ACTION_RECEIVED:
      return {
        ...state,
        action: action.action,
        isActionFetching: !state.isActionFetching
      }
    case ACTION_UPDATE_REQUESTED:
      return {
        ...state,
        isUpdating: true
      }

    case ACTION_UPDATE_RECEIVED:
      return {
        ...state,
        isUpdating: !state.isActionFetching
      }
    case ADD_ACTION_REQUESTED:
      return {
        ...state,
        isAdding: true
      }

    case ADD_ACTION_RECEIVED:
      return {
        ...state,
        isAdding: !state.isActionFetching
      }

    default:
      return state
  }
}

export const fetchAsyncActions = id => {
  return async dispatch => {
    dispatch({
      type: ACTIONS_REQUESTED
    })

    try {
      const res = await fetch(serverURL + `api/projects/${id}/actions`)
      const json = await res.json()
      dispatch({
        type: ACTIONS_RECEIVED,
        actions: json
      })
    } catch (err) {
      console.log('error occured', err)
    }
  }
}

export const fetchAsyncIdAction = id => {
  return async dispatch => {
    dispatch({
      type: ACTION_REQUESTED
    })

    try {
      const res = await fetch(serverURL + `api/projects/${id}/actions`)
      const json = await res.json()
      dispatch({
        type: ACTION_RECEIVED,
        action: json
      })
    } catch (err) {
      console.log('error occured', err)
    }
  }
}

export const updateAsyncAction = action => {
  return async dispatch => {
    dispatch({
      type: ACTION_UPDATE_REQUESTED
    })
    const id = action.id
    const body = { title: action.title, contents: action.contents }
    try {
      const res = await fetch(serverURL + `api/projects/${id}/actions`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(action)
      })
      const json = await res.json()
      dispatch({
        type: ACTION_UPDATE_RECEIVED
      })
    } catch (err) {
      console.log('error occured', err)
    }
  }
}

export const addAsyncAction = (id, action, setSubmitting) => {
  return async dispatch => {
    dispatch({
      type: ADD_ACTION_REQUESTED
    })
    try {
      const res = await fetch(serverURL + `api/actions/project-${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(action)
      })
      const json = await res.json()
      dispatch({
        type: ADD_ACTION_RECEIVED
      })
      setSubmitting(false)
    } catch (err) {
      console.log('error occured', err)
    }
  }
}

export const deleteAsyncAction = id => {
  return async dispatch => {
    dispatch({
      type: DEL_ACTION_REQUESTED
    })
    try {
      const res = await fetch(serverURL + `api/actions/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await res.json()
      dispatch({
        type: DEL_ACTION_RECEIVED
      })
    } catch (err) {
      console.log('error occured', err)
    }
  }
}
