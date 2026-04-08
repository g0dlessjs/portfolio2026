import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Hero } from './Hero';
import { LanguageProvider } from '../../context/LanguageContext';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <button {...props}>{children}</button>,
  },
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <LanguageProvider>{children}</LanguageProvider>
);

describe('Hero Component', () => {
  it('renders hero section', () => {
    const mockNavigate = vi.fn();
    render(<Hero onNavigate={mockNavigate} />, { wrapper: TestWrapper });

    // Should have a main heading
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings.length).toBeGreaterThan(0);
  });

  it('renders CTA buttons', () => {
    const mockNavigate = vi.fn();
    render(<Hero onNavigate={mockNavigate} />, { wrapper: TestWrapper });

    // Check that buttons are present
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('calls onNavigate with "projects" when main CTA is clicked', async () => {
    const user = userEvent.setup();
    const mockNavigate = vi.fn();
    render(<Hero onNavigate={mockNavigate} />, { wrapper: TestWrapper });

    // Find and click the first button (should be the projects CTA)
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);

    expect(mockNavigate).toHaveBeenCalledWith('projects');
  });

  it('calls onNavigate with "contact" when contact button is clicked', async () => {
    const user = userEvent.setup();
    const mockNavigate = vi.fn();
    render(<Hero onNavigate={mockNavigate} />, { wrapper: TestWrapper });

    // Find and click the second button (should be the contact CTA)
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[1]);

    expect(mockNavigate).toHaveBeenCalledWith('contact');
  });

  it('renders profile JSON display', () => {
    const mockNavigate = vi.fn();
    render(<Hero onNavigate={mockNavigate} />, { wrapper: TestWrapper });

    // Check that the JSON window displays key properties
    expect(screen.getByText(/"name"/i)).toBeInTheDocument();
    expect(screen.getByText(/"role"/i)).toBeInTheDocument();
    expect(screen.getByText(/"skills"/i)).toBeInTheDocument();
  });

  it('has scroll-to-next section indicator', () => {
    const mockNavigate = vi.fn();
    render(<Hero onNavigate={mockNavigate} />, { wrapper: TestWrapper });

    const scrollIndicator = screen.getByLabelText(/ir a siguiente sección/i);
    expect(scrollIndicator).toBeInTheDocument();
  });
});
