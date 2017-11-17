import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import FetchHelper from '../tools/FetchHelper'
import Hello from './c/Hello/Hello.jsx';
import Edit from './c/edit/Edit.jsx';
import './index.css';
class Main extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
  }
  componentDidMount() {
  }

  render() {
    return (
      <Router>
        <div style={{ width: '100%', height: '100%' }}>
          <Route exact path="/" component={Hello} />
          <Route path="/edit" component={Edit} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));