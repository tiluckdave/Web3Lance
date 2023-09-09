// scripts/deploy.js
const hre = require("hardhat");

const main = async () => {
  const Escrow = await hre.ethers.deployContract("Escrow");
  await Escrow.waitForDeployment();

  console.log("Escrow Contract address: ", await Escrow.getAddress());
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
