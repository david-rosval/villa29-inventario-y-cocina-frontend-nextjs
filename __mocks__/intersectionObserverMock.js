    // __mocks__/intersectionObserverMock.js
    const intersectionObserverMock = () => ({
      observe: jest.fn(),
      unobserve: jest.fn(), // Add unobserve if your code uses it
      disconnect: jest.fn(), // Add disconnect if your code uses it
    });

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: jest.fn().mockImplementation(intersectionObserverMock),
    });