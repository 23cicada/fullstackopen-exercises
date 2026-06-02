import useQueryComments from '../hooks/useQueryComments'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import styled from 'styled-components'
import useCreateComment from '../hooks/useCreateComment'
import useField from '../hooks/useField'

const Comment = styled.form`
  display: flex;
  gap: 10px;
`

const Comments = ({ id }) => {
  const { data = [], isLoading } = useQueryComments(id)
  const { create, isLoading: createLoading } = useCreateComment()
  const { reset, ...content } = useField()

  const handleCreate = async () => {
    await create(id, content.value)
    reset()
  }

  return (
    <div>
      <div style={{ marginBottom: 10 }}>Comments</div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Comment>
            <TextField
              size="small"
              variant="outlined"
              placeholder="add a comment"
              {...content}
            />
            <Button
              variant="contained"
              loading={createLoading}
              onClick={() => handleCreate()}
            >
              Add Comment
            </Button>
          </Comment>
          <ul>
            {data.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Comments
