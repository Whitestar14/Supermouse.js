class Supermouse {
  constructor(options = {}) {
    this.options = this.getDefaultOptions({
      ...options,
      theme: options.theme || 'default',
      useAnimation:
        options.useAnimation !== undefined ? options.useAnimation : true,
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
    const validTheme = ['default', 'neon', 'monochrome', 'sunset', 'ocean'];
    if (validTheme.includes(theme)) {
      this.theme = theme;
      this.applyTheme();
    } else {
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
      ringClickSize: options.ringClickSize || (options.ringSize || 15) - 5,
      useAnimation:
        options.useAnimation !== undefined ? options.useAnimation : true,
      animationDuration: options.animationDuration || 200,
      ringAnimationDuration: options.ringAnimationDuration || 600,
      ringAnimationDelay: options.ringAnimationDelay || 200,
    };
  }

  init() {
    const { pointer, ring, ptContainer } = this.elementInit();
    this.pointer = pointer;
    this.ring = ring;
    this.ptContainer = ptContainer;

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

    this.ringX = this.trace(this.ringX, this.mouseX, 0.2);
    this.ringY = this.trace(this.ringY, this.mouseY, 0.2);

    const ringSize = this.mouseDown
      ? this.options.ringClickSize
      : this.options.ringSize;

    if (this.options.useAnimation) {
      if (typeof this.pointer.animate === 'function') {
        this.pointer.animate(
          { transform: `translate(${this.mouseX}px, ${this.mouseY}px)` },
          { duration: this.options.animationDuration, fill: 'forwards' }
        );

        this.ring.animate(
          {
            transform: `translate(${this.ringX - ringSize}px, ${
              this.ringY - ringSize
            }px)`,
          },
          {
            duration: this.options.ringAnimationDuration,
            fill: 'forwards',
            delay: this.options.ringAnimationDelay,
          }
        );
      } else {
        // Fallback for environments without animate support
        this.pointer.style.transform = `translate(${this.mouseX}px, ${this.mouseY}px)`;
        this.ring.style.transform = `translate(${this.ringX - ringSize}px, ${
          this.ringY - ringSize
        }px)`;
      }
    } else {
      this.pointer.style.transform = `translate(${this.mouseX}px, ${this.mouseY}px)`;
      this.ring.style.transform = `translate(${this.ringX - ringSize}px, ${
        this.ringY - ringSize
      }px)`;
    }

    if (typeof window !== 'undefined' && window.requestAnimationFrame) {
      window.requestAnimationFrame(this.render);
    }
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

  setRingSize(size) {
    this.options.ringSize = size;
    this.options.ringClickSize = size - 5;
  }
}

export default Supermouse;
