#Car Ride Platform Frontend
This is the frontend for the Car Ride Platform, a smart contract-based platform for arranging rides between riders and drivers. This project is built using React and interacts with the smart contract deployed on the Goerli test network.

#Requirements
Node.js v16 or higher
NPM or Yarn package manager
Access to a web3 provider connected to the Goerli test network (such as MetaMask)

#Installation
Clone this repository to your local machine.
Open a terminal and navigate to the project's root directory.
Install the project's dependencies by running npm install or yarn install.

#Usage
Connect to a web3 provider connected to the Goerli test network, such as MetaMask.
In the project's root directory, open a terminal and run npm start or yarn start to start the development server.
Open your web browser and navigate to http://localhost:3000 to view the Car Ride Platform frontend.
Use the form provided to register as a rider or driver, request a ride, and view ride information.

#Features
Register as a rider or driver using the provided form.
Request a ride by providing pickup and dropoff locations and a desired payment amount.
View information about available rides and their drivers.
Confirm a ride once a driver has accepted your request.
View information about ongoing and completed rides, including pickup and dropoff locations, payment amount, and driver information.

#Contact
If you have any questions or issues regarding this frontend, please don't hesitate to contact me.



EnovateToken deployed to: 0x69f0A79A1b25e9BF85A8a01479b779D55bE53752
EnovateBank deployed to: 0xdC540D48f441efE6bfD953671e2459c8DDb27F5e



npx hardhat run scripts/deploy.js --network goerli