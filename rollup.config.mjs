// rollup.config.js
import dts from 'rollup-plugin-dts';

export default [
  // Config for bundling your JavaScript code
  {
    input: 'index.mjs',
    output: {
      file: 'dist/bundle.js',
      format: 'esm',
    },
  },
  // Config for generating TypeScript declaration file
  {
    input: 'index.mjs',
    output: {
      file: 'dist/index.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
  },
];
