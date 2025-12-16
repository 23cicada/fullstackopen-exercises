import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  const mockSubmitHandler = vi.fn()
  beforeEach(() => {
    render(<BlogForm onSubmit={mockSubmitHandler} />)
  })

  test('form calls event handler with the correct details when a new blog is created', async () => {
    const user = userEvent.setup()
    const title = screen.getByLabelText('Title:')
    const author = screen.getByLabelText('Author:')
    const url = screen.getByLabelText('Url:')
    const button = screen.getByText('create')
    await user.type(title, 'Test Blog Title')
    await user.type(author, 'Test Blog Author')
    await user.type(url, 'https://test.com')

    await user.click(button)
    expect(mockSubmitHandler.mock.calls).toHaveLength(1)
    const event = mockSubmitHandler.mock.calls[0][0]

    const formData = {
      title: event.target.elements.title.value,
      author: event.target.elements.author.value,
      url: event.target.elements.url.value
    }

    expect(formData).toEqual({
      title: 'Test Blog Title',
      author: 'Test Blog Author',
      url: 'https://test.com'
    })
  })
})
