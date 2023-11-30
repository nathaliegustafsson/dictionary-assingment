import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Title Visability', () => {
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

        await screen.findByText('world');
    });

    test('should display searched word via enter', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, 'world{Enter}');

        await screen.findByText('world');
    });
});

describe('Error Handling', () => {
    test('should display error message when searching for a word that does not exist ', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, 'Katt{Enter}');

        await screen.findByText('Word not found. Please try again.');
    });

    test('should display error message when the search is empty', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, '{Enter}');

        await screen.findByText('Please enter a word to search.');
    });
});

describe('Audio Functionality', () => {
    test('should render the audio element', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, 'coffee{Enter}');

        await screen.findByText('coffee');

        await screen.findByAltText('Play Icon');
    });
});

describe('Meaning Display', () => {
    test('should render phonetics text', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, 'coffee{Enter}');

        await screen.findByText('coffee');

        await screen.findByText('/ˈkɒ.fi/');
    });

    test('should render partOfSpeech text', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, 'coffee{Enter}');

        await screen.findByText('coffee');

        await screen.findByText('noun');
    });

    test('should render meaning text', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, 'coffee{Enter}');

        await screen.findByText('coffee');

        await screen.findByText('To drink coffee.');
    });

    test('should render a synonym text', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, 'hello{Enter}');

        await screen.findByText('hello');

        await screen.findByText('Synonyms');
    });

    test('should render an antonym text', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, 'up{Enter}');

        await screen.findByText('up');

        await screen.findByText('down');
    });
});
