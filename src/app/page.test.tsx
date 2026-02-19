import { render, screen } from '@testing-library/react'
import Page from './(marketing)/page'
import { describe, it, expect } from 'vitest'

describe('Landing Page', () => {
    it('renders key sections', () => {
        render(<Page />)

        // Header
        // Header
        expect(screen.getAllByText('Features').length).toBeGreaterThan(0)
        expect(screen.getAllByText('Pricing').length).toBeGreaterThan(0)

        // Hero
        expect(screen.getByText(/Capture thoughts/i)).toBeDefined()
        expect(screen.getByText(/organize life/i)).toBeDefined()

        // Features
        expect(screen.getByText('Real-time Sync')).toBeDefined()
        expect(screen.getByText('Secure Storage')).toBeDefined()
        expect(screen.getByText('Smart Organization')).toBeDefined()

        // Search
        expect(screen.getByText(/Find anything, instantly/i)).toBeDefined()

        // Testimonial
        expect(screen.getByText(/Sarah Jenkins/i)).toBeDefined()

        // CTA
        expect(screen.getByText(/Ready to clear your mind?/i)).toBeDefined()
    })
})
