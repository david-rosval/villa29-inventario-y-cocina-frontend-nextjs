import { render, screen } from "@testing-library/react";
import Home from "./page";
import "@testing-library/jest-dom";

// Mock all individual components to isolate the test and avoid duplication
jest.mock("@/components/landing-page/Hero", () => {
  const MockHero = () => <div data-testid="hero">Hero Section</div>;
  MockHero.displayName = "MockHero";
  return MockHero;
});
jest.mock("@/components/landing-page/About", () => {
  const MockAbout = () => <div data-testid="about">About Section</div>;
  MockAbout.displayName = "MockAbout";
  return MockAbout;
});
jest.mock("@/components/landing-page/MostRequested", () => {
  const MockMostRequested = () => <div data-testid="most-requested">Most Requested</div>;
  MockMostRequested.displayName = "MockMostRequested";
  return MockMostRequested;
});
jest.mock("@/components/landing-page/Promotions", () => {
  const MockPromotions = () => <div data-testid="promotions">Promotions</div>;
  MockPromotions.displayName = "MockPromotions";
  return MockPromotions;
});
jest.mock("@/components/landing-page/Ubication", () => {
  const MockUbication = () => <div data-testid="ubication">Ubication</div>;
  MockUbication.displayName = "MockUbication";
  return MockUbication;
});
jest.mock("@/components/landing-page/Menu", () => {
  const MockMenu = () => <div data-testid="menu">Menu</div>;
  MockMenu.displayName = "MockMenu";
  return MockMenu;
});
jest.mock("@/components/landing-page/Footer", () => {
  const MockFooter = () => <footer data-testid="footer">Footer</footer>;
  MockFooter.displayName = "MockFooter";
  return MockFooter;
});
jest.mock("@/components/landing-page/FloatingWhatsAppIcon", () => {
  const MockFloatingWhatsAppIcon = () => <div data-testid="floating-whatsapp">WhatsApp Icon</div>;
  MockFloatingWhatsAppIcon.displayName = "MockFloatingWhatsAppIcon";
  return MockFloatingWhatsAppIcon;
});

describe("Home Page", () => {
  it("renders all sections of the landing page", () => {
    render(<Home />);

    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByTestId("about")).toBeInTheDocument();
    expect(screen.getByTestId("most-requested")).toBeInTheDocument();
    expect(screen.getByTestId("promotions")).toBeInTheDocument();
    expect(screen.getByTestId("ubication")).toBeInTheDocument();
    expect(screen.getByTestId("menu")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("floating-whatsapp")).toBeInTheDocument();
  });
});
