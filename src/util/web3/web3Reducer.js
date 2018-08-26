const initialState = {
  web3Instance: null,
  userAccount: '',
  loans: []
}

const web3Reducer = (state = initialState, action) => {
  if (action.type === 'WEB3_INITIALIZED')
  {
    return Object.assign({}, state, {
      web3Instance: action.payload.web3Instance,
      loans: action.payload.loans
    })
  }
  if (action.type === 'ACCOUNT_INITIALIZED')
  {
    return Object.assign({}, state, {
      userAccount: action.payload.userAccount
    })
  }
  return state
}


export default web3Reducer
