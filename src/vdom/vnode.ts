import {uniqueId} from '../helper/string';

export interface nodeName {
    (props, ref, context): hsNode;
}
export interface HtmlSReactElement extends HTMLElement {
    __sreact_?: boolean;
}
export default interface vDomNode {
    vnode: vNode | null,
    hsNode: hsNode | null,
    domNode: HTMLElement | null,
    firstChild: vNode | null,
    nextNode: vNode | null,
    parentNode: vNode | null,
    id: string
};

export interface vNode {
    props: object,
    state: object,
    context: object,
    render?: () => hsNode,
    setState?: (partialState: object, callback?: () => void) => void
};

// hyperscript 的对象，可用于渲染html元素
export interface hsNode {
    nodeName: string | nodeName,
    attributes: object,
    children: Array<hsNode> | hsNode | null,
    id: string
}
export function createVNode(hsNode: hsNode): vNode {
    return {
        props: {},
        state: {},
        context: {}
    }
}

export function createVDomNode(hsNode?: hsNode): vDomNode {
    if (hsNode) {
        return {
            vnode: createVNode(hsNode),
            hsNode,
            domNode: null,
            firstChild: null,
            nextNode: null,
            parentNode: null,
            id: hsNode.id
        };
    }
    return {
        vnode: null,
        hsNode: null,
        domNode: null,
        firstChild: null,
        nextNode: null,
        parentNode: null,
        id: uniqueId()
    };
}