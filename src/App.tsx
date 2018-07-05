import * as React from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import './App.css';

import ItemStore from './containers/itemStore';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
      <div>
        <div className="d-flex align-items-center p-3 px-md-4 mb-3 border-bottom App-header">
          <a className="p-2" href="/"><h5>Lemons</h5></a>
          <a className="mr-auto p-2 text-dark" href="/Store"><h5>Store</h5></a>
          <h4 className="">$20.55</h4>
        </div>
        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <Route path="/store" component={ItemStore}/>
        </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
