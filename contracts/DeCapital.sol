pragma solidity ^0.4.7;

import "./lib/zeppelin/SafeMath.sol";
/*
DeCapital contract - 
a smart contract for lending and borrowing
loans on the Ethereum Blockchain
*/

contract DeCapital {
    
    //The following line integrates Open Zeppelin's SafeMath library
    using SafeMath for uint;
    
    address public owner;
    uint public loanCount;
    bool public emergency = false; //Circuit Breaker 
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
        owner = msg.sender;
    }
    
    /* 
    Stop in Emergency modifier adds a circuit
    breaker. If something goes terribly wrong,
    the owner can set the emergency member, 
    halting operations
    */
    modifier stopInEmergency() { 
        require(!emergency); 
        _; 
    }
    
    /*
    onlyOwner modifier ensures that the 
    subsequent function is executed solely by
    the owner of the contract
    */
    modifier onlyOwner() {
        if(msg.sender == owner) {
            _;
        }
    }
    
    /*
    killContract function checks that the 
    caller is the owner and then executes
    self destruct on the contract
    */  
    function killContract() public onlyOwner {
        selfdestruct(owner);
    }
    
    /*
    toggleEmergency function allows the owner to put
    the contranct state in emergency, halting operations
    */
    function toggleEmergency() public onlyOwner {
        emergency = !emergency;
    }
    /*
    Function allows users to ask for a specific amount in eth.
    Amount is converted to wei 
    */
    function apply(uint _amount) public stopInEmergency {
        uint _rate = calculateInterestRate();
        emit Applied(loanCount);
        loans[loanCount] = Loan({loanId: loanCount, 
                                 amount: _amount.mul(10**18), 
                                 rate: _rate,
                                 balance: (_amount.mul(10**18)).add((_amount.mul(_rate.mul(10**16)))),
                                 state: State.Requested,
                                 borrower: msg.sender, 
                                 lender: 0});
        loanCount++;  
    }
    
    /*  
    Function allows users to lend to a borrower 
    Given the loan_id, it transfers the funds
    */
    
    function lend(uint _loanId) 
        public 
        payable 
        stopInEmergency
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
        stopInEmergency
    {
        require(loans[_loanId].state == State.Disbursed, "Loan must be in repayment");
        emit PaymentMade(_loanId);
        if (loans[_loanId].balance > msg.value) {
            loans[_loanId].balance = loans[_loanId].balance.sub(msg.value);
            loans[_loanId].lender.transfer(msg.value);
        } else {
            loans[_loanId].state = State.Settled;
            loans[_loanId].lender.transfer(loans[_loanId].balance);
            loans[_loanId].borrower.transfer(msg.value.sub(loans[_loanId].balance));
            loans[_loanId].balance = 0;
        }
           
    }
    
    /*  
    This function returns the interest rate for the loan.
    This is a stub until there are smarter ways of 
    determining credit-worthiness (ie. an oracle).
    In the mean-time, assign a pseudo random interest rate between
    3 and 8 percent. Note that block.timestamp should not be used
    for security dependent features. 
    */
    function calculateInterestRate() private view returns (uint8) {
        return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))).mod(5).add(3));
    }

}