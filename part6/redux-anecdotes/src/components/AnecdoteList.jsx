import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { vote } from '../reducers/anecdoteReducer'
import { removeNotification } from '../reducers/notificationReducer'
import { useRef } from 'react'

const selectAnecdotes = createSelector(
  state => state.filter,
  state => state.anecdotes,
  (filter, anecdotes) => {
    const filtered = filter
      ? anecdotes.filter(anecdote => anecdote.content.includes(filter))
      : [...anecdotes]
    return filtered.sort((a, b) => b.votes - a.votes)
  }
)

const AnecdoteList = () => {
  const timeoutId = useRef()
  const anecdotes = useSelector(selectAnecdotes)
  const dispatch = useDispatch()


  const handleVote = (id, content) => {
    dispatch(vote({ id, content }))
    clearTimeout(timeoutId.current)
    timeoutId.current = setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return anecdotes.map(anecdote => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>
      </div>
    </div>
  ))
}

export default AnecdoteList
