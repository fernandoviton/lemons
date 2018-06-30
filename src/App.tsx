import * as React from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Store from './store';

class App extends React.Component {
  public render() {
    return (
      <div>
        <div className="d-flex align-items-center p-3 px-md-4 mb-3 border-bottom App-header">
          <a className="p-2" href="/"><h5>Lemons</h5></a>
          <a className="mr-auto p-2 text-dark" href="/Store"><h5>Store</h5></a>
        </div>
        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <Route path="/store" component={Store}/>
        </div>
      </div>
    );
  }
}

export default App;
