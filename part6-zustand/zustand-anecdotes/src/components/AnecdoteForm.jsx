import { useAnecdoteActions } from '../stores'

const AnecdoteForm = () => {
  const { create } = useAnecdoteActions()

  const handleCreate = async event => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    create(content)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
