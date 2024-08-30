# Supermouse.js

Supermouse is a lightweight, customizable JavaScript library that enhances cursor interactions on web pages. It replaces the default cursor with a stylish, animated pointer consisting of a dot and ring. Supermouse offers smooth animations, customizable colors and sizes, and responsive hover effects. Perfect for creating engaging, interactive user experiences in modern web applications.

## Installation

Supermouse.js can be installed and used in multiple ways:

### npm

For projects using npm, install Supermouse.js with:

```bash
npm install supermouse
```

### CDN

To use Supermouse.js directly in your HTML file via CDN, add the following script tag:

```html
<script src="https://cdn.jsdelivr.net/npm/supermouse@latest/dist/supermouse.min.js"></script>
```

### Direct Download

You can also download the latest version of Supermouse.js from our GitHub releases page and include it in your project:

```html
<script src="path/to/supermouse.min.js"></script>
```

After installation, you're ready to start using Supermouse.js in your project!

## Usage

Getting started with Supermouse.js is straightforward. Follow these steps to implement a custom cursor in your project:

1. Import Supermouse:

```javascript
import Supermouse from 'supermouse';
```

2. Create a new Supermouse instance:

```javascript
const cursor = new Supermouse();
```

3. Customize your cursor (optional):

```javascript
const cursor = new Supermouse({
  theme: 'neon',
  ringSize: 20,
  ringClickSize: 15,
  animationDuration: 300,
  ringAnimationDuration: 700,
  ringAnimationDelay: 250,
  useAnimation: true,
});
```

4. Change theme dynamically:

```javascript
cursor.setTheme('ocean');
```

5. For React applications, use the useSupermouse hook:

```jsx
import React from 'react';
import { useSupermouse } from 'supermouse';

function App() {
  const supermouse = useSupermouse({ theme: 'neon' });
  return <div>React app with Supermouse</div>;
}
```

Supermouse.js will automatically handle cursor movements and hover effects on interactive elements (a, button, [data-hover]).

## Testing

Supermouse.js uses Jest for unit testing to ensure reliability and maintainability. Our test suite covers a wide range of scenarios and edge cases.

### Running Tests

To run the tests, use the following command:

```bash
npm test
```

This command will execute all test suites and provide a detailed output of test results and code coverage.

## Test Coverage

As of the latest update, Supermouse.js maintains excellent test coverage:

- Statements: 89.65%
- Branches: 78.04%
- Functions: 85%
- Lines: 90.69%

## Contributing to Tests

We welcome contributions to our test suite. If you're adding new features or fixing bugs, please include relevant test cases. Ensure all tests pass before submitting a pull request.

For more information on writing tests, refer to the [Jest documentation](https://jestjs.io/docs/getting-started).

## API Reference

### Options

- `theme`: String (default: 'default') - Sets the visual theme of the cursor
- `ringSize`: Number (default: 15) - Size of the outer ring in pixels
- `ringClickSize`: Number (default: ringSize - 5) - Size of the ring when clicked
- `animationDuration`: Number (default: 200) - Duration of pointer animations in milliseconds
- `ringAnimationDuration`: Number (default: 600) - Duration of ring animations in milliseconds
- `ringAnimationDelay`: Number (default: 200) - Delay before ring animations start in milliseconds
- `useAnimation`: Boolean (default: true) - Enables or disables animations

### Methods

- `setTheme(theme: string)`: Change the cursor theme

```js
cursor.setTheme('neon');
```

- `handleHoverEffects()`: Apply hover effects to interactive elements (a, button, [data-hover])

```js
cursor.handleHoverEffects();
```

- `setRingSize(size: number)`: Set the size of the outer ring

```js
cursor.setRingSize(20);
```

- `setPointerColor(color: string)`: Set the color of the pointer

```js
cursor.setPointerColor('#ff0000');
```

- `setAnimationDuration(duration: number)`: Set the duration of pointer animations

```js
cursor.setAnimationDuration(300);
```

- `setRingAnimationDuration(duration: number)`: Set the duration of ring animations

```js
cursor.setRingAnimationDuration(800);
```

- `setRingAnimationDelay(delay: number)`: Set the delay before ring animations start

```js
cursor.setRingAnimationDelay(150);
```

- `setHoverColor(color: string)`: Set the color of the cursor on hover

```js
cursor.setHoverColor('#00ff00');
```

### Themes

Available themes:

- default
- neon
- monochrome
- sunset
- ocean

Change theme:

```js
cursor.setTheme('neon');
```

### Internal Workings

- The `Supermouse` class creates a container div with two child elements: a pointer (dot) and a ring.
- It uses `requestAnimationFrame` for smooth animations and updates.
- The cursor position is tracked using mouse events (mousemove, mousedown, mouseup).
- The ring follows the pointer with a slight delay for a more natural feel.
- Hover effects are automatically applied to interactive elements.

## Inspiration

Supermouse.js was made possible from the inspiration of a few incredible works like [Curzr](https://github.com/fuzionix/Curzr), the open-source project, and the lightweight cursor library [Pointer.js](https://seattleowl.com/pointer.js).

## Troubleshooting

### Cursor not appearing

- Ensure Supermouse.js is properly imported and initialized
- Check if any CSS is overriding the cursor styles

### Animations not working

- Verify that `useAnimation` is set to `true` in the options
- Check if the browser supports Web Animations API

### Theme not applying correctly

- Confirm the theme name is spelled correctly
- Make sure custom themes are properly defined before use

### Performance issues

- Try reducing `ringSize` or increasing `animationDuration`
- Disable animations for low-end devices

For further assistance, please open an issue on our GitHub repository.

## License

ISC License
