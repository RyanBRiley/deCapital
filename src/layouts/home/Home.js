import React, { Component } from 'react'
import store from '../../store'

class Home extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Welcome to deCapital!</h1>
            <h3>Your decentralized credit and lending app</h3>
            <p>Powered by the Ethereum Blockchain</p>
            <p>You are currently logged in as {store.getState().web3.userAccount}</p>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
