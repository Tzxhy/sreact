import babel from 'rollup-plugin-babel';
import babelConfig from './.babelrc.js';
import { eslint } from "rollup-plugin-eslint";
import eslintConfig from '../.eslintrc.json';
import typescript from 'rollup-plugin-typescript2';
import tsConfig from './tsconfig.js';

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/bundle.js',
        format: 'esm'
    },
    plugins: [
        // eslint(eslintConfig),
        typescript(tsConfig),
        // babel(babelConfig),
    ]
};