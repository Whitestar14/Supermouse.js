import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/Supermouse.js',
  output: {
    file: 'dist/supermouse.js',
    format: 'umd',
    name: 'Supermouse'
  },
  plugins: [
    resolve(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    })
  ]
};
