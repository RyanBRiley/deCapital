import store from '../../store'
import Web3 from 'web3'
import LoanContract from '../../../build/contracts/deCapital.json'

const contract = require('truffle-contract')

export const LOANS_INITIALIZED = 'LOANS_INITIALIZED'
function loansInitialized(results) {
  return {
    type: LOANS_INITIALIZED,
    payload: results
  }
}

let getAllLoans = new Promise((resolve, reject) => {

    var results = []
    console.log('in getAllLoans, store: ' , store.getState())
    let web3 = store.getState().web3.web3Instance

    // Using truffle-contract, make loan object
    const loan = contract(LoanContract)
    loan.setProvider(web3.currentProvider)

    // declaring loan instance
    var loanInstance
    loan.deployed().then((instance) => {
        loanInstance = instance
        loanInstance.loanCount().then((count) => console.log('loanCount: ', count))
        console.log('Contract Deployed')
    

        // resolve(store.dispatch(loansInitialized(results)))
    })  
    
})

export default getAllLoans
