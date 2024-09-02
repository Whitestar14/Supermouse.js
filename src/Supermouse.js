import './scss/supermouse.scss';

class Supermouse {
  constructor(options = {}) {
    this.options = this.getDefaultOptions({
      ...options,
    });
    this.theme = this.options.theme;
    this.mouseX = -100;
    this.mouseY = -100;
    this.ringX = -100;
    this.ringY = -100;
    this.isHover = false;
    this.mouseDown = false;
    this.isRunning = true;

    const { pointer, ring, ptContainer } = this.elementInit();
    this.pointer = pointer;
    this.ring = ring;
    this.ptContainer = ptContainer;

    this.applyTheme();
    this.init();
  }

  applyTheme() {
    this.ptContainer.className = `supermouse-cursor supermouse-theme-${this.theme}`;
    this.pointer.className = 'supermouse-cursor__dot';
    this.ring.className = 'supermouse-cursor__ring';
  }

  setTheme(theme) {
    const validThemes = ['default', 'neon', 'monochrome', 'sunset', 'ocean'];
    // @ts-ignore
    if (validThemes.includes(theme) && theme !== this.theme) {
      this.theme = theme;
      this.applyTheme();
    } else if (!validThemes.includes(theme)) {
      console.warn(
        `Theme "${theme}" specified not found. Reverting to default theme option.`
      );
      this.theme = 'default';
      this.applyTheme();
    }
    return this;
  }

  getDefaultOptions(options) {
    return {
      theme: options.theme || 'default',
      ringSize: options.ringSize || 15,
      pointerSize: options.pointerSize || 5,
      ringClickSize: options.ringClickSize || (options.ringSize || 15) - 5,
      useAnimation:
        options.useAnimation !== undefined ? options.useAnimation : true,
      animationDuration: options.animationDuration || 200,
      ringAnimationDuration: options.ringAnimationDuration || 600,
      ringAnimationDelay: options.ringAnimationDelay || 200,
      ringSmoothness: options.ringSmoothness || 0.2,
      ringThickness: options.ringThickness || 2,
    };
  }

  init() {
    this.ptContainer.appendChild(this.pointer);
    this.ptContainer.appendChild(this.ring);
    document.body.insertBefore(this.ptContainer, document.body.children[0]);

    this.bindEvents();
    this.handleHoverEffects();
    this.render();
  }

  elementInit() {
    const ptContainer = document.createElement('div');
    const pointer = document.createElement('div');
    const ring = document.createElement('div');
    return { pointer, ring, ptContainer };
  }

  bindEvents() {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseMove = (e) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  };

  handleMouseDown = () => {
    this.mouseDown = true;
  };

  handleMouseUp = () => {
    this.mouseDown = false;
  };

  trace(a, b, n) {
    return (1 - n) * a + n * b;
  }

  render = () => {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    if (currentTime - this.lastRenderTime < 16) {
      if (typeof window !== 'undefined' && window.requestAnimationFrame) {
        window.requestAnimationFrame(this.render);
      }
      return;
    }
    this.lastRenderTime = currentTime;

    const ringSize = this.mouseDown
      ? this.options.ringClickSize
      : this.options.ringSize;
    const dotSize = this.options.pointerSize;

    if (this.options.useAnimation) {
      // When useAnimation is true, we rely on CSS animations.

      this.ringX = this.trace(
        this.ringX,
        this.mouseX,
        this.options.ringSmoothness
      );
      this.ringY = this.trace(
        this.ringY,
        this.mouseY,
        this.options.ringSmoothness
      );

      if (typeof this.pointer.animate === 'function') {
        this.pointer.animate(
          {
            transform: `translate(${this.mouseX - dotSize / 2}px, ${this.mouseY - dotSize / 2}px)`,
            width: `${dotSize}px`,
            height: `${dotSize}px`,
          },
          { duration: this.options.animationDuration, fill: 'forwards' }
        );

        this.ring.animate(
          {
            transform: `translate(${this.ringX - ringSize / 2}px, ${this.ringY - ringSize / 2}px)`,
            width: `${ringSize}px`,
            height: `${ringSize}px`,
            borderWidth: `${this.options.ringThickness}px`,
          },
          {
            duration: this.options.ringAnimationDuration,
            fill: 'forwards',
            delay: this.options.ringAnimationDelay,
          }
        );
      } else {
        // Fallback for environments without animate support
        // When useAnimation is false, we manually update the position using trace.
        const ringSize = this.mouseDown
          ? this.options.ringClickSize
          : this.options.ringSize;
        const dotSize = this.options.pointerSize;

        this.ringX = this.trace(this.ringX, this.mouseX, 1);
        this.ringY = this.trace(this.ringY, this.mouseY, 1);
        this.pointer.style.transform = `translate(${this.mouseX - dotSize / 2}px, ${this.mouseY - dotSize / 2}px)`;
        this.pointer.style.width = `${dotSize}px`;
        this.pointer.style.height = `${dotSize}px`;

        this.ring.style.transform = `translate(${this.ringX - ringSize / 2}px, ${this.ringY - ringSize / 2}px)`;
        this.ring.style.width = `${ringSize}px`;
        this.ring.style.height = `${ringSize}px`;
        this.ring.style.borderWidth = `${this.options.ringThickness}px`;
      }
    } else {
      // When useAnimation is false, we manually update the position using trace.
      this.ringX = this.trace(this.ringX, this.mouseX, 1);
      this.ringY = this.trace(this.ringY, this.mouseY, 1);
      this.pointer.style.transform = `translate(${this.mouseX - dotSize / 2}px, ${this.mouseY - dotSize / 2}px)`;
      this.pointer.style.width = `${dotSize}px`;
      this.pointer.style.height = `${dotSize}px`;

      this.ring.style.transform = `translate(${this.ringX - ringSize / 2}px, ${this.ringY - ringSize / 2}px)`;
      this.ring.style.width = `${ringSize}px`;
      this.ring.style.height = `${ringSize}px`;
      this.ring.style.borderWidth = `${this.options.ringThickness}px`;
    }

    requestAnimationFrame(this.render);
  };

  handleHoverEffects() {
    const hoverElements = document.querySelectorAll('a, button, [data-hover]');

    hoverElements.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        this.isHover = true;
      });

      element.addEventListener('mouseleave', () => {
        this.isHover = false;
      });
    });
  }

  destroy() {
    this.isRunning = false;
    this.ptContainer.remove();
  }

  startAnimation() {
    this.isRunning = true;
    this.render();
  }

  stopAnimation() {
    this.isRunning = false;
  }

  // Preserving legacy features
  
  setPointerSize(size, clickSize = size) {
    this.options.dimensions.pointer = [size, size];
    this.options.pointerClickSize = [clickSize, clickSize];
  }

  setRingSize(size, clickSize = size) {
    this.options.dimensions.ring = [size, size];
    this.options.ringClickSize = [clickSize, clickSize];
  }

  setRingSmoothness(smoothness) {
    this.options.ringSmoothness = smoothness;
  }

  setAnimationDuration(duration) {
    this.options.animationDuration = duration;
    return this;
  }

  setRingAnimationDuration(duration) {
    this.options.ringAnimationDuration = duration;
    return this;
  }

  setRingAnimationDelay(delay) {
    this.options.ringAnimationDelay = delay;
    return this;
  }
}

export default Supermouse;
