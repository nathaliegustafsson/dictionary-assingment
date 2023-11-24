import App from './App';
import { render, screen } from '@testing-library/react'

test('if there is a hello world', () => {
    render(<App />);
    const text = screen.getByText('Hello World');
    expect(text).toBeInTheDocument();
});
