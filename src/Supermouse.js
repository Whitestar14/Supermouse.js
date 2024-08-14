class Supermouse {
  constructor(options = {}) {
    this.pointer = null;
    this.ring = null;
    this.ptContainer = null;
    this.mouseX = -100;
    this.mouseY = -100;
    this.ringX = -100;
    this.ringY = -100;
    this.isHover = false;
    this.mouseDown = false;
    this.options = this.getDefaultOptions(options);

    this.init();
  }

  getDefaultOptions(options) {
    return {
      pointerColor: options.pointerColor || '#750c7e',
      ringSize: options.ringSize || 15,
      ringClickSize: options.ringClickSize || (options.ringSize || 15) - 5,
      pointerSize: options.pointerSize || 7,
      animationDuration: options.animationDuration || 200,
      ringAnimationDuration: options.ringAnimationDuration || 600,
      ringAnimationDelay: options.ringAnimationDelay || 200,
      hoverColor: options.hoverColor || '#e52',
    };
  }

  init() {
    const { pointer, ring, ptContainer } = this.elementInit();
    this.pointer = pointer;
    this.ring = ring;
    this.ptContainer = ptContainer;

    this.pointer.id = 'pointer-dot';
    this.ring.id = 'pointer-ring';
    this.ptContainer.classList.add('ptContainer');

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
    const currentTime = performance.now();
    if (currentTime - this.lastRenderTime < 16) {
      // Limit to ~60fps
      requestAnimationFrame(this.render);
      return;
    }
    this.lastRenderTime = currentTime;

    this.ringX = this.trace(this.ringX, this.mouseX, 0.2);
    this.ringY = this.trace(this.ringY, this.mouseY, 0.2);

    if (this.isHover) {
      this.pointer.style.backgroundColor = this.options.hoverColor;
      this.ring.style.borderColor = this.options.hoverColor;
    } else {
      this.pointer.style.backgroundColor = this.options.pointerColor;
      this.ring.style.borderColor = this.options.pointerColor;
    }

    this.ring.style.padding = this.mouseDown
      ? `${this.options.ringClickSize}px`
      : `${this.options.ringSize}px`;

    this.pointer.style.width = `${this.options.pointerSize}px`;
    this.pointer.style.height = `${this.options.pointerSize}px`;

    this.pointer.animate(
      { transform: `translate(${this.mouseX}px, ${this.mouseY}px)` },
      { duration: this.options.animationDuration, fill: 'forwards' }
    );

    this.ring.animate(
      {
        transform: `translate(${
          this.ringX -
          (this.mouseDown ? this.options.ringClickSize : this.options.ringSize)
        }px, ${
          this.ringY -
          (this.mouseDown ? this.options.ringClickSize : this.options.ringSize)
        }px)`,
      },
      {
        duration: this.options.ringAnimationDuration,
        fill: 'forwards',
        delay: this.options.ringAnimationDelay,
      }
    );

    requestAnimationFrame(this.render);
  };

  setPointerColor(color) {
    this.options.pointerColor = color;
    return this;
  }

  setRingSize(size) {
    this.options.ringSize = size;
    this.options.ringClickSize = size - 5;
    return this;
  }

  setPointerSize(size) {
    this.options.pointerSize = size;
    return this;
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

  setHoverColor(color) {
    this.options.hoverColor = color;
    return this;
  }

  handleHoverEffects() {
    const hoverElements = document.querySelectorAll('a, button, [data-hover]');

    hoverElements.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        this.isHover = true;
        this.ring.style.transform = 'scale(1.5)';
      });

      element.addEventListener('mouseleave', () => {
        this.isHover = false;
        this.ring.style.transform = 'scale(1)';
      });
    });
  }
}

export default Supermouse;
