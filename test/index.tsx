import React from '../src/index';

class App extends React.Component {
    render() {
        return (
            <div class='teste'>
                {this.props.children}
                fesfe
                   
            </div>
                
        );
    }
}
// test
                
                // <p>这个是个p</p>
// <Text style={'color: red'} text='hello,tzx' />

class Text extends React.Component {
    render() {
        return (
            <p style={this.props.style}>还不嗨皮i{this.props.text}hahaha
            <Span text1='测速数据'/>
            </p>
           );
    }
}
//
class Span extends React.Component {
    render() {
        return (<span>{this.props.text || '默认数据'}</span>)
    }
}


/* eslint-disable */
React.render(<App data={'111'}>222<a href='#top'>top</a><p>333<a href="##">444</a></p></App>, document.getElementById('root'));
// React.render(<div data={'111'}>222<a href='#top'>top</a><p>333<a href="##">444</a></p></div>, document.getElementById('root'));
