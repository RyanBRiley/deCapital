import { connect } from 'react-redux'
import PaymentForm from './PaymentForm'
import { makePayment } from './PaymentFormActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPaymentFormSubmit: (loanId, amount) => {
      dispatch(makePayment(loanId, amount))
    }
  }
}

const PaymentFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentForm)

export default PaymentFormContainer
