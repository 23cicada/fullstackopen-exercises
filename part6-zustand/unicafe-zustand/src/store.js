import { create } from 'zustand'
import { useShallow } from 'zustand/shallow'

// Source: https://tkdodo.eu/blog/working-with-zustand

const useFeedbackStore = create(set => ({
  good: 0,
  neutral: 0,
  bad: 0,
  actions: {
    increment: (key) => set(state => ({ [key]: state[key] + 1 }))
  }
}))

const useFeedback = () => useFeedbackStore(
  useShallow(state => ({
    good: state.good,
    neutral: state.neutral,
    bad: state.bad
  }))
)

const useFeedbackActions = () => useFeedbackStore(state => state.actions)

export {
  useFeedback,
  useFeedbackActions
}
