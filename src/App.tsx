import * as React from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import AppHeader from './containers/appHeader';
import ItemStore from './containers/itemStore';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div>
          <AppHeader/>
          <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <Route path="/store" component={ItemStore}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
