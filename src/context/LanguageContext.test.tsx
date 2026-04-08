import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider, useLanguage } from './LanguageContext';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock document.documentElement.lang
Object.defineProperty(document.documentElement, 'lang', {
  writable: true,
  value: '',
});

// Test component that uses the context
const TestComponent = () => {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div>
      <span data-testid="language">{language}</span>
      <span data-testid="profile-name">{t.profile.name}</span>
      <button onClick={() => setLanguage('en')}>Switch to EN</button>
      <button onClick={() => setLanguage('es')}>Switch to ES</button>
    </div>
  );
};

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.lang = '';
  });

  it('provides default Spanish language', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('language').textContent).toBe('es');
  });

  it('provides translations based on language', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    // Default is Spanish, should show "Alex Rivera"
    expect(screen.getByTestId('profile-name').textContent).toBe('Alex Rivera');
  });

  it('switches language to English', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    await user.click(screen.getByText('Switch to EN'));

    expect(screen.getByTestId('language').textContent).toBe('en');
  });

  it('switches language back to Spanish', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    // Switch to English first
    await user.click(screen.getByText('Switch to EN'));
    // Then back to Spanish
    await user.click(screen.getByText('Switch to ES'));

    expect(screen.getByTestId('language').textContent).toBe('es');
  });

  it('persists language preference in localStorage', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    await user.click(screen.getByText('Switch to EN'));

    expect(localStorage.getItem('portfolio-language')).toBe('en');
  });

  it('updates document.lang attribute on language change', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    await user.click(screen.getByText('Switch to EN'));

    expect(document.documentElement.lang).toBe('en');
  });

  it('loads saved language from localStorage on mount', () => {
    localStorage.setItem('portfolio-language', 'en');

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('language').textContent).toBe('en');
  });

  it('throws error when useLanguage is used outside provider', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = vi.fn();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useLanguage must be used within a LanguageProvider');

    console.error = originalError;
  });
});
