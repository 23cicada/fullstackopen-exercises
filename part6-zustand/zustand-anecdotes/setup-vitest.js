// setup-vitest.ts
import '@testing-library/jest-dom/vitest'

vi.mock('zustand') // to make it work like Jest (auto-mocking)
