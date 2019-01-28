import React from '../src/index';

class App extends React.Component {

    componentDidMount() {
        console.log('App componentDidMount.');
    }

    render() {
        return (
            <div class='teste'>
                
            </div>
        );
    }
}

class Text extends React.Component {

    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }
    render() {
        return (
            <p style={this.props.style}>
                <span>展示this.props.text</span>
                <span>{this.props.text}</span>
                <Span ref={this.ref} text='测速数据3'/>
            </p>
           );
    }
}

class Span extends React.Component {
    constructor() {
        super();
        this.state = {
            number: 999,
            name: 'tzx'
        };
    }
    // componentDidMount() {
    //     console.log(this.state.number);
    //     this.timer = setInterval(() => {
    //         this.setState({
    //             number: this.state.number++
    //         });
    //     }, 1000);
    //     console.log('Span componentDidMount.');
    // }
    stopTimer() {
        clearInterval(this.timer);
    }
    render() {
        return (<span>{this.props.text || '默认数据'}-{this.state.name}{this.state.number}</span>)
    }
}


/* eslint-disable */
React.render(<App data={'111'}>222<a href='#top'>top</a><p>333<a href="##">444</a></p></App>, document.getElementById('root'));
