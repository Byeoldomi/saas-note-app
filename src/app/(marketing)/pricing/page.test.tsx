import { render, screen } from '@testing-library/react'
import PricingPage from './page'
import { describe, it, expect } from 'vitest'

describe('Pricing Page', () => {
    it('renders key pricing sections', () => {
        render(<PricingPage />)

        // Header
        expect(screen.getByText(/Simple, transparent pricing/i)).toBeDefined()
        expect(screen.getByText('Monthly')).toBeDefined()
        expect(screen.getByText('Yearly')).toBeDefined()

        // Pricing Cards
        expect(screen.getAllByText('Free').length).toBeGreaterThan(0)
        expect(screen.getAllByText('Pro').length).toBeGreaterThan(0)
        expect(screen.getAllByText('Enterprise').length).toBeGreaterThan(0)

        // Features in cards
        expect(screen.getAllByText('Unlimited notes').length).toBeGreaterThan(0)
        expect(screen.getAllByText(/AI Summaries|AI Summarization/i).length).toBeGreaterThan(0) // Pro feature

        // FAQ
        expect(screen.getByText('Frequently Asked Questions')).toBeDefined()

        // Trusted By
        expect(screen.getByText(/Trusted by creative teams/i)).toBeDefined()
    })
})
