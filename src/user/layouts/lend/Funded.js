import React, { Component } from 'react'

class Funded extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Congratulations!</h1>
            <p> You have funded an Ether loan</p>
          </div>
        </div>
      </main>
    )
  }
}

export default Funded
