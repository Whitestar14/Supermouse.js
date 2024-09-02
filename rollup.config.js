// @ts-nocheck
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import scss from 'rollup-plugin-scss';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/Supermouse.js',
    output: [
      {
        file: 'dist/js/Supermouse.js',
        format: 'umd',
        name: 'Supermouse',
      },
      {
        file: 'dist/js/Supermouse.min.js',
        format: 'umd',
        name: 'supermouse',
        plugins: [terser()],
      },
      {
        file: 'dist/js/Supermouse.esm.js',
        format: 'es',
      },
      {
        file: 'dist/js/Supermouse.esm.min.js',
        format: 'es',
        plugins: [terser()],
      },
    ],
    plugins: [
      resolve(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
      scss({
        output: 'dist/css/supermouse.css',
        outputStyle: 'compressed',
        failOnError: true,
        watch: 'src/scss',
        sourceMap: true,
      }),
    ],
  },
];
