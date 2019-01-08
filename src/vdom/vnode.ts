import {env} from '../helper/switch';
import {uniqueId} from '../helper/string';
import {equals} from '../helper/helper';


export interface nodeName {
    new (props?, ref?, context?): vNode;
}
export interface HtmlSReactElement extends HTMLElement {
    __sreact_?: boolean;
}

// hyperscript 的对象，可用于渲染html元素
export interface hsNode {
    nodeName: string | nodeName,
    attributes: object | null,
    children: Array<hsNode> | null,
    id: string
}

export interface vNode {
    hsNode: hsNode | string,
    props: object | null,
    state: object | void,
    context: object | void,
    render?: () => hsNode,
    setState?: (partialState: object, callback?: () => void) => void,
    id: string,
    nodeType: number | string,
    children: vNode[] | null
}


export interface vDomNode {
    vNode: vNode | void,
    hsNode: hsNode | null | undefined,
    domNode: HTMLElement | null | undefined,
    firstChild: vDomNode | null | undefined,
    nextNode: vDomNode | null | undefined,
    parentNode: vDomNode | null | undefined,
    id: string
};


enum NODE_TYPE {
    HTML,
    COMPONENT,
    TEXT
};



const EMPTY_OBJ = {};
Reflect.preventExtensions(EMPTY_OBJ);



export let vDomContain : {
   vDomTree: vDomNode | null,
   vDomTreeMap: Map<string, vDomNode>
} = {
    vDomTree: null,
    vDomTreeMap: new Map()
}

if (!equals(env, 'prod')) {
    window.vDomContain = vDomContain;
}

export function createVNode(hsNode: hsNode | string): vNode {
    console.log('hsNode in createVNode', hsNode);
    if (typeof hsNode === 'string') {
        return {
            hsNode,
            nodeType: NODE_TYPE.TEXT,
            props: null,
            state: {},
            context: {},
            id: uniqueId(),
            children: null
        }
    }
    if (typeof hsNode.nodeName === 'string') {
        return {
            hsNode,
            nodeType: NODE_TYPE.HTML,
            props: hsNode.attributes || {},
            state: {},
            context: {},
            id: hsNode.id,
            children: null
            // children: hsNode.children && hsNode.children.map(item => createVNode(item))
        }
    }
    const temp : vNode = new hsNode.nodeName(hsNode.attributes || EMPTY_OBJ);
    temp.id = hsNode.id;
    temp.hsNode = hsNode;
    temp.nodeType = NODE_TYPE.COMPONENT;
    // let children;
    // const render = (<vNode>temp).render;
    // if (render) {
    //     children = render.call(temp).children;
    // }
    // temp.children = children && children.map(item => createVNode(item));
    return temp;

}

export function createVDomNode(hsNode: hsNode, dom?: HTMLElement, parentHsNode?: hsNode): vDomNode {

    const vDomNode: vDomNode = ({} as vDomNode);
    vDomContain.vDomTreeMap.set(hsNode.id, vDomNode);

    let domNode = dom;

    const isChildArray = Array.isArray(hsNode.children);
    let vNode = createVNode(hsNode);
    let firstChild = isChildArray ? createVDomNode((hsNode.children as hsNode[])[0], undefined, hsNode) : null;
    let nextNode;
    let parentNode;
    
    if (parentHsNode) {
        parentNode = parentHsNode;
        if (parentHsNode.children) {
            const {children} = parentHsNode;
            const thisHsNodeIndexInParentHsNodeChildren = children.indexOf(hsNode);
            const parentHsNodeChildrenLength = children.length;
            if (thisHsNodeIndexInParentHsNodeChildren !== -1
                && thisHsNodeIndexInParentHsNodeChildren < (parentHsNodeChildrenLength - 1)) {
                nextNode = createVDomNode(parentHsNode.children[thisHsNodeIndexInParentHsNodeChildren + 1], undefined, parentHsNode);
            }
        }
    }

    vDomNode.vNode = vNode;
    vDomNode.hsNode = hsNode;
    vDomNode.domNode = domNode;
    vDomNode.firstChild = firstChild;
    vDomNode.nextNode = nextNode;
    vDomNode.parentNode = parentNode;
    vDomNode.id = hsNode.id;


    console.log('ret', vDomNode);
    return vDomNode;
}
