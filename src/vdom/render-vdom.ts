import {vNode, HtmlSReactElement} from './vnode';
import {
    vDomNode
} from './vnode';
import {uniqueUpdateId} from '../helper/string';
import {
    vDomContain
} from './vnode';
import {
    createElement,
    replaceElement
} from '../dom/dom';

interface Update {
    vNode: vNode,

    nextProps?: object,
    nextState?: object,

    recordStart?: number,
    recordEnd?: number,
    updateId: string
}

type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
  timeout: number;
};
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: (() => number);
};
declare global {
    interface Window { vDomContain: any; }
}
declare global {
  interface Window {
    requestIdleCallback: ((
      callback: ((deadline: RequestIdleCallbackDeadline) => void),
      opts?: RequestIdleCallbackOptions,
    ) => RequestIdleCallbackHandle);
    cancelIdleCallback: ((handle: RequestIdleCallbackHandle) => void);
  }

}
interface idleCallback {
    (callback, time?): void;
}

const idleCallback: idleCallback = window.requestIdleCallback ? window.requestIdleCallback : setTimeout;

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


export function addUpdate(vDomNode: vDomNode) {
    
    isWaiting && idleCallback(scheduleWork);
    isWaiting = false;
}

export function forceUpdate(vDomNode: vDomNode) {
    let update: Update;
    const needUpdateVNode = vDomNode.vNode;
    if (needUpdateVNode) {
        update = createUpdate(needUpdateVNode, {
            nextProps: needUpdateVNode.props || {},
            nextState: needUpdateVNode.state || {}
        });
        forceUpdateObj = update;
        scheduleWork(RENDER_MODE.FORCE_RENDER);
    } else {
        throw new Error('进入forceUpdate的参数vDomNode中不含有vNode节点'); // TODO
    }
    
}

function createUpdate(vNode: vNode, {
    nextProps = {},
    nextState = {}
}): Update {
    return {
        vNode,
        nextProps,
        nextState,
        recordStart: 0, // TODO：更新前修改
        recordEnd: 0, // TODO：更新前修改
        updateId: uniqueUpdateId()
    };
}

function scheduleWork(renderMode: RENDER_MODE) {
    isUpdating = true, isWaiting = false;
    switch (renderMode) {
        case RENDER_MODE.FORCE_RENDER:
            if (forceUpdateObj) {
                performRender(forceUpdateObj);
            }
            break;
        case RENDER_MODE.ARRAY_RENDER:
            
            arrayRenderList.length = 0;
            break;
    }
    isUpdating = false, isWaiting = true;
}

function performRender(update: Update): void {
    update.recordStart = +new Date();

    const {vNode} = update;
    const hsNode = vNode.hsNode;
    const vDomNode = vDomContain.vDomTreeMap.get(vNode.id);
    if (vDomNode) {
        const dom = vDomNode.domNode;
        if (!dom && hsNode) {
            const newDom = createElement(hsNode);
            console.log('update', update);
            console.log('newDom', newDom);
        }
    }

    update.recordEnd = +new Date();
}



