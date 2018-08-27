import LoanContract from '../../../../build/contracts/DeCapital.json'
import { browserHistory } from 'react-router'
import store from '../../../store'

const contract = require('truffle-contract')

export const LOAN_ADDED = 'LOAN_ADDED'
function loanAdded(results) {
  return {
    type: LOAN_ADDED,
    payload: results
  }
}


export function borrow(amount) {
  let web3 = store.getState().web3.web3Instance

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
            console.log('Contract Deployed')

          // Attempt to apply for loan
          loanInstance.apply(amount, {from: coinbase})
          .then(function(result) {
            console.log('Applied')
            loanInstance.loanCount()
            .then(_id => {
            var results = {
              loan: 
              {
                id: _id.toString(),
                amount: web3.toWei(amount, 'ether'),
                rate: 0,
                borrower: coinbase,
                lender: null
              }
            }
            console.log(results)
            store.dispatch(loanAdded(results))
            // If no error, login user.
            return browserHistory.push('/Applied')
          })
          })
          .catch(function(result) {
              console.log('ERROR APPLYING: ', result)
            // If error...
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
