import { render, screen } from '@testing-library/react'
import { test, expect, vi } from 'vitest'

import Todo from './Todo'

test('renders the text of a todo that is not done', () => {
  const todo = {
    _id: '1',
    text: 'Learn Docker',
    done: false,
  }

  render(<Todo todo={todo} deleteTodo={vi.fn()} completeTodo={vi.fn()} />)

  expect(screen.getByText('Learn Docker')).toBeDefined()
  expect(screen.getByText('This todo is not done')).toBeDefined()
})
