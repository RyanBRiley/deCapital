import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import getWeb3 from './util/web3/getWeb3'
// import getAllLoans from './util/web3/getAllLoans'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import About from './layouts/about/About'
import Borrow from './user/layouts/borrow/Application'
import Lend from './user/layouts/lend/Lend'
import Applied from './user/layouts/borrow/Applied'

// Get redux store
import store from './store'

// start react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Start web3 and place in redux store
getWeb3
.then(results => {
  console.log('Web3 initialized!')
  
  // console.log('store: ', store.getState())
})
.catch((e) => {
  console.log('Error in web3 initialization.', e)
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
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)


