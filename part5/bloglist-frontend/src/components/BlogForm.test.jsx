import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

vi.mock('../services/blogs')

describe('<BlogForm />', () => {
  beforeEach(() => {
    blogService.create = vi.fn().mockResolvedValue({})

    render(
      <MemoryRouter initialEntries={['/create']}>
        <Routes>
          <Route path="/create" element={<BlogForm notify={vi.fn()} />} />
        </Routes>
      </MemoryRouter>
    )
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
    expect(blogService.create).toHaveBeenCalledTimes(1)
    expect(blogService.create).toHaveBeenCalledWith({
      title: 'Test Blog Title',
      author: 'Test Blog Author',
      url: 'https://test.com'
    })
  })
})
