import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import scss from 'rollup-plugin-scss';

export default {
  input: 'src/Supermouse.js',
  output: {
    file: 'dist/supermouse.js',
    format: 'umd',
    name: 'Supermouse',
  },
  plugins: [
    resolve(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    scss({
      output: 'dist/supermouse.css',
      outputStyle: 'compressed',
    }),
  ],
};
