// rollup.config.js
import { dts } from 'rollup-plugin-dts';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.mjs',
      format: 'esm',
    }
  ],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json', // Your tsconfig.json path
    }),
  ],
};
