pragma solidity ^0.4.7;

contract deCapital {
    
    uint public loanCount;
    mapping (uint => Loan) public loans;
    
    struct Loan {
        uint loanId;
        uint amount;
        uint rate;
        address borrower;
        address lender;
    }
    
    event Applied(uint loanId); 
    
    constructor() public {
        loanCount = 0;
    }
    
    /*  Function allows users to ask for a specific amount in eth.
        Amount is converted to wei 
    */
    function apply(uint _amount) public {
        emit Applied(loanCount);
        loans[loanCount] = Loan({loanId: loanCount, amount: _amount * 10**18, rate: 0, borrower: msg.sender, lender: 0});
        loanCount++;  
    }
    
    function lend(uint _loanId) 
        public 
        payable 
    {
        loans[_loanId].lender = msg.sender;
        loans[_loanId].borrower.transfer(loans[_loanId].amount);
    }

    function getLoanCount() public view 
            returns (uint loanCount_) 
    {
        loanCount_ = loanCount;
    } 
}