import {hsNode, nodeName} from './vdom/vnode';
import {uniqueId} from './helper/string';
import {
    updateVNode,
    updateHsNode,
    NODE_TYPE,
    createVNode,
    updateNodeByArray
} from './vdom/vnode';
import R from 'ramda';


function hs(nodeName: string | nodeName, attributes, ...children) : hsNode {

    let childrenSlot = children.length ? R.flatten(children) : null;
    let ret = {
        nodeName,
        attributes,
        childrenSlot,
        id: uniqueId(typeof nodeName === 'string' ? nodeName.toUpperCase() : '@f' + nodeName.name.toUpperCase())
    };

    console.log('ret in hs', ret);
    debugger;
    ret = transformHsNode(ret);
    return ret;
}
export const transformedNodeName = {
    FULL_TEXT: 'FULL_TEXT'
};


function transformHsNode(hsNode: hsNode): hsNode {
    // debugger;

    let vNode = createVNode(hsNode);
    debugger;
    let newHsNode: hsNode;
    if (vNode.render) { // 组件
        newHsNode = vNode.render.call(vNode);
        newHsNode.id = hsNode.id;
        newHsNode = transformChildSlot(newHsNode);
    } else {
        newHsNode = transformChildSlot(hsNode);
    }

    updateNodeByArray(newHsNode.id, [newHsNode, vNode]);

    return newHsNode;
}

function getHsNodeFromSingleString(str: string): hsNode {
    return {
        nodeName: transformedNodeName.FULL_TEXT,
        attributes: null,
        childrenSlot: null,
        id: uniqueId('@T'),
        textValue: str
    };
}

export function transformChildSlot(hsNode: hsNode): hsNode {
    const newHsNode: hsNode = {
        ...hsNode
    };
    newHsNode.childrenSlot = hsNode.childrenSlot && hsNode.childrenSlot.map((item) => {
        if (typeof item === 'string') { // 纯字符串节点
            const stringHsNode: hsNode = getHsNodeFromSingleString(item);
            const vNode = createVNode(stringHsNode);

            updateNodeByArray(stringHsNode.id, [stringHsNode, vNode]);
            return stringHsNode;
        }
        return item;
    });
    return newHsNode;
}

export default hs;
