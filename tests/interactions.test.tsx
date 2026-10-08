import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

vi.mock('../src/animations', () => ({ useCinematicMotion: vi.fn() }));

describe('reference food experience', () => {
  it('renders the reference sequence and navigation', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Take a taste Come join us/ })).toBeTruthy();
    expect(screen.getByText('What’s on our Plate')).toBeTruthy();
    expect(screen.getByText('Let’s see what other says')).toBeTruthy();
    expect(screen.getByText('Easy recipes will send to your inbox')).toBeTruthy();
  });

  it('submits the newsletter interaction without leaving the page', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText('Email address'), 'hello@example.com');
    await user.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect(screen.getByRole('button', { name: 'Subscribed' })).toBeTruthy();
  });

  it('offers a mobile navigation toggle', async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = screen.getByRole('button', { name: 'Open navigation' });
    await user.click(toggle);
    expect(screen.getByRole('button', { name: 'Close navigation' })).toBeTruthy();
  });
});
