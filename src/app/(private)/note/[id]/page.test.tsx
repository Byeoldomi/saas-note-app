import { render, screen } from '@testing-library/react'
import NotePage from './page'
import { describe, it, expect, vi } from 'vitest'

// Mock useParams to simulate dynamic route
vi.mock('next/navigation', () => ({
    useParams: () => ({ id: '123' }),
    useRouter: () => ({ push: vi.fn() }),
    useSearchParams: () => ({ get: vi.fn() }),
}))

describe('Note Page', () => {
    it('renders key note editor sections', async () => {
        render(await NotePage({ params: Promise.resolve({ id: '123' }) }))

        // Header / Top Nav
        expect(screen.getByText('Personal')).toBeDefined() // Breadcrumb
        expect(screen.getByText('Projects')).toBeDefined() // Breadcrumb
        expect(screen.getByText('Project Alpha Brainstorm')).toBeDefined() // Breadcrumb or Title in nav

        // Toolbar
        // Use getAllByRole as there might be multiple matches or use more specific names
        expect(screen.getAllByRole('button', { name: /bold/i }).length).toBeGreaterThan(0)
        expect(screen.getAllByRole('button', { name: /italic/i }).length).toBeGreaterThan(0)

        // There are Bullet List and Numbered List, so /list/i matches multiple
        expect(screen.getAllByRole('button', { name: /list/i }).length).toBeGreaterThan(0)

        // Editor Content
        expect(screen.getByPlaceholderText(/Start typing your note.../i)).toBeDefined()

        // Sidebar Metadata
        expect(screen.getByText('Tags')).toBeDefined()
        expect(screen.getByText('Information')).toBeDefined()
        expect(screen.getByText('Created')).toBeDefined()
        expect(screen.getByText('Modified')).toBeDefined()
    })
})
