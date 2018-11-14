import {hsNode} from './vdom/vnode';
import {uniqueId} from './helper/string';
import diff from './vdom/diff';
let isFirstMount = true;

function render(hsNode: hsNode, dom) {
    if (!isFirstMount) {
        console.error('React.render只应该被调用一次');
        return;
    }
    let result = diff(hsNode, dom, isFirstMount);
    isFirstMount = false;
    return result;
}

export default render;
