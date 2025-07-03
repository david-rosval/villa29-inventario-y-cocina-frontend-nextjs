import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  it('renders the Navbar', () => {
    render(<Navbar />);
    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();
  });

  it('renders the mobile logo', () => {
    render(<Navbar />);
    const mobileLogo = screen.getByAltText('Logo-mobile');
    expect(mobileLogo).toBeInTheDocument();
    expect(mobileLogo).toHaveAttribute('src', '/villa29-logo.png');
  });

  it('renders the desktop logo', () => {
    render(<Navbar />);
    const desktopLogo = screen.getByAltText('Logo-desktop');
    expect(desktopLogo).toBeInTheDocument();
    expect(desktopLogo).toHaveAttribute('src', '/villa29-logo.png');
  });

  it('renders all navigation links', () => {
    render(<Navbar />);
    const links = ['Nosotros', 'Más Pedidos', 'Promociones', 'Ubícanos', 'Carta', 'Login'];
    links.forEach((link) => {
      const navLinks = screen.queryAllByText(link);
      expect(navLinks.length).toBeGreaterThan(0);
    });
  });

  it('toggles the mobile menu', () => {
    render(<Navbar />);
    const toggleButton = screen.getByRole('button', { name: /toggle navigation menu/i });
    fireEvent.click(toggleButton);
    const mobileMenu = screen.getByRole('menu');
    expect(mobileMenu).toBeInTheDocument();
  });
});
