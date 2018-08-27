
let getLentLoans= (loans, account) => {
    return loans.filter((loan) => {
        return loan.lender === account
    })
}
export default getLentLoans
