import {hsNode, createVNode, vDomNode} from './vdom/vnode';
import {
    forceUpdate
} from './vdom/render-vdom';
import {uniqueId} from './helper/string';
import diff from './vdom/diff';
let isFirstMount = true;

function render(hsNode: hsNode, dom) {
    if (!isFirstMount) {
        console.error('React.render只应该被调用一次');
        return;
    }
    // const vNode = createVNode(hsNode);
    const result = diff(hsNode, true, dom); // 判断dom对应的hsNode是否改变。
    // 改变的话，diff生成一个vDomNode
    if (result) {
        console.log('result', result);
        renderComponent(result);
    }
    isFirstMount = false;
    return result;
}

function renderComponent(vDomNode) {
    return forceUpdate(vDomNode);
}
export default render;
