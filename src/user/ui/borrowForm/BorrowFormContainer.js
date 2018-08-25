import { connect } from 'react-redux'
import BorrowForm from './BorrowForm'
import { borrow } from './BorrowFormActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBorrowFormSubmit: (amount) => {
      dispatch(borrow(amount))
    }
  }
}

const BorrowFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BorrowForm)

export default BorrowFormContainer
