import {env} from '../helper/switch';
import {uniqueId} from '../helper/string';
import {equals} from '../helper/helper';
import {
    transformedNodeName,
    transformChildSlot
} from '../hs';

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
    childrenSlot: Array<hsNode> | null,
    id: string,
    textValue?: string
}

export interface vNode {
    props?: object,
    state?: object,
    context?: object | void,
    render?: () => hsNode,
    setState?: (partialState: object, callback?: () => void) => void,
    id: string,
    children?: vNode[] | null | undefined | void,
    nodeType: number | string,
    componentDidMount?: () => void
}


export interface vDomNode {
    vNode: vNode,
    hsNode: hsNode,
    domNode: HTMLElement | null | undefined,
    firstChild: vDomNode | null | undefined,
    nextNode: vDomNode | null | undefined,
    parentNode: vDomNode | null | undefined,
    id: string
};


export enum NODE_TYPE {
    HTML,
    COMPONENT,
    TEXT
};



const EMPTY_OBJ = {};
Reflect.preventExtensions(EMPTY_OBJ);

export interface vDomCollection {
    hs: hsNode,
    v: vNode,
    vD: vDomNode
}

export let vDomContain : {
   vDomTree: vDomNode | null,
   vDomTreeMap: Map<string, vDomCollection>
} = {
    vDomTree: null,
    vDomTreeMap: new Map()
}

const emptyVDomCollection = {
    hs: {},
    v: {},
    vD: {}
};
Object.freeze(emptyVDomCollection);
Object.freeze(emptyVDomCollection.hs);
Object.freeze(emptyVDomCollection.v);
Object.freeze(emptyVDomCollection.vD);

function getAndSetMap(id: string, operationFun) {
    const origin = vDomContain.vDomTreeMap.get(id) as vDomCollection || {
        hs: {},
        v: {},
        vD: {}
    };
    const newData = operationFun({...origin});
    vDomContain.vDomTreeMap.set(id, newData);
    return true;
}

export function updateHsNode(id: string, hsNode: hsNode | string) {
    return getAndSetMap(id, (data) => {
        data.hs = hsNode;
        return data;
    });
}

export function updateVNode(id: string, vNode: vNode) {
    return getAndSetMap(id, (data) => {
        data.v = vNode;
        return data;
    });
}

export function updateVDomNode(id: string, vDomNode: vDomNode) {
    return getAndSetMap(id, (data) => {
        
        data.vD = vDomNode;
        return data;
    });
}
function checkParam(node, paramName) {
    if (node && !(paramName in node)) {
        throw new Error('updateNodeByArray传参不对');
    }
}
const checkParamNames = ['nodeName', 'nodeType', 'domNode'];
function updateNodeByIndex(id, index, node) {
    switch (index) {
        case 0:
            return updateHsNode(id, node);
        case 1:
            return updateVNode(id, node);
        case 2:
            return updateVDomNode(id, node);
        default:
            break;
    }
}
export function updateNodeByArray(id: string, nodeArr: [hsNode?, vNode?, vDomNode?]): boolean {

    nodeArr.forEach((item, index) => {
        if (item) {
            checkParam(item, checkParamNames[index]);
            updateNodeByIndex(id, index, item);
        }
    });
    return true;
}

export function getNodeById(id: string) {
    return vDomContain.vDomTreeMap.get(id) as vDomCollection;
}

if (!equals(env, 'prod')) {
    window.vDomContain = vDomContain;
}

export function createVNode(hsNode: hsNode): vNode {

    let vNode: vNode;
    if (typeof hsNode.nodeName === transformedNodeName.FULL_TEXT) { // 纯文本节点
        vNode = {
            nodeType: NODE_TYPE.TEXT,
            id: hsNode.id
        }
    } else if (typeof hsNode.nodeName === 'string') { // HTML标签
        vNode = {
            nodeType: NODE_TYPE.HTML,
            props: hsNode.attributes || {},
            context: {},
            id: hsNode.id,
            // children: hsNode.childrenSlot && hsNode.childrenSlot.map(item => createVNode(item))
        }
    } else if (typeof hsNode.nodeName === 'function') { // 组件
        const reactComponent : vNode = new hsNode.nodeName({
            ...(hsNode.attributes || EMPTY_OBJ),
            children: transformChildSlot(hsNode).childrenSlot
        });
        
        reactComponent.id = hsNode.id;
        reactComponent.nodeType = NODE_TYPE.COMPONENT;
        const render = reactComponent.render;
        if (!render) {
            throw new Error('React组件必须实现render方法');
        }
        vNode = reactComponent;

    } else { // 数组
        vNode = ({} as vNode);
    }

    return vNode;

}

export function createVDomNode(hsNode: hsNode, dom?: HTMLElement, parentHsNode?: hsNode): vDomNode {


    const vDomNode: vDomNode = ({} as vDomNode);
    const coll = getNodeById(hsNode.id);

    const vNode = coll.v;
    console.log('coll', coll);
    let domNode = dom;

    const isChildArray = Array.isArray(hsNode.childrenSlot);

    let firstChild = isChildArray ? createVDomNode((hsNode.childrenSlot as hsNode[])[0], undefined, hsNode) : null;
    let nextNode;
    let parentNode;

    if (parentHsNode) {
        parentNode = parentHsNode;
        if (parentHsNode.childrenSlot) {
            const {childrenSlot} = parentHsNode;
            const thisHsNodeIndexInParentHsNodeChildren = childrenSlot.indexOf(hsNode);
            const parentHsNodeChildrenLength = childrenSlot.length;
            if (thisHsNodeIndexInParentHsNodeChildren !== -1
                && thisHsNodeIndexInParentHsNodeChildren < (parentHsNodeChildrenLength - 1)
            ) {

                nextNode = createVDomNode(parentHsNode.childrenSlot[thisHsNodeIndexInParentHsNodeChildren + 1], undefined, parentHsNode);
            }
        }
    }

    vDomNode.domNode = domNode;
    vDomNode.firstChild = firstChild;
    vDomNode.nextNode = nextNode;
    vDomNode.parentNode = parentNode;
    vDomNode.id = hsNode.id;
    vDomNode.hsNode = hsNode;
    vDomNode.vNode = vNode;

    updateVDomNode(vNode.id, vDomNode);
    console.log('ret', vDomNode);
    return vDomNode;
}
