var Loan = artifacts.require("./DeCapital.sol");

contract('Loan', function(accounts) {
  /*
   * The following tests the ability of a user to apply for a loan. 
   * It calls the contract's apply function with a user account
   * and checks to see that the loanCount has incremented.
   * This is important because it is a basic function of the 
   * dApp and without it, there would be no loans on which 
   * to lend 
   */
  it("User should be able to apply for a loan", function() {
    return Loan.deployed().then(function(instance) {
      loanInstance = instance;

      return loanInstance.apply(5, {from: accounts[0]});
    }).then(function() {
      return loanInstance.loanCount.call();
    }).then(function(loanCount) {
      assert.equal(loanCount, 1, "The user was unable to apply for a loan");
    });
  });
  /*
   * The following tests the functionality of the contract to 
   * assign an interest rate. The rate applied should be between
   * three and eight percent. This next text verifies that the rate
   * is at least three
   */
  it("User should be able to assigned an interest rate of at least 3 percent", function() {
    return Loan.deployed().then(function(instance) {
      loanInstance = instance;

      return loanInstance.loans(0)
    }).then(function(loanData) {
      assert.isAtLeast(Number(loanData.toString().split(',')[2]), 3, "The user was assigned an incorrect interest rate");   
    });
  });
  /*
   * The following tests the functionality of the contract to 
   * assign an interest rate. The rate applied should be between
   * three and eight percent. This next text verifies that the rate
   * is at most
   */
  it("User should be able to assigned an interest rate of at least 3 percent", function() {
    return Loan.deployed().then(function(instance) {
      loanInstance = instance;

      return loanInstance.loans(0)
    }).then(function(loanData) {
      assert.isAtMost(Number(loanData.toString().split(',')[2]), 8, "The user was assigned an incorrect interest rate");   
    });
  });
  /* 
   * The following tests the ability of a user to lend 
   * to a loan. It creates a loan by having an account
   * apply for one, then calls the lend function from
   * another account and checks to see that the loan
   * has been updated with the lender information.
   * This is important because without the ability to lend
   * the dApp would not be useful.
   */ 
  it("User should be able to lend Ether to loan", function() {
    return Loan.deployed().then(function(instance) {
      loanInstance = instance;
      return loanInstance.lend(0, {from: accounts[1], value: web3.toWei('5', 'ether')});
    }).then(function() {
      return loanInstance.loans(0);
    }).then(function(loanData) {
      assert.equal(loanData.toString().split(',')[6], accounts[1], "The user was unable to lend on a loan");
    });
  });
  /* The following tests the ability for a borrower
   * to make a payment. It takes the previously created loan
   * and submits a payment to it. It then checks that the balance has
   * been reduced. 
   */ 
  it("Borrower should be able to make a payment on a loan", function() {
    return Loan.deployed().then(function(instance) {
      loanInstance = instance;
      return loanInstance.makePayment(0, {from: accounts[0], value: web3.toWei('2', 'ether')});
    }).then(function() {
      return loanInstance.loans(0);
    }).then(function(loanData) {
      assert.isBelow(Number(loanData.toString().split(',')[3]), Number(web3.toWei('5', 'ether')), "The borrower was unable to make a payment");
    });
  });
/* The following tests the ability for a borrower
   * to pay off a loan It takes the previously created loan
   * and submits a payment to it that is greater than the balance. 
   * It then checks that the state of the loan has been 
   * set to "settled"  It also ensure that the logic to accept
   * payments larger than the balance is working 
   */ 
  it("Borrower should be able to make a payment on a loan", function() {
    return Loan.deployed().then(function(instance) {
      loanInstance = instance;
      return loanInstance.makePayment(0, {from: accounts[0], value: web3.toWei('6', 'ether')});
    }).then(function() {
      return loanInstance.loans(0);
    }).then(function(loanData) {
      assert.equal(Number(loanData.toString().split(',')[4]), 2, "The borrower was unable to make a payment");
    });
  });
});
