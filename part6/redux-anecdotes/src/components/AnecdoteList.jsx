import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { voteAnecdote, fetchAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'

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
  const anecdotes = useSelector(selectAnecdotes)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAnecdotes())
  }, [dispatch])


  const handleVote = async (id, content) => {
    await dispatch(voteAnecdote(id))
    dispatch(setNotification(`You voted '${content}'`, 5))
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
