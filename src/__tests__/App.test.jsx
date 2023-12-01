import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';
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

        const searchedWord = await screen.findByText('world', {}, { timeout: 5000 });
        expect(searchedWord).toBeInTheDocument();
    });

    test('should display searched word via enter', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, 'world{Enter}');

        const searchedWord = await screen.findByText('world', {}, { timeout: 5000 });
        expect(searchedWord).toBeInTheDocument();
    });
});

describe('Error Handling', () => {
    test('should display error message when searching for a word that does not exist ', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, 'Katt{Enter}');

        const errorMessage = await screen.findByText('Word not found. Please try again.');
        expect(errorMessage).toBeInTheDocument();
    });

    test('should display error message when the search is empty', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, '{Enter}');

        const errorMessage = await screen.findByText('Please enter a word to search.');
        expect(errorMessage).toBeInTheDocument();
    });
});

describe('Audio Functionality', () => {
    test('should render the audio element', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, 'coffee{Enter}');

        await screen.findByText('coffee');

        const playIcon = await screen.findByAltText('Play Icon');
        expect(playIcon).toBeInTheDocument();
    });
});

describe('Meaning Display', () => {
    test('should render phonetics text', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, 'coffee{Enter}');

        await screen.findByText('coffee');

        const coffeePhonetic = await screen.findByText('/ˈkɒ.fi/');
        expect(coffeePhonetic).toBeInTheDocument();
    });

    test('should render partOfSpeech text', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, 'coffee{Enter}');

        await screen.findByText('coffee');

        const partOfSpeech = await screen.findByText('noun');
        expect(partOfSpeech).toBeInTheDocument();
    });

    test('should render meaning text', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, 'coffee{Enter}');

        await screen.findByText('coffee');

        const meaningText = await screen.findByText('A tropical plant of the genus Coffea.');
        expect(meaningText).toBeInTheDocument();
    });

    test('should render a synonym text', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, 'cat{Enter}');

        await screen.findByText('cat');

        const synonymText = await screen.findByText('pantherine cat');
        expect(synonymText).toBeInTheDocument();
    });

    test('should render an antonym text', async () => {
        render(<App />);
        const user = userEvent.setup();

        const searchInput = screen.getByRole('textbox');
        await user.type(searchInput, 'up{Enter}');

        await screen.findByText('up');

        const antonymText = await screen.findByText('down');
        expect(antonymText).toBeInTheDocument();
    });
});
