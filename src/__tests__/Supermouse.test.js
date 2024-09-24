// @ts-nocheck
/*global jest, describe, beforeEach, afterEach, test, expect, document, MouseEvent, window, performance */
import Supermouse from '../Supermouse';

console.log("TRPLX contributed");

jest.useFakeTimers();

describe('Supermouse', () => {
  let supermouse;

  beforeEach(() => {
    supermouse = new Supermouse();
  });

  afterEach(() => {
    if (supermouse && supermouse.stopAnimation) {
      supermouse.stopAnimation();
    }
    jest.clearAllTimers();
  });

  test('initializes with default options', () => {
    expect(supermouse.options.theme).toBe('default');
    expect(supermouse.options.ringSize).toEqual([15, 15]);
    expect(supermouse.options.useAnimation).toBe(true);
  });

  test('sets theme correctly', () => {
    supermouse.setTheme('neon');
    expect(supermouse.theme).toBe('neon');
  });

  test('handles invalid theme', () => {
    supermouse.setTheme('invalid-theme');
    expect(supermouse.theme).toBe('default');
  });

  test('applies hover effects', () => {
    const button = document.createElement('button');
    document.body.appendChild(button);
    supermouse.handleHoverEffects();
    button.dispatchEvent(new MouseEvent('mouseenter'));
    expect(supermouse.isHover).toBe(true);
    button.dispatchEvent(new MouseEvent('mouseleave'));
    expect(supermouse.isHover).toBe(false);
  });

  test('handles mouse movement', () => {
    const event = new MouseEvent('mousemove', { clientX: 100, clientY: 100 });
    window.dispatchEvent(event);
    expect(supermouse.mouseX).toBe(100);
    expect(supermouse.mouseY).toBe(100);
  });

  test('adjusts ring size', () => {
    supermouse.setRingSize(20);
    expect(supermouse.options.ringSize).toBe(20);
    expect(supermouse.options.ringClickSize).toEqual([15, 15]);
  });

  test('respects animation settings', () => {
    expect(supermouse.options.animationDuration).toBe(200);
    expect(supermouse.options.ringAnimationDuration).toBe(600);
    expect(supermouse.options.ringAnimationDelay).toBe(200);
  });

  test('performance: render method execution time', () => {
    const start = performance.now();
    supermouse.render();
    const end = performance.now();
    expect(end - start).toBeLessThan(16); // Aiming for 60fps
  });

  test('animation can be started and stopped', () => {
    supermouse.startAnimation();
    expect(supermouse.isRunning).toBe(true);
    supermouse.stopAnimation();
    expect(supermouse.isRunning).toBe(false);
  });
});
