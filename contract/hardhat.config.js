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
    amoy: {
      url: "https://dimensional-ultra-hexagon.matic-amoy.quiknode.pro/395fdf5bea5e948fdc87e81769d5b81563d724dd/",
      accounts: [
        process.env.PRIVATE_KEY,
      ],
    },
  },
};
