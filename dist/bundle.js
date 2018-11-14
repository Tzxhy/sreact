var React = (function () {
    'use strict';

    function hs(nodeName, attributes) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var children = args.length ? args.slice() : null;
        return { nodeName: nodeName, attributes: attributes, children: children };
    }

    /* eslint-disable-next-line */
    var idleCallback = window.requestIdleCallback ? window.requestIdleCallback : setTimeout;
    function forceUpdate(element, container) {
        if (container.contains(element)) {
            container.removeChild(element);
        }
        container.appendChild(element);
    }

    var createElement = function (vnode) {
        // Strings just convert to #text Nodes:
        // if ((<string>vnode).split) return document.createTextNode((<string>vnode));
        // create a DOM element with the nodeName of our VDOM element:
        var n;
        if (typeof vnode === 'string') {
            n = createTextNode(vnode);
        }
        else {
            if (typeof vnode.nodeName === 'string') {
                n = document.createElement(vnode.nodeName);
            }
            if (typeof vnode.nodeName === 'function') ;
            // copy attributes onto the new node:
            var a_1 = vnode.attributes || {};
            Object.keys(a_1).forEach(function (k) { return n.setAttribute(k, a_1[k]); });
            // render (build) and then append child nodes:
            if (vnode.children && 'length' in vnode.children) {
                vnode.children.forEach(function (c) { return n.appendChild(createElement(c)); });
            }
        }
        n.__sreact_ = true;
        return n;
    };
    var createTextNode = function (value) {
        var ele = document.createElement('span');
        ele.__sreact_ = true;
        ele.innerHTML = value;
        return ele;
    };

    var diff = function (component, dom, isFirstMount) {
        if (!dom) {
            console.error('React.render传入的DOM元素不存在!');
            return;
        }
        var ret;
        // 如果已经被操作过
        if (dom.__sreact_) ;
        else {
            ret = idiff(component, dom);
        }
        if (isFirstMount) {
            forceUpdate(ret, dom);
        }
    };
    function idiff(component, dom) {
        if (typeof component === 'string') {
            if (dom.innerHTML !== component) {
                return createTextNode(component);
            }
        }
        if (component.nodeName) {
            for (var key in component.attributes) {
                if (dom[key] !== component.attributes[key]) {
                    var ele = createElement(component);
                    return ele;
                }
            }
        }
        return null;
    }

    var isFirstMount = true;
    function render(vnode, dom) {
        var result = diff(vnode, dom, isFirstMount);
        isFirstMount = false;
        return result;
    }

    /*
    * @Author: 谭智轩
    * @Date:   2018-11-11 21:17:50
    * @Last Modified by:   谭智轩
    * @Last Modified time: 2018-11-11 22:00:29
    * @email: zhixuan.tan@qunar.com
    */
    var React = {
        hs: hs,
        createElement: hs,
        render: render
    };

    return React;

}());
//# sourceMappingURL=bundle.js.map
