require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
// eslint-disable-next-line no-undef
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    mumbai: {
      url: process.env.QUICKNODE_API_URL,
      accounts: [process.env.PRIVATE_MUMBAI_ACCOUNT_KEY],
    },
  },
};
