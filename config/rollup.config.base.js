import babel from 'rollup-plugin-babel';
import babelConfig from './.babelrc.js';
import { eslint } from "rollup-plugin-eslint";
import eslintConfig from '../.eslintrc.json';
import typescript from 'rollup-plugin-typescript2';
import tsConfig from './tsconfig.js';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/bundle.js',
        format: 'esm',
        // globals: {
        //     R: 'R'
        // }
    },
    plugins: [
        // eslint(eslintConfig),
        typescript(tsConfig),

        resolve({
            jsnext: true,
            main: true
        }),
        commonjs({
            namedExports: {
                // left-hand side can be an absolute path, a path
                // relative to the current directory, or the name
                // of a module in node_modules
                'node_modules/ramda/es/index.js': [ 'ramda' ]
            }
        }),
        babel(babelConfig),
        
    ]
    
};