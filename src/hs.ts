import {hsNode, nodeName} from './vdom/vnode';
import {uniqueId} from './helper/string';

function hs(nodeName: string | nodeName, attributes, ...childrens) : hsNode {
    console.log('childrens', childrens);
    let children = childrens.length ? [...childrens] : null;
    return { nodeName, attributes, children, id: uniqueId() };
}
export default hs;