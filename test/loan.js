var Loan = artifacts.require("./Loan.sol");

contract('Loan', function(accounts) {

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
});
