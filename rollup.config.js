import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import scss from 'rollup-plugin-scss';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/Supermouse.js',
    output: [
      {
        file: 'dist/supermouse.js',
        format: 'umd',
        name: 'Supermouse',
      },
      {
        file: 'dist/supermouse.min.js',
        format: 'umd',
        name: 'Supermouse',
        plugins: [terser()],
      },
      {
        file: 'dist/supermouse.esm.js',
        format: 'es',
      },
      {
        file: 'dist/supermouse.esm.min.js',
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
        output: 'dist/supermouse.css',
        outputStyle: 'compressed',
        failOnError: true,
        watch: 'src/styles',
        sourceMap: true,
      }),
    ],
  },
];
