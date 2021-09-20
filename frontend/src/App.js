import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './components/header/header';
import MainView from './views/main/main';

function App() {
  return (
    <BrowserRouter>
      <Header/>

      <Switch>
        <Route exact path="/">
          <MainView/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
