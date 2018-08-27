import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import getWeb3 from './util/web3/getWeb3'
import getUserAccount from './util/web3/getUserAccount'
// import getAllLoans from './util/web3/getAllLoans'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import About from './layouts/about/About'
import Borrow from './user/layouts/borrow/Application'
import Lend from './user/layouts/lend/Lend'
import Applied from './user/layouts/borrow/Applied'
import Funded from './user/layouts/lend/Funded'
import Dashboard from './user/layouts/dashboard/Dashboard'

// Get redux store
import store from './store'
import getAllLoans from './util/web3/getAllLoans';

// start react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Start web3 and place in redux store
getWeb3
.then(results => {
  console.log('Web3 initialized!')
})
.catch((e) => {
  console.log('Error in web3 initialization. ', e)
})

getUserAccount
.then(results => {
  console.log('User Account Initialized: ', store.getState().web3)
})
.catch((e) => {
  console.log('Cannot find User Account')
})

getAllLoans
.then(results => {
  console.log('Loans successfully loaded!: ', store.getState().web3.loans)
})
.catch((e) =>{
  console.log('Error fetching loans. ', e)
})


//react-router
ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="borrow" component={Borrow} />
          <Route path="lend" component={Lend} />
          <Route path="about" component={About} />
          <Route path="applied" component={Applied} />
          <Route path="funded" component={Funded} />
          <Route path="dashboard" component={Dashboard} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)


