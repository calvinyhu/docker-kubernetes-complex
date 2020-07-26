import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import OtherPage from './OtherPage';
import Fib from './Fib';

const App = () => (
  <Router>
    <div>
      <header>
        <h1>Fib Calculator</h1>
        <Link to="/">Home</Link>
        <Link to="/otherpage">Other Page</Link>
      </header>
      <div>
        <Route exact path="/" component={Fib} />
        <Route path="/otherpage" component={OtherPage} />
      </div>
    </div>
  </Router>
);

export default App;
