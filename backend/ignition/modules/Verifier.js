const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Verifier", (m) => {

  const verifier = m.contract("Verifier");


  return { verifier };
});