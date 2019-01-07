import React from '../src/index';

class App extends React.Component {
    render() {
        return (<div>test<p>这个是个屁</p></div>);
    }
}

/* eslint-disable */
React.render(<App data={{name: 'tzx'}}/>, document.getElementById('root'));
