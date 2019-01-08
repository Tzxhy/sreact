import babel from 'rollup-plugin-babel';
import babelConfig from './.babelrc.js';
import { eslint } from "rollup-plugin-eslint";
import eslintConfig from '../.eslintrc.json';
import typescript from 'rollup-plugin-typescript2';
import tsConfig from './tsconfig.js';
import R from 'ramda';

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/bundle.js',
        format: 'esm',
        globals: {
            ramda: 'R'
        }
    },
    plugins: [
        // eslint(eslintConfig),
        typescript(tsConfig),
        babel(babelConfig),
    ]
    
};