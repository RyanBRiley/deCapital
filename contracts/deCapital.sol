pragma solidity ^0.4.7;

contract CreditMarket {
    
    uint loanCount;
    mapping (uint => Loan) public loans;
    
    enum State {Applied, Approved, Disbursed, OnTime, Late, Default}
    
    struct Loan {
        uint loanId;
        uint amount;
        uint rate;
        State state;
        address borrower;
        address lender;
    }
    
    event Applied(uint loanId); 
    event Approved(uint loadId);
    event Disbursed(uint loanId);
    event PaymentMade(uint loanId);
     
    
    constructor() public {
        loanCount = 0;
    }

    
    /*  
        Function allows users to ask for a specific amount in eth.
        Amount is converted to wei 
    */
    function apply(uint _amount) public {
        emit Applied(loanCount);
        loans[loanCount] = Loan({loanId: loanCount, 
                                 amount: _amount * 10**18, 
                                 rate: 0, 
                                 borrower: msg.sender, 
                                 lender: 0});
        loanCount++;  
    }
    
    function makeOffer(uint _loanId) 
        public 
        payable 
    {
        loans[_loanId].lender = msg.sender;
        loans[_loanId].borrower.transfer(loans[_loanId].amount);
    }
    
    function acceptOffer(uint _loanId)
        public
        payable
    {
        
    }
    
    function makePayment(uint _loanId)
        public
        payable
    {
           
    }
    
    function amortize(uint _principal, 
                      uint _rate, 
                      uint _termInMonths) 
        private 
        returns(uint) 
    {
        return _principal * ((_rate * (1 + _rate)**_termInMonths)/(((1 + _rate)**_termInMonths) - 1));
    }
}