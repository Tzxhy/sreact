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

function createRootContainer(hsNode: hsNode, rootDom) {
    console.log('feesfesfes')
    vDomContain.vDomTreeMap = vDomContain.vDomTreeMap || new Map();
    vDomContain.vDomTree = createVDomNode(hsNode, rootDom);
    // vDomContain.vDomTreeMap.set(vDomContain.vDomTree.id, vDomContain.vDomTree);
    return vDomContain.vDomTree;
}

const diffControl = function(hsNode: hsNode, isFirstMount: boolean, rootDom?: HtmlSReactElement, nextProps?: object, nextState?: object): undefined | vDomNode {

    let ret: null | vDomNode = null;

    if (isFirstMount && !justOnce) {
        ret = createRootContainer(hsNode, rootDom);
        justOnce = true;
    }

    if (isFirstMount && !rootDom) {
        console.error('React.render传入的DOM元素不存在!');
        return;
    }
    
    if (rootDom && !isFirstMount) {
        ret = createVDomNode(hsNode, rootDom);
    }
    if (ret) {
        return ret;
    }

}

export default diffControl;
