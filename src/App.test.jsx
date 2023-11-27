import { render, screen } from '@testing-library/react';
import App from './App';

test('if there is a header with correct title', () => {
    render(<App />);
    expect(screen.getByText('Dictionary')).toBeInTheDocument();
});
