import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import services from '../services/anecdotes'

export const fetchAnecdotes = createAsyncThunk(
  'anecdotes/fetchAnecdotes',
  async () => await services.getAnecdotes()
)

export const createAnecdote = createAsyncThunk(
  'anecdotes/createAnecdote',
  async content => await services.createAnecdote({ content, votes: 0 })
)

export const voteAnecdote = createAsyncThunk(
  'anecdotes/voteAnecdote',
  async (id, thunkAPI) => {
    const anecdotes = thunkAPI.getState().anecdotes
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    return await services.updateAnecdote({ ...anecdote, votes: anecdote.votes + 1 })
  }
)

const slice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    // create(state, action) {
    //   state.push(action.payload)
    // },
    // vote(state, action) {
    //   const anecdote = state.find(anecdote => anecdote.id === action.payload.id)
    //   anecdote.votes += 1
    // },
    // set(_, action) {
    //   return action.payload
    // }
  },
  extraReducers: builder => {
    builder.addCase(fetchAnecdotes.fulfilled, (_, action) => {
      return action.payload
    })
    builder.addCase(createAnecdote.fulfilled, (state, action) => {
      state.push(action.payload)
    })
    builder.addCase(voteAnecdote.fulfilled, (state, action) => {
      const index = state.findIndex(anecdote => anecdote.id === action.payload.id)
      state[index] = action.payload
    })
  }
})

// export const { vote, create, set } = slice.actions
export default slice.reducer

// const reducer = (state = initialState, action) => {

//   switch (action.type) {
//     case 'VOTE':
//       return state.map(anecdote =>
//         action.payload === anecdote.id
//           ? { ...anecdote, votes: anecdote.votes + 1 }
//           : anecdote
//       )
//     case 'CREATE':
//       return [...state, action.payload]
//     default:
//       return state
//   }
// }

// export const vote = id => {
//   return {
//     type: 'VOTE',
//     payload: id
//   }
// }

// export const create = content => {
//   return {
//     type: 'CREATE',
//     payload: asObject(content)
//   }
// }

// export default reducer
