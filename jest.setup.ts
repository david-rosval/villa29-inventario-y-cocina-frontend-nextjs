import '@testing-library/jest-dom';
import './src/__mocks__/intersection-observer.ts';
jest.mock('next/image');
jest.mock("next/navigation")
jest.mock("@/socket", () => import("@/__mocks__/socket"))
