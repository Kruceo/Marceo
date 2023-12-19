// rollup.config.js
import dts from 'rollup-plugin-dts';

export default [
  // Config for bundling your JavaScript code
  {
    input: 'index.mjs',
    output: {
      file: 'dist/bundle.mjs.js',
      format: 'esm',
    },
  },
  {
    input: 'index.mjs',
    output: {
      file: 'dist/bundle.cjs.js',
      format: 'cjs',
    },
  },
  // Config for generating TypeScript declaration file
  {
    input: 'index.mjs',
    output: {
      file: 'dist/bundle.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
  },
];
