import { render, screen } from '@testing-library/react'
import DashboardPage from './page'
import { describe, it, expect } from 'vitest'

describe('Dashboard Page', () => {
    it('renders key dashboard sections', () => {
        render(<DashboardPage />)

        // Header
        expect(screen.getByPlaceholderText(/Search notes/i)).toBeDefined()
        expect(screen.getByText('New Note')).toBeDefined()

        // Content
        expect(screen.getByText(/Welcome back/i)).toBeDefined()

        // Note Cards
        expect(screen.getByText('Q4 Goals & Reflections')).toBeDefined()
    })
})
