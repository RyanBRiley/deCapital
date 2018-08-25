import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import getWeb3 from './util/web3/getWeb3'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import About from './layouts/about/About'
import Borrow from './user/layouts/borrow/Application'
import Lend from './user/layouts/lend/Lend'
import Applied from './user/layouts/borrow/Applied'

// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Initialize web3 and set in Redux.
getWeb3
.then(results => {
  console.log('Web3 initialized!')
})
.catch((e) => {
  console.log('Error in web3 initialization.', e)
})

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


