import {
    vDomNode,
    hsNode,
    vNode,
    HtmlSReactElement,
    createVDomNode
} from './vnode';
import {addUpdate, forceUpdate} from './render-vdom';
import {createElement, createTextNode} from '../dom/dom';
import {
    vDomContain
} from './vnode';

let justOnce = false;

function createRootContainer(hsNode: hsNode) {
    vDomContain.vDomTree = createVDomNode(hsNode);
    vDomContain.vDomTreeMap = new Map();
    vDomContain.vDomTreeMap.set(vDomContain.vDomTree.id, vDomContain.vDomTree);
}

const diff = function(hsNode: hsNode, isFirstMount: boolean, rootDom?: HtmlSReactElement, nextProps?: object, nextState?: object): undefined | vDomNode {

    if (isFirstMount && !justOnce) {
        createRootContainer(hsNode);
        justOnce = true;
    }

    if (isFirstMount && !rootDom) {
        console.error('React.render传入的DOM元素不存在!');
        return;
    }
    let ret: null | vDomNode = null;
    if (rootDom) {
        ret = createVDomNode(hsNode, rootDom);
    } else { // TODO
        if (typeof hsNode.nodeName === 'string') {

        } else if (typeof hsNode.nodeName === 'function') {

        }
    }
    if (ret) {
        return ret;
    }

}

export default diff;
