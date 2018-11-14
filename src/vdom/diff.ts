import vDomNode, {hsNode, vNode, HtmlSReactElement, createVDomNode} from './vnode';
import {addUpdate, forceUpdate} from './render-vdom';
import {createElement, createTextNode} from '../dom/dom';

let vDomTree: vDomNode;
let vDomTreeMap: Map<string, vDomNode>;

const diff = function(hsNode: hsNode, dom: HTMLElement, isFirstMount: boolean) {
    if (isFirstMount) {
        vDomTree = createVDomNode(hsNode as hsNode);
        vDomTreeMap = new Map();
        vDomTreeMap.set(vDomTree.id, vDomTree);
    }
    if (!dom) {
        console.error('React.render传入的DOM元素不存在!');
        return;
    }

    let ret = idiff(hsNode);
    if (ret) {
        if (isFirstMount) {
            forceUpdate(ret, dom);
        } else {
            addUpdate(ret, dom);
        }
    }
    
}

function idiff(hsNode: hsNode): vDomNode {
    let ret: vDomNode;
    if (typeof hsNode === 'string') {
        if (dom.innerHTML !== component) {
            return createTextNode(component);
        }
    }
    if ((<hsNode>hsNode).nodeName) {
        const vNode = vDomTreeMap.get((hsNode as hsNode).id);
        if (!vNode) {
            const newVNode = createVDomNode(hsNode as hsNode);
            vDomTreeMap.set(newVNode.id, newVNode);
            return newVNode;
        }
        for (let key in (<hsNode>component).attributes) {
            if (dom[key] !== (<hsNode>component).attributes[key]) {
                let ele: HtmlSReactElement = createElement(component);
                return ele;
            }
        }
    }

    return null;
}


export default diff;