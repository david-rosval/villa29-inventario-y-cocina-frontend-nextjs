import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import "@testing-library/jest-dom";

describe("Footer component", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it("renders the logo image", () => {
    const logo = screen.getByAltText(/villa 29 logo/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", expect.stringContaining("villa29-logo"));
  });

  it("renders navigation links", () => {
    const links = [
      { label: /inicio/i, href: "#" },
      { label: /nosotros/i, href: "#nosotros" },
      { label: /los más pedidos/i, href: "#mas-pedidos" },
      { label: /promociones/i, href: "#promociones" },
      { label: /ubicaciones/i, href: "#ubicacion" },
      { label: /carta/i, href: "#carta" },
    ];

    links.forEach(({ label, href }) => {
      const link = screen.getByRole("link", { name: label });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", href);
    });
  });

  it("renders opening hours", () => {
    expect(screen.getByText(/lunes a domingo/i)).toBeInTheDocument();
    expect(screen.getByText(/7:00 pm - 11:00 pm/i)).toBeInTheDocument();
  });

  it("renders address and reference", () => {
    expect(screen.getByText(/sec 3- gru 29- man f- lote 3/i)).toBeInTheDocument();
    expect(screen.getByText(/villa el salvador, lima/i)).toBeInTheDocument();
    expect(screen.getByText(/av. mariano pastor sevilla/i)).toBeInTheDocument();
    expect(screen.getByText(/entre av. josé olaya y balandra/i)).toBeInTheDocument();
  });

  it("renders contact phone number", () => {
    expect(screen.getByText("937 280 900")).toBeInTheDocument();
  });

  it("renders social media links with correct aria-labels", () => {
    const facebookLink = screen.getByRole("link", { name: /facebook/i });
    const instagramLink = screen.getByRole("link", { name: /instagram/i });
    const tiktokLink = screen.getByRole("link", { name: /tiktok/i });

    expect(facebookLink).toBeInTheDocument();
    expect(facebookLink).toHaveAttribute(
      "href",
      expect.stringContaining("facebook.com")
    );

    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute(
      "href",
      expect.stringContaining("instagram.com")
    );

    expect(tiktokLink).toBeInTheDocument();
    expect(tiktokLink).toHaveAttribute(
      "href",
      expect.stringContaining("tiktok.com")
    );
  });
});
