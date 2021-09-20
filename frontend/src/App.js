import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './components/header/header';
import MainView from './views/main/main';
import { Container } from '@material-ui/core';
import BlockView from './views/block/block';
import BlockTransactionsView from './views/block-transactions/block-transactions';
import TransactionView from './views/transaction/transaction';
import AddressTransactionsView from './views/address-transactions/address-transactions';

function App() {
  return (
    <BrowserRouter>
      <Header/>

      <Container maxWidth="md" style={{marginBottom: "40px"}}>

        <Switch>
          <Route exact path="/">
            <MainView/>
          </Route>

          <Route exact path="/blocks/:blockNumber">
            <BlockView/>
          </Route>

          <Route exact path="/blocks/:blockNumber/transactions">
            <BlockTransactionsView/>
          </Route>

          <Route exact path="/transactions/:transactionHash">
            <TransactionView/>
          </Route>

          <Route exact path="/address/:address/transactions">
            <AddressTransactionsView/>
          </Route>
        </Switch>

      </Container>

    </BrowserRouter>
  );
}

export default App;
