const Utility = artifacts.require("Utility");

module.exports = function (deployer) {
  // deployment steps
  deployer.deploy(Utility);
};
