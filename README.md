<h1>Web3Lance</h1>

[Demo Video](https://www.loom.com/share/a083f1a302f24b79931035e098ad6af4?sid=5be98c5f-3256-4191-98be-92da851bcfc4 )

[Visit site](https://web3-lance.vercel.app/)

Smart Contract Deployed on Polygon Mumbai Testnet

Contract Address - 0xea3e1D27A82DC53a960741485b16F9893Ee3b6f1

[View on Polygonscan](https://mumbai.polygonscan.com/address/0xea3e1D27A82DC53a960741485b16F9893Ee3b6f1#internaltx)

<h2>Table of Contents 📑</h2>

- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

<h2>Introduction 🚀</h2>

Web3Lance is a decentralized application (dApp) built on Polygon blockchain using Solidity smart contracts. It provides a secure and trustless escrow service, facilitating secure transactions between buyers and sellers without the need for intermediaries.

<h2>What is Escrow ❓❔</h2>

- Escrow is a financial arrangement used to safeguard funds or assets during a transaction.
- It involves a neutral third party acting as an intermediary between the buyer and seller.
- The third party holds the funds or assets until all conditions of the transaction are met.
- Escrow is commonly used in real estate transactions, business deals, and online purchases.
- It helps protect both parties from fraud and ensures the transaction is completed fairly.

<h2>Tech Stack 🛠️</h2>
<p>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/javascript-colored.svg" width="36" height="36" alt="JavaScript" /></a>
  <a href="https://reactjs.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg" width="36" height="36" alt="React" /></a>
  <a href="https://nextjs.org/docs" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nextjs-colored.svg" width="36" height="36" alt="Next.js" /></a>
  <a><img src="https://th.bing.com/th/id/R.114016a2cca951580c4d5d1aab9655ae?rik=FDccsPfv5tyutg&pid=ImgRaw&r=0" width="36" height="36" alt="Solidity"/></a>
  <a> <img src="https://th.bing.com/th/id/OIP.7K_j3KOjm-bDuIGxZb5T_QHaE5?w=258&h=180&c=7&r=0&o=5&pid=1.7" width="40" height="36" alt="Chakra"/></a>
  <a><img src="https://th.bing.com/th/id/OIP.khYFrDpaIw79LTZ0-kxhSQHaEK?w=311&h=180&c=7&r=0&o=5&pid=1.7" width="40" height="36" alt="Metamask" /></a>
</p>

- **Next.js**: A React framework for building server-side rendered (SSR) and statically generated web applications.
- **Chakra UI**: A simple and elegant UI component library for React applications.
- **JavaScript**: The primary programming language used for the frontend development.
- **Solidity**: A smart contract programming language used for developing Ethereum-based smart contracts.
- **MetaMask**
  

<h2>Project Overview 📝</h2>


The Web3Lance project aims to create a transparent and secure platform for facilitating transactions, particularly useful for e-commerce, freelancing, and digital goods exchanges. It allows users to create escrow contracts, hold funds in a secure manner, and ensure successful delivery before releasing the funds to the seller.

<h2>Features ✨</h2>

- **Create Escrow Contract**: Users can create new escrow contracts with specific terms and conditions for the transaction.
- **Secure Fund Holding**: Funds are held securely in the escrow contract until the transaction is successfully completed.
- **Transaction Status Tracking**: Real-time tracking of transaction status (Open, Pending, Delivery, Confirmed, Disputed).
- **Buyer Protection**: Buyer can request refunds and dispute the transaction in case of issues.

<h2>Installation 🛠️</h2>

Follow these steps to set up the project locally:

1. Clone the repository: `git clone <repository-url>`
2. Change into the project directory 
3. Install dependencies: `yarn`

<h2>Setting Up Contract🛠️</h2>

1. `cd contract`
2. Install dependencies: `yarn`
3. Compile and deploy the contract: `npx hardhat run scripts/deploy.js --network localhost`
4. Change the contract address in `CONTRACT ADDRESS` in `components/ConnectProvider.js` to the address of the deployed contract.

<h2>Usage 🚀</h2>

1. Start the development server: `yarn dev`
2. Access the application at `http://localhost:3000`

<h2>License 📄</h2>

This project is licensed under the MIT License.

---

Secure Escrow provides a secure and reliable platform for conducting transactions with enhanced trust and confidence. By leveraging blockchain technology, it empowers users to engage in secure transactions without relying on traditional intermediaries. Whether it's a freelance payment or an e-commerce purchase, Secure Escrow ensures a seamless and trustworthy transaction experience. 💪
