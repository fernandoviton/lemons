import * as React from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import AppHeader from './containers/appHeader';
import ItemStore from './containers/itemStore';
import Stand from './containers/stand';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div>
          <AppHeader/>
          <div>
            <Route path="/store" component={ItemStore}/>
            <Route path="/" component={Stand} exact={true}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
