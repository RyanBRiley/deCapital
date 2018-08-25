import store from '../../store'
import Web3 from 'web3'
import LoanContract from '../../../build/contracts/deCapital.json'

const contract = require('truffle-contract')

export const WEB3_INITIALIZED = 'WEB3_INITIALIZED'
function web3Initialized(results) {
  return {
    type: WEB3_INITIALIZED,
    payload: results
  }
}

let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function(dispatch) {
    var results
    var allLoans = []
    var web3 = window.web3

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider)

      const loanContract = contract(LoanContract)
      loanContract.setProvider(web3.currentProvider)

      // declaring loanContract instance
      var loanInstance
      loanContract.deployed().then((instance) => {
        loanInstance = instance
        loanInstance.loanCount().then((count) => {
          for (var i = 0; i < count.toNumber(); i++) {
            loanInstance.loans(i).then((loan) => allLoans.push(
              {
                id: loan.toString().split(',')[0],
                amount: loan.toString().split(',')[1],
                rate: loan.toString().split(',')[2],
                borrower: loan.toString().split(',')[3],
                lender: loan.toString().split(',')[4]
          
              })
            )
          }
          // console.log('loanCount: ', count.toNumber())
        })
        console.log('Contract Deployed')
        // console.log('allLoans: ', allLoans)

        // resolve(store.dispatch(loansInitialized(results)))
    })  

      results = {
        web3Instance: web3,
        loans: allLoans
      }

      console.log('Injected web3 detected.');

      resolve(store.dispatch(web3Initialized(results)))
    } else {

      // Fallback to localhost if no web3 injection. We've configured this to
      // use the development console's port by default.
      var provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')

      web3 = new Web3(provider)

      results = {
        web3Instance: web3
      }

      console.log('No web3 instance injected, using Local web3.');

      resolve(store.dispatch(web3Initialized(results)))
    }
  })
})

export default getWeb3
