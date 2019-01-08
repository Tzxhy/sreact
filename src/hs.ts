import {hsNode, nodeName} from './vdom/vnode';
import {uniqueId} from './helper/string';
import {
    updateVNode,
    updateHsNode,
    NODE_TYPE,
    createVNode
} from './vdom/vnode';

function hs(nodeName: string | nodeName, attributes, ...childrens) : hsNode {

    let childrenSlot = childrens.length ? [...childrens] : null;
    let ret = { nodeName, attributes, childrenSlot, id: uniqueId() };
    ret = transformHsNode(ret);
    console.log('ret in hs', ret);
    return ret;
}

function transformHsNode(hsNode: hsNode): hsNode {
    // debugger;
    let vNode = createVNode(hsNode);
    if (vNode.render) {
        hsNode = vNode.render.call(vNode);
    }

    updateVNode(vNode.id, vNode);
    updateHsNode(hsNode.id, hsNode);

    return hsNode;
}
export default hs;