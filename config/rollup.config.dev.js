/*
* @Author: 谭智轩
* @Date:   2018-11-11 21:26:20
* @Last Modified by:   谭智轩
* @Last Modified time: 2018-11-12 15:14:17
* @email: zhixuan.tan@qunar.com
*/
import base from './rollup.config.base.js';


export default {
    ...base,
    output: {
        ...base.output,
        format: 'iife',
        name: 'React',
        sourcemap: true,
        sourcemapFile: 'source-map'
    }
}