import { createSlice } from '@reduxjs/toolkit'
import { vote } from './anecdoteReducer'

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
  },
  extraReducers: builder => {
    builder.addCase(vote, (_, action) => {
      return `You voted '${action.payload.content}'`
    })
  }
})

export const { setNotification, removeNotification } = slice.actions
export default slice.reducer
