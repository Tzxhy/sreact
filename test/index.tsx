import React from '../src/index';

class App extends React.Component {
    render() {
        return (
            <div class='teste'>
                test
                <p>这个是个p</p>
                <Text style={'color: red'} text='hello,tzx' />
            </div>
        );
    }
}


class Text extends React.Component {
    render() {
        return (
            <span style={this.props.style}>还不嗨皮i{this.props.text}hahaha</span>
           );
    }
}


/* eslint-disable */
React.render(<App data={'111'}>222<a href='#top'>top</a><p>333<a href="##">444</a></p></App>, document.getElementById('root'));
// React.render(<p data={'111'}>222<a href='#top'>top</a><span>333<a href="##">444</a></span></p>, document.getElementById('root'));
