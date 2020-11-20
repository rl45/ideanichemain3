import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Search from './components/Search';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={props => <Home />} />
          <Route exact path='/search' render={props => <Search />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
