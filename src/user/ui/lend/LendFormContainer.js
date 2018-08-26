import { connect } from 'react-redux'
import { lend } from './LoanActions'
import LendForm from './LendForm'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoanSubmit: (loanId, loanAmt) => {
      dispatch(lend(loanId, loanAmt))
    }
  }
}

const LendFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LendForm)

export default LendFormContainer