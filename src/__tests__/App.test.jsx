import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('if there is a header with correct title', () => {
    render(<App />);
    expect(screen.getByText('Dictionary')).toBeInTheDocument();
});

test('should display searched word via click', async () => {
    render(<App />);
    const user = userEvent.setup();

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'world');

    const button = screen.getByRole('button');
    await user.click(button, { name: /search/i });

    await waitFor(() => {
        expect(screen.getByText('world')).toBeInTheDocument();
    });
});

test('should display searched word via enter', async () => {
    render(<App />);
    const user = userEvent.setup();

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'world{Enter}');

    await waitFor(() => {
        expect(screen.getByText('world')).toBeInTheDocument();
    });
});

test('should display error message when searching for a word that does not exist ', async () => {
    render(<App />);
    const user = userEvent.setup();

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'Katt{Enter}');

    await waitFor(() => {
        expect(screen.getByText('Word not found. Please try again.')).toBeInTheDocument();
    });
});

test('should display error message when the search is empty', async () => {
    render(<App />);
    const user = userEvent.setup();

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, '{Enter}');

    await waitFor(() => {
        expect(screen.getByText('Please enter a word to search.')).toBeInTheDocument();
    });
});
