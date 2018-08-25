import { connect } from 'react-redux'
import Loan from './Loan'
import { lend } from './LoanActions'
import LendForm from './LendForm'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoanSubmit: (loanId) => {
      dispatch(lend(loanId))
    }
  }
}

const LendFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LendForm)

export default LendFormContainer