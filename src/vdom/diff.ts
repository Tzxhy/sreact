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

interface IdiffControl {
    (
        hsNode: hsNode,
        isFirstMount: boolean,
        rootDom?,
        nextProps?,
        nextState?
    ): void | vDomNode,
    initialCall?: boolean
}

const diffControl: IdiffControl = function(
    hsNode: hsNode,
    isFirstMount: boolean = false,
    rootDom?: HtmlSReactElement,
    nextProps?: object,
    nextState?: object
): undefined | vDomNode {

    let ret: null | vDomNode = null;
    if (isFirstMount && !diffControl.initialCall) {
        ret = createRootContainer(hsNode, rootDom);
        diffControl.initialCall = true;
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


function createRootContainer(hsNode: hsNode, rootDom) {

    vDomContain.vDomTreeMap = vDomContain.vDomTreeMap || new Map();
    vDomContain.vDomTree = createVDomNode(hsNode, rootDom);
    return vDomContain.vDomTree;
}

export default diffControl;
