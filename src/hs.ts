import {hsNode, nodeName} from './vdom/vnode';
import {uniqueId} from './helper/string';

function hs(nodeName: string | nodeName, attributes, ...args) : hsNode{  
    let children = args.length ? [...args] : null;
    return { nodeName, attributes, children, id: uniqueId() };
}
export default hs;