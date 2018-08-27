pragma solidity ^0.4.7;

contract DeCapital {
    uint public loanCount;
    mapping (uint => Loan) public loans;
    
    enum State {Requested, Disbursed, Settled}
    
    struct Loan {
        uint loanId;
        uint amount;
        uint rate;
        uint balance;
        State state;
        address borrower;
        address lender;
    }
    
    event Applied(uint loanId); 
    event Funded(uint loanId);
    event PaymentMade(uint loanId);
    
    constructor() public {
        loanCount = 0;
    }
    
    /*  
        Function allows users to ask for a specific amount in eth.
        Amount is converted to wei 
    */
    function apply(uint _amount) public {
        uint _rate = calculateInterestRate();
        emit Applied(loanCount);
        loans[loanCount] = Loan({loanId: loanCount, 
                                 amount: _amount * 10**18, 
                                 rate: _rate,
                                 balance: (_amount * 10**18) + (_amount * _rate * 10**16),
                                 state: State.Requested,
                                 borrower: msg.sender, 
                                 lender: 0});
        loanCount++;  
    }
    
    /*  
        Function allows users to lend to a borrower 
    */
    
    function lend(uint _loanId) 
        public 
        payable 
    {
        require(loans[_loanId].state == State.Requested, "Loan must not be funded");
        emit Funded(_loanId);
        loans[_loanId].lender = msg.sender;
        loans[_loanId].state = State.Disbursed;
        loans[_loanId].borrower.transfer(loans[_loanId].amount);
    }
    
    /*  
        Function allows users to make a payment on 
        an existing loan and calculate if it is paid off in full
    */
    function makePayment(uint _loanId)
        public
        payable
    {
        require(loans[_loanId].state == State.Disbursed, "Loan must be in repayment");
        emit PaymentMade(_loanId);
        if (loans[_loanId].balance > msg.value) {
            loans[_loanId].balance = loans[_loanId].balance - msg.value;
            loans[_loanId].lender.transfer(msg.value);
        } else {
            loans[_loanId].state = State.Settled;
            loans[_loanId].lender.transfer(loans[_loanId].balance);
            loans[_loanId].borrower.transfer(msg.value - loans[_loanId].balance);
            loans[_loanId].balance = 0;
        }
           
    }
    
    /*  
        This function returns the interest rate for the loan.
        This is a stub until there are smarter ways of 
        determining credit-worthiness (ie. an oracle).
        In the mean-time, assign a random interest rate between
        3 and 8 percent
    */
    function calculateInterestRate() private view returns (uint8) {
        return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % 5 + 3);
    }

}