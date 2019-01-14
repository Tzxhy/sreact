import React from '../src/index';

class App extends React.Component {


    componentDidMount() {
        console.log('App componentDidMount.');
    }

    render() {
        return (
            <div class='teste'>
                {this.props.children}
                fesfe
                <p>这个是个p</p>   
                <Text style={'color: red'} text='hello,tzx' />
            </div>
                
        );
    }
}

class Text extends React.Component {
    render() {
        return (
            <p style={this.props.style}>还不嗨皮i{this.props.text}hahaha
            <Span text='测速数据3'/>
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
    componentDidMount() {
        console.log(this.state.number);
        setInterval(() => {
            this.setState({
                number: this.state.number++
            });
        }, 1000);
        console.log('Span componentDidMount.');
    }
    render() {
        return (<span>{this.props.text || '默认数据'}-{this.state.name}{this.state.number}</span>)
    }
}


/* eslint-disable */
React.render(<App data={'111'}>222<a href='#top'>top</a><p>333<a href="##">444</a></p></App>, document.getElementById('root'));
// React.render(<div data={'111'}>222<a href='#top'>top</a><p>333<a href="##">444</a></p></div>, document.getElementById('root'));
