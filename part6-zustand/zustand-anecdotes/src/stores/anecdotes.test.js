import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAnecdoteActions, useAnecdotes } from './anecdotes'
import service from '../services/anecdotes'

vi.mock("../services/anecdotes", () => ({
  default: {
    getAnecdotes: vi.fn(),
    createAnecdote: vi.fn(),
    updateAnecdote: vi.fn()
  }
}))

beforeEach(() => {
  vi.clearAllMocks()
})

describe("anecdote store", () => {
  it("initialize anecdotes notes from service", async () => {
    const mockAnecdotes = [
      {
        content: "If it hurts, do it more often",
        votes: 9
      }
    ]
    service.getAnecdotes.mockResolvedValue(mockAnecdotes)
    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => await result.current.initialize())
    const { result: anecdotes } = renderHook(() => useAnecdotes())
    expect(anecdotes.current).toEqual(mockAnecdotes)
  })


  it('returns anecdotes sorted by votes in descending order', async () => {
    const mockAnecdotes = [
      { id: '1', content: 'Low votes', votes: 2 },
      { id: '2', content: 'High votes', votes: 10 },
      { id: '3', content: 'Mid votes', votes: 5 },
    ]
    service.getAnecdotes.mockResolvedValue(mockAnecdotes)

    const { result: actions } = renderHook(() => useAnecdoteActions())
    await act(async () => await actions.current.initialize())

    const { result: anecdotes } = renderHook(() => useAnecdotes())
    expect(anecdotes.current).toEqual([
      { id: '2', content: 'High votes', votes: 10 },
      { id: '3', content: 'Mid votes', votes: 5 },
      { id: '1', content: 'Low votes', votes: 2 },
    ])
  })

  it("filter anecdotes", async () => {
    const mockAnecdotes = [
      {
        content: "If it hurts, do it more often",
        votes: 9
      }
    ]
    service.getAnecdotes.mockResolvedValue(mockAnecdotes)
    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => await result.current.initialize())

    await act(async () => await result.current.setFilter("it hurts"))
    const { result: anecdotes } = renderHook(() => useAnecdotes())
    expect(anecdotes.current).toEqual(mockAnecdotes)

    await act(async () => await result.current.setFilter("Low votes"))
    const { result: anecdotes2 } = renderHook(() => useAnecdotes())
    expect(anecdotes2.current).toEqual([])
  })

  it("vote", async () => {
    const mockAnecdotes = [
      {
        content: "If it hurts, do it more often",
        votes: 9,
        id: "0"
      }
    ]
    service.getAnecdotes.mockResolvedValue(mockAnecdotes)
    service.updateAnecdote.mockResolvedValue({ ...mockAnecdotes[0], votes: 10 })

    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => await result.current.initialize())
    await act(async () => await result.current.vote("0"))
    const { result: anecdotes } = renderHook(() => useAnecdotes())
    expect(anecdotes.current).toEqual([
      {
        content: "If it hurts, do it more often",
        votes: 10,
        id: "0"
      }
    ])
  })
})
