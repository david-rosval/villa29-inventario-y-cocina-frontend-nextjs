const mockIntersectionObserver = () => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
});

if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: jest.fn().mockImplementation(mockIntersectionObserver),
  });
}
