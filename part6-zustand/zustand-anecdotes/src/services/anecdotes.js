
const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return response.json()
}

const createAnecdote = async (anecdote) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(anecdote)
  })
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  return response.json()
}

const updateAnecdote = async (anecdote) => {
  const response = await fetch(`${baseUrl}/${anecdote.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(anecdote)
  })

  if (!response.ok) {
    throw new Error('Failed to update anecdote')
  }

  return response.json()
}

const removeAnecdote = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error('Failed to remove anecdote')
  }
  return response.json()
}


export default { getAnecdotes, createAnecdote, updateAnecdote, removeAnecdote }
