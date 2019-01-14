import {
    addUpdate
} from './render-vdom';
import {
    vNode
} from './vnode';

class Component {
    props: any;
    ref: any;
    context: any;
    state: any;
    constructor(props = {}, ref = null, context = null) {
        this.props = props;
        this.ref = ref;
        this.context = context;
    }

    setState(partialState, callback?) {
        console.log('调用setState');
        let newState = {
            ...this.state,
            ...partialState
        };
        addUpdate((this as vNode), {
            nextState: newState
        });
    }

    forceUpdate(partialState, callback?) {
        let newState = {
            ...this.state,
            ...partialState
        };
    }
}

export default Component;
