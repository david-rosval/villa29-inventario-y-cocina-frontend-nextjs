import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import About from './About';

describe('About Component', () => {
  it('renders the heading', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/¿ABURRIDO\s*DE LA\s*RUTINA\?/i);
  });

  it('renders the image with correct attributes', () => {
    render(<About />);
    const image = screen.getByAltText('Burgers');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
    expect(image.getAttribute('src')).toContain('/Burgers.png');
  });


  it('renders the left-side text content', () => {
    render(<About />);
    const leftText = screen.getByText(/En Villa 29, creemos que cada comida cuenta una historia/i);
    expect(leftText).toBeInTheDocument();
  });

  it('renders the right-side text content', () => {
    render(<About />);
    const rightText = screen.getByText(/Ubicados en el corazón de Villa el Salvador/i);
    expect(rightText).toBeInTheDocument();
  });
});