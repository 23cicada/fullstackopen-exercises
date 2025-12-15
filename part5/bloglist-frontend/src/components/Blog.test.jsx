import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const mockUpdateHandler = vi.fn()

  beforeEach(() => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://test.com',
      likes: 0,
    }
    render(<Blog blog={blog} onUpdate={mockUpdateHandler} />)
  })

  test('renders the blog\'s title and author', async () => {
    screen.getByText('Test Blog', { exact: false })
    screen.getByText('Test Author', { exact: false })

    const url = screen.queryByText('https://test.com')
    const likes = screen.queryByText('likes 0')

    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('renders the blog\'s url and likes when the button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    screen.getByText('https://test.com')
    screen.getByText('likes 0')
  })

  test('Handler is called twice when the like button is clicked twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)
    expect(mockUpdateHandler.mock.calls).toHaveLength(2)
  })
})
