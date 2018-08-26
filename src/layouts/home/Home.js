import React, { Component } from 'react'
import { connect } from 'react-redux'
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
            {
            this.props.userAccount && 
              <p>You are currently logged in as {this.props.userAccount}</p>
            }
          </div>
        </div>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userAccount: state.web3.userAccount
  }
}

export default connect(mapStateToProps)(Home)
