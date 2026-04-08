import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import { LanguageProvider } from '../../context/LanguageContext';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
  },
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <LanguageProvider>{children}</LanguageProvider>
);

describe('Footer Component', () => {
  it('renders footer with brand name', () => {
    render(<Footer />, { wrapper: TestWrapper });

    // Brand name should appear (first name part)
    // The profile name is "Alex Rivera" so we should see "Alex"
    expect(screen.getByText(/Alex/)).toBeInTheDocument();
  });

  it('renders all social links', () => {
    render(<Footer />, { wrapper: TestWrapper });

    // Check all social links are present
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
  });

  it('renders scroll-to-top button', () => {
    render(<Footer />, { wrapper: TestWrapper });

    const scrollButton = screen.getByLabelText(/volver arriba/i);
    expect(scrollButton).toBeInTheDocument();
  });

  it('has proper accessibility attributes on social links', () => {
    render(<Footer />, { wrapper: TestWrapper });

    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('displays current year in copyright', () => {
    render(<Footer />, { wrapper: TestWrapper });

    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });
});
