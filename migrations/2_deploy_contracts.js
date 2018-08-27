var SafeMath = artifacts.require("./lib/zeppelin/SafeMath.sol");
var Loan = artifacts.require("./DeCapital.sol");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, Loan);
  deployer.deploy(Loan)
};
