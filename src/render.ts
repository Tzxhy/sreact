import {hsNode, createVNode, vDomNode} from './vdom/vnode';
import {
    forceUpdate
} from './vdom/render-vdom';
import {uniqueId} from './helper/string';
import diff from './vdom/diff';
import {
    env
} from './helper/switch';

interface Irender {
  (hsNode: hsNode, dom);
  hasFirstMount?: boolean
}
const render: Irender = function (hsNode: hsNode, dom) {
    if (render.hasFirstMount && env !== 'DEBUG') {
        console.error('React.render只应该被调用一次');
        return;
    }

    const result = diff(hsNode, true, dom); // 判断dom对应的hsNode是否改变。
    // 改变的话，diff生成一个vDomNode
    if (result) {
        // debugger;
        renderComponent(result);
    }
    render.hasFirstMount = true;
    return result;
}

function renderComponent(vDomNode) {
    return forceUpdate(vDomNode);
}

export default render;
