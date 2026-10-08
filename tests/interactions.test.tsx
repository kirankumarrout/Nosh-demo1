import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

vi.mock('../src/animations', () => ({ useCinematicMotion: vi.fn() }));

describe('Nosh visitor flows', () => {
  it('filters the real special menu and supports keyboard category navigation', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('tab', { name: 'Dessert' }));
    const panel = screen.getByRole('tabpanel');
    expect(within(panel).getByText('Chhena Poda')).toBeTruthy();
    expect(within(panel).queryByText('Khainga Tawa Fry')).toBeNull();
    expect(within(panel).getAllByRole('article')).toHaveLength(1);
    await user.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'All dishes' }).getAttribute('aria-selected')).toBe(
      'true',
    );
    expect(within(screen.getByRole('tabpanel')).getAllByRole('article')).toHaveLength(11);
  });

  it('lets guests compose and copy a request without pretending to reserve a table', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'A table for you' }));
    const dialog = screen.getByRole('dialog', { name: 'Plan your visit to Nosh' });
    expect(within(dialog).getByText(/This planner does not submit a booking/)).toBeTruthy();
    await user.click(within(dialog).getByRole('button', { name: 'Add one guest' }));
    await user.type(within(dialog).getByLabelText(/Your name/), 'Kiran');
    await user.click(within(dialog).getByRole('button', { name: 'Copy request' }));
    const copied = await navigator.clipboard.readText();
    expect(copied).toContain('3 guests');
    expect(copied).toContain('My name is Kiran');
    expect(copied).toContain('Please confirm availability');
    expect(within(dialog).getByRole('link', { name: 'Call to confirm' }).getAttribute('href')).toBe(
      'tel:+917751054666',
    );
    await user.click(within(dialog).getByRole('button', { name: 'Close dialog' }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('navigates the photo lightbox using buttons and arrow keys', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /View photo: Nosh dining room/ }));
    const dialog = screen.getByRole('dialog', { name: 'Nosh photo gallery' });
    await user.click(within(dialog).getByRole('button', { name: 'Next photo' }));
    expect(within(dialog).getByRole('img').getAttribute('alt')).toContain('Two Nosh platters');
    await user.keyboard('{ArrowLeft}');
    expect(within(dialog).getByRole('img').getAttribute('alt')).toContain('orange arches');
  });

  it('changes reviews manually and provides a motion preference control', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Next review' }));
    expect(screen.getByText('Like the food. Service was good. Good ambiance.')).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Pause motion' }));
    expect(document.documentElement.dataset.motion).toBe('paused');
    expect(screen.getByRole('button', { name: 'Enable motion' }).getAttribute('aria-pressed')).toBe(
      'true',
    );
  });

  it('exposes the original special menu with its availability context', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'View the original menu' }));
    const dialog = screen.getByRole('dialog', { name: 'Original Chhadakhai special menu' });
    expect(within(dialog).getByText(/call for current availability and prices/)).toBeTruthy();
    expect(within(dialog).getByRole('img').getAttribute('src')).toContain('special-menu.webp');
  });
});
