import {vNode, HtmlSReactElement} from './vnode';


interface Update {
    vNode: vNode,
    prevProps: object,
    nextProps: object,
    prevState: object,
    nextState: object,
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

const list: Update[] = [];
let isUpdating: boolean = false;
let isWaiting: boolean = true;

function performSyncWork() {
    list.forEach(item => {
        forceUpdate(item.element, item.container);
    });
    list.length = 0;
    isWaiting = true;
}
export function addUpdate(element: HtmlSReactElement, container: HtmlSReactElement) {
    const update: Update = {
        element,
        container
    };
    list.push(update);
    isWaiting && idleCallback(performSyncWork);
    isWaiting = false;
}

export function forceUpdate(element: HtmlSReactElement, container: HtmlSReactElement) {
    isUpdating = true;
    if (container.contains(element)) {
        container.removeChild(element);
    }
    container.appendChild(element);
    isUpdating = false;
}
