import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Title visability', () => {
    test('if there is a header with correct title', () => {
        render(<App />);
        expect(screen.getByText('Dictionary')).toBeInTheDocument();
    });
});

describe('Search Functionality', () => {
    test('should display searched word via click', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, 'world');

        const button = screen.getByRole('button');
        await user.click(button, { name: /search/i });

        await waitFor(() => {
            expect(screen.getByText('world', { selector: 'h2' })).toBeInTheDocument();
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
});

describe('Search Functionality', () => {
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
});

describe('Audio Functionality', () => {
    test('should render the audio element', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, 'coffee{Enter}');

        await waitFor(() => {
            expect(screen.getByText('coffee')).toBeInTheDocument();
        });

        await waitFor(() => {
            const audioElement = screen.getByAltText('Play Icon');
            expect(audioElement).toBeInTheDocument();
        });
    });
});

describe('Meaning Display', () => {
    test('should render phonetics text', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, 'coffee{Enter}');

        await waitFor(() => {
            expect(screen.getByText('coffee')).toBeInTheDocument();
        });

        await waitFor(() => {
            const phoneticText = screen.getByText('/ˈkɒ.fi/');
            expect(phoneticText).toBeInTheDocument();
        });
    });

    test('should render partOfSpeech text', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, 'coffee{Enter}');

        await waitFor(() => {
            expect(screen.getByText('coffee')).toBeInTheDocument();
        });

        await waitFor(() => {
            const partOfSpeech = screen.getByText('noun');
            expect(partOfSpeech).toBeInTheDocument();
        });
    });

    test('should render meaning text', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, 'coffee{Enter}');

        await waitFor(() => {
            expect(screen.getByText('coffee')).toBeInTheDocument();
        });

        await waitFor(() => {
            const meaningText = screen.getByText('To drink coffee.');
            expect(meaningText).toBeInTheDocument();
        });
    });

    test('should render a synonym text', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, 'hello{Enter}');

        await waitFor(() => {
            expect(screen.getByText('hello')).toBeInTheDocument();
        });

        await waitFor(() => {
            const meaningText = screen.getByText('Synonyms');
            expect(meaningText).toBeInTheDocument();
        });
    });

    test('should render an antonym text', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, 'up{Enter}');

        await waitFor(() => {
            expect(screen.getByText('up')).toBeInTheDocument();
        });

        await waitFor(() => {
            const meaningText = screen.getByText('Antonyms');
            expect(meaningText).toBeInTheDocument();
        });
    });
});
