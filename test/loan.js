var Loan = artifacts.require("./Loan.sol");

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

      return loanInstance.apply(20, {from: accounts[0]});
    }).then(function() {
      return loanInstance.loanCount.call();
    }).then(function(loanCount) {
      assert.equal(loanCount, 1, "The user was unable to apply for a loan");
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

      return loanInstance.apply(20, {from: accounts[0]});
    }).then(function() {
      return loanInstance.lend(0, {from: accounts[1], value: web3.toWei('20', 'ether')});
    }).then(function() {
      return loanInstance.loans(0);
    }).then(function(loanData) {
      assert.equal(loanData.toString().split(',')[4], accounts[1], "The user was unable to lend on a loan");
    });
  });
});
