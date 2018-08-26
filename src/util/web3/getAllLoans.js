import store from '../../store'
import LoanContract from '../../../build/contracts/DeCapital.json'

const contract = require('truffle-contract')

export const LOANS_INITIALIZED = 'LOANS_INITIALIZED'
function loansInitialized(results) {
  return {
    type: LOANS_INITIALIZED,
    payload: results
  }
}

let getAllLoans = new Promise((resolve, reject) => {
  window.addEventListener('load', function(dispatch) {
    var results 
    var allLoans = []
    let web3 = store.getState().web3.web3Instance

    // Using truffle-contract, make loan object
    const loanContract = contract(LoanContract)
    loanContract.setProvider(web3.currentProvider)

    // declaring loan instance
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
    
      })
      console.log('State updated with loans')

  }) 
  results = {
    loans: allLoans
  }


  resolve(store.dispatch(loansInitialized(results)))
  })
})

export default getAllLoans
