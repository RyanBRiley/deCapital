import React, { Component } from 'react'
import SignUpFormContainer from '../../ui/signupform/SignUpFormContainer'

class SignUp extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Borrow Capital</h1>
            <p>Need Capital? Apply today for a crowd-sourced Ethereum loan</p>
            <SignUpFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default SignUp
