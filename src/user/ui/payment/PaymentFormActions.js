import LoanContract from '../../../../build/contracts/DeCapital.json'
import { browserHistory } from 'react-router'
import store from '../../../store'

const contract = require('truffle-contract')

export function makePayment(loanId, amount) {
  let web3 = store.getState().web3.web3Instance
  // console.log('web3 store in loanAction: ', store.getState().web3)
  
  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {
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
            console.log('Contract Deployed in LoanAction')
            
          // Attempt to makePayment for loan
          loanInstance.makePayment(loanId, {from: coinbase, gas: 4712388, value: store.getState().web3.web3Instance.toWei(amount, 'ether')})
          .then(function(result) {
            console.log('Paid')
            // If no error, login user.
            return browserHistory.push('/paid')
          })
          .catch(function(result) {
              console.log('ERROR lending: ', result)
            // If error...
          })
        })

      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
