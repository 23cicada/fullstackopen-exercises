import { createSlice } from '@reduxjs/toolkit'



const slice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(_, action) {
      return action.payload
    },
    removeNotification() {
      return ""
    }
  }
})

let timeoutId = null

export const setNotification = (content, seconds) => {
  return dispatch => {
    dispatch(slice.actions.setNotification(content))
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      dispatch(slice.actions.removeNotification())
    }, seconds * 1000)
  }
}

export default slice.reducer
