import { configureStore } from "@reduxjs/toolkit"
import anecdoteReducer from "./reducers/anecdoteReducer"
import filterReducer from "./reducers/filterReducer"
import notificationReducer from "./reducers/notificationReducer"

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

export default store

// import { createStore, combineReducers } from 'redux'

// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer
// })

// const store = createStore(reducer)
