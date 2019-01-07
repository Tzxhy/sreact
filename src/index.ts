/*
* @Author: 谭智轩
* @Date:   2018-11-11 21:17:50
* @Last Modified by:   谭智轩
* @Last Modified time: 2018-11-11 22:00:29
* @email: zhixuan.tan@qunar.com
*/

import hs from './hs';
import render from './render';
import createRef from './createRef';
import Component from './vdom/component';

// 原型图设计
// https://www.processon.com/diagraming/5be8f4c5e4b0ee74757957af
const React = {
    hs,
    createElement: hs,
    render,
    createRef,
    Component
};

export default React;

