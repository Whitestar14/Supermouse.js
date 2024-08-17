Object.defineProperty(window, 'requestAnimationFrame', {
  writable: true,
  value: jest.fn().mockImplementation((cb) => cb()),
});

Object.defineProperty(window, 'performance', {
  writable: true,
  value: { now: jest.fn(() => Date.now()) },
});
