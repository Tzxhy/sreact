import {vNode, HtmlSReactElement} from './vnode';
import {
    vDomNode,
    vDomCollection,
    getNodeById,
    updateHsNode
} from './vnode';
import {uniqueUpdateId} from '../helper/string';
import {
    vDomContain
} from './vnode';
import {
    createElement,
    replaceChildren
} from '../dom/dom';
import {
    idleCallback
} from './definition';

interface Update {
    vNode: vNode,

    nextProps?: object,
    nextState?: object,

    recordStart?: number,
    recordEnd?: number,
    updateId: string
}

const arrayRenderList: Update[] = [];
enum RENDER_MODE {
    FORCE_RENDER,
    ARRAY_RENDER,
    ASYNC_RENDER,
    NO_RENDER
}


let forceUpdateObj: Update;
let isUpdating: boolean = false;
let isWaiting: boolean = true;


export function addUpdate(vNode, nextData: {
    // nextProps: object,
    nextState: object
}) {
    arrayRenderList.push(createUpdate(vNode, nextData));
    if (isWaiting) {
        renderMode = RENDER_MODE.ARRAY_RENDER;
        idleCallback(scheduleWork);
    }
    // isWaiting = false;
}

export function forceUpdate(vDomNode: vDomNode) {
    let update: Update;
    const needUpdateVNode = vDomNode.vNode;
    if (needUpdateVNode) {
        update = createUpdate(needUpdateVNode, {
            // nextProps: needUpdateVNode.props || {},
            nextState: needUpdateVNode.state || {}
        });
        forceUpdateObj = update;
        renderMode = RENDER_MODE.FORCE_RENDER;
        scheduleWork();
    } else {
        throw new Error('进入forceUpdate的参数vDomNode中不含有vNode节点'); // TODO
    }
    
}

function createUpdate(vNode: vNode, {
    nextState
}): Update {
    return {
        vNode,
        // nextProps,
        nextState,
        recordStart: 0, // TODO：更新前修改
        recordEnd: 0, // TODO：更新前修改
        updateId: uniqueUpdateId()
    };
}
let renderMode: RENDER_MODE;
function scheduleWork() {
    isUpdating = true, isWaiting = false;
    // debugger;
    switch (renderMode) {
        case RENDER_MODE.FORCE_RENDER:
            if (forceUpdateObj) {
                performRender(forceUpdateObj);
            }
            break;
        case RENDER_MODE.ARRAY_RENDER:
            // debugger;
            arrayRenderList.forEach(
                item => performRender(item)
            )
            // debugger;
            arrayRenderList.length = 0;
            break;
    }
    isUpdating = false, isWaiting = true;
}

function performRender(update: Update): void {
    update.recordStart = +new Date();

    const {vNode} = update;
    let {
        vD,
        hs
    } = vDomContain.vDomTreeMap.get(vNode.id) as vDomCollection;
    if (update.nextState && vNode.render) {
        hs = vNode.render.call({
            ...vNode,
            state: update.nextState
        });
        updateHsNode(vNode.id, hs);
    }
    if (vD) {
        const dom = vD.domNode;
        if (dom && hs) {
            const newDom = createElement(hs);
            replaceChildren(dom, newDom);
        }
    }

    update.recordEnd = +new Date();
}



