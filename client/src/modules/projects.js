export const PROJECTS_REQUESTED = 'projects/PROJECTS_REQUESTED'
export const PROJECTS_RECEIVED = 'projects/PROJECTS_RECEIVED'
export const PROJECT_REQUESTED = 'project/PROJECT_REQUESTED'
export const PROJECT_RECEIVED = 'project/PROJECT_RECEIVED'
export const PROJECT_UPDATE_REQUESTED = 'project/PROJECT_UPDATE_REQUESTED'
export const PROJECT_UPDATE_RECEIVED = 'project/PROJECT_UPDATE_RECEIVED'
export const ADD_PROJECT_REQUESTED = 'project/ADD_PROJECT_REQUESTED'
export const ADD_PROJECT_RECEIVED = 'project/ADD_PROJECT_RECEIVED'
export const DEL_PROJECT_REQUESTED = 'project/DEL_PROJECT_REQUESTED'
export const DEL_PROJECT_RECEIVED = 'project/DEL_PROJECT_RECEIVED'



//const serverURL = "https://77eh0-5000.sse.codesandbox.io/";
const serverURL = 'http://localhost:4000/'

const initialState = {
  projects: [],
  project: [],
  isFetching: false,
  isUpdating: false,
  isAdding: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PROJECTS_REQUESTED:
      return {
        ...state,
        isFetching: true
      }

    case PROJECTS_RECEIVED:
      return {
        ...state,
        projects: action.projects,
        isFetching: !state.isFetching
      }
    case PROJECT_REQUESTED:
      return {
        ...state,
        isFetching: true
      }

    case PROJECT_RECEIVED:
    const newProject = action.project
      return {
        ...state,
        project: action.project,
        projects: [ ...state.projects,newProject],
        isFetching: !state.isFetching
      }
    case PROJECT_UPDATE_REQUESTED:
      return {
        ...state,
        isUpdating: true
      }

    case PROJECT_UPDATE_RECEIVED:
      return {
        ...state,
        isUpdating: !state.isFetching
      }
    case ADD_PROJECT_REQUESTED:
      return {
        ...state,
        isAdding: true
      }

    case ADD_PROJECT_RECEIVED:
      return {
        ...state,
        isAdding: !state.isFetching,
        project: action.project
      }

    default:
      return state
  }
}

export const fetchAsync = () => {
  return async dispatch => {
    dispatch({
      type: PROJECTS_REQUESTED
    })

    try {
      const res = await fetch(serverURL + 'api/projects')
      const json = await res.json()
      dispatch({
        type: PROJECTS_RECEIVED,
        projects: json
      })
    } catch (err) {
      console.log('error occured', err)
    }
  }
}

export const fetchAsyncId = id => {
  return async dispatch => {
    dispatch({
      type: PROJECT_REQUESTED
    })

    try {
      const res = await fetch(serverURL + `api/projects/${id}`)
      const json = await res.json()
      dispatch({
        type: PROJECT_RECEIVED,
        project: json
      })
    } catch (err) {
      console.log('error occured', err)
    }
  }
}

export const updateAsyncId = project => {
  return async dispatch => {
    dispatch({
      type: PROJECT_UPDATE_REQUESTED
    })
    const id = project.id
    const body = { title: project.title, contents: project.contents }
    try {
      const res = await fetch(serverURL + `api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
      })
      const json = await res.json()
      dispatch({
        type: PROJECT_UPDATE_RECEIVED
      })
    } catch (err) {
      console.log('error occured', err)
    }
  }
}

export const addAsync = project => {
  return async dispatch => {
    dispatch({
      type: ADD_PROJECT_REQUESTED
    })
    try {
      const res = await fetch(serverURL + 'api/projects/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
      })
      const json = await res.json()
      dispatch({
        type: ADD_PROJECT_RECEIVED,
        project: json
      })
    } catch (err) {
      console.log('error occured', err)
    }
  }
}


export const deleteAsync = id => {
  return async dispatch => {
    dispatch({
      type: DEL_PROJECT_REQUESTED
    })
    try {
      const res = await fetch(serverURL + `api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await res.json()
      dispatch({
        type: DEL_PROJECT_RECEIVED
      })
    } catch (err) {
      console.log('error occured', err)
    }
  }
}