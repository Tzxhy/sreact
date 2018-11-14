
class Component {
    props: any;
    ref: any;
    context: any;
    state: any;
    constructor(props, ref, context) {
        this.props = props;
        this.ref = ref;
        this.context = context;
    }

    setState(partialState, callback) {
        let newState = {
            ...this.state,
            partialState
        };
    }

    forceUpdate(partialState, callback) {
        let newState = {
            ...this.state,
            partialState
        };

    }
}

export default Component;
