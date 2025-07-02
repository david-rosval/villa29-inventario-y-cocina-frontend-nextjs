import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero Component', () => {
  it('renders the video element with correct attributes', () => {
    render(<Hero />);
    const video = screen.getByRole('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('src', '/video_primera_section.mp4');
    expect(video).toHaveAttribute('autoPlay');
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveProperty('muted', true);
    expect(video).toHaveAttribute('playsInline');
  });

  it('renders the text content', () => {
    render(<Hero />);
    const text1 = screen.getByText(/EL HOGAR DE LA BUENA/i);
    const text2 = screen.getByText(/MÚSICA, COCTELES Y/i);
    const text3 = screen.getByText(/BUENOS MOMENTOS EN LIMA/i);
    expect(text1).toBeInTheDocument();
    expect(text2).toBeInTheDocument();
    expect(text3).toBeInTheDocument();
  });
});
