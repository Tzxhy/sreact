import {
    vDomContain
} from '../vdom/vnode';

import {hsNode, HtmlSReactElement} from '../vdom/vnode';

export const createElementWrapper = function() {
    return document.createElement('div');
}

export const createElement = function(hsNode: hsNode | string) {
    // Strings just convert to #text Nodes:
    // if ((<string>vnode).split) return document.createTextNode((<string>vnode));

    // create a DOM element with the nodeName of our VDOM element:
    let n;
    if (typeof hsNode === 'string') {
        n = createTextNode(hsNode as string);
    } else {
        if (typeof hsNode.nodeName === 'string') {
            n = document.createElement(hsNode.nodeName as string) as HTMLElement;
        } else if (typeof hsNode.nodeName === 'function') {
            // function 组件定义TODO
            const vNode = vDomContain.vDomTreeMap.get(hsNode.id);
            n = createElementWrapper();
        } else if (Array.isArray(hsNode)) {
            n = createElementWrapper();
            hsNode.map(item => createElement(item)).forEach(
                item => n.appendChild(item)
            );
        }
        let a = hsNode.attributes;
        if (a) {
            Object.keys(a).forEach(k => n.setAttribute(k, (a as {})[k]));
        }

        // render (build) and then append child nodes:
        if (hsNode.childrenSlot) {
            (hsNode.childrenSlot as []).forEach(c => n.appendChild(createElement(c)));
        }
    }
    return n;
}

export const createTextNode = function(value: string) {
    let ele = document.createTextNode(value);
    return ele;
}
function polyfill() {
    function ReplaceWithPolyfill() {
        'use-strict'; // For safari, and IE > 10
        var parent = this.parentNode, i = arguments.length, currentNode;
        if (!parent) return;
        if (!i) // if there are no arguments
            parent.removeChild(this);
        while (i--) { // i-- decrements i and returns the value of i before the decrement
            currentNode = arguments[i];
            if (typeof currentNode !== 'object'){
                currentNode = this.ownerDocument.createTextNode(currentNode);
            } else if (currentNode.parentNode){
                currentNode.parentNode.removeChild(currentNode);
        }
        // the value of "i" below is after the decrement
        if (!i) // if currentNode is the first argument (currentNode === arguments[0])
            parent.replaceChild(currentNode, this);
        else // if currentNode isn't the first
            parent.insertBefore(this.previousSibling, currentNode);
        }
    }
    if (!Element.prototype.replaceWith)
        Element.prototype.replaceWith = ReplaceWithPolyfill;
    if (!CharacterData.prototype.replaceWith)
        CharacterData.prototype.replaceWith = ReplaceWithPolyfill;
    if (!DocumentType.prototype.replaceWith) 
        DocumentType.prototype.replaceWith = ReplaceWithPolyfill;
}
polyfill();
export const replaceElement = function(oldEle, newEle) {
    oldEle.replaceWith(newEle);
}

export const replaceChildren = function(targetEle: HTMLElement, childrenEle) {
    targetEle.innerHTML = '';
    targetEle.appendChild(childrenEle);
}

