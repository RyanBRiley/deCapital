import LoanContract from '../../../../build/contracts/deCapital.json'
import { browserHistory } from 'react-router'
import store from '../../../store'

const contract = require('truffle-contract')

export function lend(loanId) {
    console.log('in LoanAction, lend--- loanId: ', loanId)
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {
    console.log('in LEND ACTION')
    return function(dispatch) {
      
      // Using truffle-contract, make loan object
      const loan = contract(LoanContract)
      loan.setProvider(web3.currentProvider)

      // declaring loan instance
      var loanInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        loan.deployed().then(function(instance) {
          loanInstance = instance
            console.log('Contract Deployed')

          // Attempt to lend for loan
          loanInstance.lend(loanId, {from: coinbase})
          .then(function(result) {
            console.log('Funded')
            // If no error, login user.
            return browserHistory.push('/Applied')
          })
          .catch(function(result) {
              console.log('ERROR lendING: ', result)
            // If error...
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
