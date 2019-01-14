import {
    getNodeById
} from '../vdom/vnode';
import {
    transformedNodeName
} from '../hs';
import {hsNode, HtmlSReactElement} from '../vdom/vnode';


export const createElement = function(hsNode: hsNode) {
    let n;
    
    if (hsNode.nodeName === transformedNodeName.FULL_TEXT) {
        n = createTextNode(hsNode.textValue as string);
    } else if (typeof hsNode.nodeName === 'string') {
        n = document.createElement(hsNode.nodeName as string) as HTMLElement;
    } else {
        throw new Error('hsNode类型未知');
    }
    let a = hsNode.attributes;
    if (a) {
        Object.keys(a).forEach(k => n.setAttribute(k, (a as {})[k]));
    }

    if (hsNode.childrenSlot) {
        (hsNode.childrenSlot as []).forEach(c => n.appendChild(createElement(c)));
    }
    if (n) {
        const vCollectionNode = getNodeById(hsNode.id);
        vCollectionNode.vD.domNode = n;

        const vNode = vCollectionNode.v;
        if (vNode.componentDidMount && !vNode.__hasCalledComponentDidMount) {
            vNode.__hasCalledComponentDidMount = true;
            vNode.componentDidMount && vNode.componentDidMount();
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

