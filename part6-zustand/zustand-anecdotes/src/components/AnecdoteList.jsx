
import { useEffect } from 'react'
import { useAnecdotes, useAnecdoteActions, useNotificationActions } from '../stores'


const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote, initialize, remove } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  useEffect(() => {
    initialize()
  }, [initialize])

  return anecdotes.map(anecdote => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button
          onClick={async () => {
            await vote(anecdote.id)
            setNotification(`You voted '${anecdote.content}'`)
          }}
        >
          vote
        </button>
        {anecdote.votes === 0 && (
          <button onClick={() => remove(anecdote.id)}>delete</button>
        )}
      </div>
    </div>
  ))
}

export default AnecdoteList
