# EnovateBank <br>
## Decentralized Bank App <br>
## Project Description <br>
<p> This project was built using Solidity and React, it is a decentralized banking application and it aims to replicate the two most important features of the traditional banking system
which is Savings and Loans. </p>
<p> Through this DApp users can interact with a decentralized banking system which is powered by the ENOVATE TOKEN. Users can save their ETH in the bank with will accured interest
based on the amount of Ether deposited and the amount of time it stays in the contract. The special features of this savings system is that Users can withdraw their deposit in bits and still receive
interest on the remaining amount till it is also withdrawn. Another feature is that the interests are paid in ENV. </p>
<p>The second feature of this bank is that users can borrow ENV and pay back later. Collateral would have to be deposited in Ether which will determine how much token is borrowed to the user with the ratio 1:100, which means
1 ether= 100 ENV. When the user is ready to pay back a 10% fee is deducted from the collateral but 5% of the ENV borrowed is given to the user.</p> <br>

## Project Snapshot 
<img src="/client/public/enovate.png" alt="Alt text" title="Optional title" height="250"> <br>

## Project Website Link 
https://enovatebank.vercel.app/ <br>

## Verified Goerli Deployment contract
https://goerli.etherscan.io/address/0x7Cdf2884b2f1Bd0DFd203c8739039784EfFd29e0#code <br>

## Aknowledgement 

DAPP UNIVERSITY  <br>

## Project Authors <br>
<p>Ayoola Victor Oladeinde <li>https://github.com/Ayoolavictor  </li> </p>
<p>Samuel Osiyomeoh Samuel <li>https://github.com/Osiyomeoh </li>
  </p>
<p>Samaila Anthony Malima <li>https://github.com/samailamalima </li> </p>
<p>Nubi Oludayo James  <li>https://github.com/nubiolujimmy    </li></p>
<p>Agbo Chiemezie Precious <li> https://github.com/chiemezie1  </li>   </p><br>

## How to Install/Run this Project <br>

This is an example of how you can set up your project locally. To get a local copy up and running follow these simple example steps.

1. Clone the repo

```sh
git clone with HTTPS          https://github.com/Team-Enovate/EnovateBank.git
git clone with SSH            git@github.com:Team-Enovate/EnovateBank.git
git clone with Github CLI     gh repo clone Team-Enovate/EnovateBank
```
2. Development

Running the frontend code

```sh
1. npm install
2. npm run start
```

Running the smart contract

```sh
1. cd contracts
2. npm install
3. npx hardhat run scripts/run.js
4. make sure you fill up the information in .env file
```

This is how your .env file is suppose to look like. Remember to remove `<>` when placing your private and API keys.

```sh
PRIVATE_KEY=<YOUR_PRIVATE_KEY_HERE>
WEB3_API_KEY=<WEB3_API_KEY>
```

## How to Navigate through the project
```sh
1. Ensure you have Metamask installed on your browser and connect your wallet to the Dapp.
2. Navigate to the user tab, there is an admin tab though but it is used just for transfering tokens to the
   main bank contract so you do not need it orless you want to install the project locally and mint your own tokens.
   it can be accessed by /admin
3. On the User tab, you can deposit your Eth, withdraw and receive interest.
4. You can also borrow tokens and the amount would be calculated from the amount of ether deposited.
5. To pay back your loan there is an allow button which must be used first to make the bank contract deduct the token
   from your account, then the pay back button can be used. 
```

## License <br>
MIT <br>
GRANDIDA <br>


