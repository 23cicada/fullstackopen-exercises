
import { create } from 'zustand'
import { useShallow } from 'zustand/shallow'
import services from '../services/anecdotes'
import { devtools } from 'zustand/middleware'

const useAnecdoteStore = create(devtools((set) => ({
  anecdotes: [],
  filter: "",
  actions: {
    vote: async id => {
      const anecdotes = useAnecdoteStore.getState().anecdotes
      const anecdote = anecdotes.find(anecdote => anecdote.id === id)
      const updated = await services.updateAnecdote({ ...anecdote, votes: anecdote.votes + 1 })
      set(state => ({
        anecdotes: state.anecdotes.map(anecdote =>
          anecdote.id === id ? updated : anecdote
        )
      }))
    },
    create: async content => {
      const anecdote = await services.createAnecdote({ content, votes: 0 })
      set(state => ({
        anecdotes: [
          ...state.anecdotes,
          anecdote
        ]
      }))
    },
    remove: async id => {
      await services.removeAnecdote(id)
      set(state => ({
        anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id)
      }))
    },
    setFilter: filter => set(() => ({ filter })),
    initialize: async () => {
      const result = await services.getAnecdotes()
      set({ anecdotes: result })
    }
  },
})))

export const useAnecdotes = () => useAnecdoteStore(
  useShallow(({ filter, anecdotes }) => {
    const filtered = filter
      ? anecdotes.filter(anecdote => anecdote.content.includes(filter))
      : anecdotes
    return filtered.toSorted((a, b) => b.votes - a.votes)
  })
)
export const useAnecdoteFilter = () => useAnecdoteStore(state => state.filter)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
