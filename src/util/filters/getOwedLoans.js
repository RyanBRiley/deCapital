
let getOwedLoans= (loans, account) => {
    return loans.filter((loan) => {
        return loan.borrower === account
    })
}
export default getOwedLoans
