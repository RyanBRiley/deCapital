import React, { Component } from 'react'

import LendFormContainer from '../../ui/lend/LendFormContainer';
// import getAllLoans from '../../../util/web3/getAllLoans';

// getAllLoans
// .then(results => {
//   console.log('Loans successfully loaded!')
// })
// .catch((e) =>{
//   console.log('Error fetching loans. ', e)
// })

class Lend extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Lend Capital</h1>
            <p>Want to earn interest on your Ethereum investment? Lend to a borrower in need</p>
            <LendFormContainer />
           
          </div>
        </div>
      </main>
    )
  }
}

export default Lend

