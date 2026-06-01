import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Blog from './Blog'
import blogService from '../services/blogs'

vi.mock('../services/blogs')

const blog = {
  id: 'blog-1',
  title: 'Test Blog',
  author: 'Test Author',
  url: 'https://test.com',
  likes: 0,
  user: { id: 'creator-id', name: 'Creator', username: 'creator' },
}

const renderBlog = (currentUser) =>
  render(
    <MemoryRouter initialEntries={[`/blogs/${blog.id}`]}>
      <Routes>
        <Route
          path="/blogs/:id"
          element={<Blog user={currentUser} notify={vi.fn()} />}
        />
      </Routes>
    </MemoryRouter>
  )

describe('<Blog />', () => {
  beforeEach(() => {
    blogService.getById = vi.fn().mockResolvedValue(blog)
  })

  test('unauthenticated user sees blog info and likes but no buttons', async () => {
    renderBlog(null)

    expect(await screen.findByText('Test Blog')).toBeInTheDocument()
    expect(screen.getByText('https://test.com')).toBeInTheDocument()
    expect(screen.getByText(/likes 0/)).toBeInTheDocument()
    expect(screen.getByText(/Test Author/)).toBeInTheDocument()

    expect(
      screen.queryByRole('button', { name: 'like' })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'remove' })
    ).not.toBeInTheDocument()
  })

  test('authenticated non-creator only sees the like button', async () => {
    renderBlog({ id: 'other-user-id', username: 'someone' })

    expect(await screen.findByText('Test Blog')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'like' })).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'remove' })
    ).not.toBeInTheDocument()
  })

  test('blog creator sees both like and remove buttons', async () => {
    renderBlog({ id: blog.user.id, username: 'creator' })

    expect(await screen.findByText('Test Blog')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'like' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'remove' })).toBeInTheDocument()
  })
})
