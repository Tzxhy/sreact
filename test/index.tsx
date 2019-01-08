import React from '../src/index';

class App extends React.Component {
    render() {
        return (<div>test<p>这个是个屁</p></div>);
    }
}

/* eslint-disable */
React.render(<div data={'111'}>222<p>333<a href="##">444</a></p></div>, document.getElementById('root'));
