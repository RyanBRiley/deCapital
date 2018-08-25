const initialState = {
  web3Instance: null,
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
  return state
}

export default web3Reducer
