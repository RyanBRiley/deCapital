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
    })
  }
  if (action.type === 'ACCOUNT_INITIALIZED')
  {
    return Object.assign({}, state, {
      userAccount: action.payload.userAccount
    })
  }
  if (action.type === 'LOANS_INITIALIZED')
  {
    return Object.assign({}, state, {
      loans: action.payload.loans
    })
  }
  if (action.type === 'LOAN_ADDED')
  {
    return {
      ...state,
      loans: [...state.loans, action.payload.loan]
    }
  }
  return state
}


export default web3Reducer
