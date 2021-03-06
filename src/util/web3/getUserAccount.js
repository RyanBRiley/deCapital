import store from '../../store'

export const ACCOUNT_INITIALIZED = 'ACCOUNT_INITIALIZED'
function accountInitialized(results) {
  return {
    type: ACCOUNT_INITIALIZED,
    payload: results
  }
}

let getUserAccount = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function(dispatch) {
    let web3 = store.getState().web3.web3Instance
    var results

    // Check that web3 is defined
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.

        if (error) {
          console.error(error);
        }

        results = {
            userAccount: coinbase
          }
          resolve(store.dispatch(accountInitialized(results)))
      })      
      
      console.log('User Account detected.');

     
    
    } else {

      console.log('No Account Detected')
    }
  })
})

export default getUserAccount
