import LoanContract from '../../../../build/contracts/deCapital.json'
// import { loginUser } from '../loginbutton/LoginButtonActions'
import { browserHistory } from 'react-router'
import store from '../../../store'

const contract = require('truffle-contract')

export function borrow(amount) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      
      // Using truffle-contract we create the authentication object.
      const loan = contract(LoanContract)
      loan.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var loanInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // console.log(coinbase)
        // console.log(web3.eth.accounts[1])
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        loan.deployed().then(function(instance) {
          loanInstance = instance
            console.log('Contract Deployed')

          // Attempt to sign up user.
          loanInstance.apply(amount, {from: coinbase})
          .then(function(result) {
            console.log('Appied')
            // If no error, login user.
            return browserHistory.push('/Applied')
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
