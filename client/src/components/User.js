import React, { useState, useEffect } from "react";
import {contractABI1,contractAddress1} from "../utils/constants1";
import{contractABI2,contractAddress2} from "../utils/constants2";
import Navbar from "./Navbar";
import Footer from "./footer";
const { ethers } = require("ethers");

function User() {
  const [ethBalance, setEthBalance] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [enovateToken, setEnovateToken] = useState(0);
  const [contractEtherBalance, setContractEtherBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [borrowAmount, setBorrowAmount] = useState("");
  const [allowAmount, setAllowAmount] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  

  useEffect(() => {
    async function loadProvider() {
      // load provider (example: using metamask)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setProvider(provider);
      setSigner(signer);
      const contract = new ethers.Contract(contractAddress1,contractABI1,signer);
      const callerAddress= await signer.getAddress();
      

      const ethBalance = await contract.getETHBalanceOf(callerAddress);
      const totalInterest = await contract.getTotalInterest(callerAddress);
      const enovateToken = await contract.getEnovateToken(callerAddress);
      const contractEtherBalance = await contract.getContractEtherBalance();
      const _ethBalance=ethers.utils.formatUnits(ethBalance,18);
      const _totalInterest=ethers.utils.formatUnits(totalInterest,18)
      const _enovateToken=ethers.utils.formatUnits(enovateToken,18)
      const _contractEtherBalance=ethers.utils.formatUnits(contractEtherBalance,18)
  
      setEthBalance(_ethBalance);
      setTotalInterest(_totalInterest);
      setEnovateToken(_enovateToken);
      setContractEtherBalance(_contractEtherBalance);
      
      
    }
    if (window.ethereum) {
      loadProvider();
    } else {
      console.error(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    
    
  }, []);
    

  async function handleDeposit() {
    if (!provider || !signer) {
      alert("Please connect to Ethereum network");
      return;
    }
    const contract = new ethers.Contract(
      contractAddress1,
      contractABI1,
      signer
    );
    try {
    
      const depositAmounts = ethers.utils.parseEther(depositAmount);
    // Convert to string
      const tx = await contract.depositETH({gasLimit:10000000,value:depositAmounts});
      await tx.wait();
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  }
  async function handleWithdraw() {
    if (!provider || !signer) {
      alert("Please connect to Ethereum network");
      return;
    }
    const contract = new ethers.Contract(
      contractAddress1,
      contractABI1,
      signer
    );
    try {
      const withdrawAmounts=ethers.utils.parseEther(withdrawAmount);
      //console.log(withdrawAmounts);
      const tx = await contract.withdrawETH(withdrawAmounts);
      await tx.wait();
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  }
  async function handleBorrow() {
    if (!provider || !signer) {
      alert("Please connect to Ethereum network");
      return;
    }
    const contract = new ethers.Contract(
      contractAddress1,
      contractABI1,
      signer
    );
    try {
      const borrowAmounts=ethers.utils.parseEther(borrowAmount);
      const tx = await contract.borrow({gasLimit:10000000,value:borrowAmounts});
      await tx.wait();
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  }
  async function handleAllow(){
    if (!provider || !signer) {
      alert("Please connect to Ethereum network");
      return;
    }
    const contract=new ethers.Contract(
      contractAddress2,contractABI2,signer
    );
    try{
      const allowAmounts=ethers.utils.parseEther(allowAmount)
      const tx=await contract.approve(contractAddress1,allowAmounts);
      await tx.wait();



    }
    catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }



  }

  async function handlePayoff() {
    if (!provider || !signer) {
      alert("Please connect to Ethereum network");
      return;
    }
    const contract = new ethers.Contract(
      contractAddress1,
      contractABI1,
      signer
    );
    try {
      const tx = await contract.payoffToken({gasLimit:100000});
      await tx.wait();
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
    <Navbar/>
    
    <div className="bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400 min-h-screen flex flex-col items-center justify-center">

  
     
      <div className="w-full max-w-4xl p-4">
        <div className="flex justify-center mb-4">
          <div className="bg-white border shadow rounded-lg p-6 mr-4">
            <div className="text-gray-500 mb-2">ETH Balance</div>
            <div className="text-xl font-bold">{ethBalance}</div>
          </div>
          <div className="bg-white border shadow rounded-lg p-6 mr-4">
            <div className="text-gray-500 mb-2">Total Interest</div>
            <div className="text-xl font-bold">{totalInterest}</div>
          </div>
          <div className="bg-white border shadow rounded-lg p-6 mr-4">
            <div className="text-gray-500 mb-2">Enovate Token</div>
            <div className="text-xl font-bold">{enovateToken}</div>
          </div>
          <div className="bg-white border shadow rounded-lg p-6">
            <div className="text-gray-500 mb-2">Contract ETH Balance</div>
            <div className="text-xl font-bold">{contractEtherBalance}</div>
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <div className="bg-white border shadow rounded-lg p-6 mr-4">
            <div className="text-gray-500 mb-2">Deposit ETH</div>
            <div className="flex items-center mb-2">
            <input
                className="border rounded-lg py-2 px-3 w-full"
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />
            </div>
            <button
              className="bg-green-500 text-white rounded-lg py-2 px-3"
              onClick={handleDeposit}
            >
              Deposit
            </button>
          </div>
          <div className="bg-white border shadow rounded-lg p-6 mr-4">
            <div className="text-gray-500 mb-2">Withdraw ETH</div>
            <div className="flex items-center mb-2">
              <input
                className="border rounded-lg py-2 px-3 w-full"
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
            </div>
            <button
              className="bg-red-500 text-white rounded-lg py-2 px-3"
              onClick={handleWithdraw}
            >
              Withdraw
            </button>
          </div>
          <div className="bg-white border shadow rounded-lg p-6 mr-4">
            <div className="text-gray-500 mb-2">Borrow</div>
            <div className="flex items-center mb-2">
              <input
                className="border rounded-lg py-2 px-3 w-full"
                type="number"
                value={borrowAmount}
                onChange={(e) => setBorrowAmount(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 text-white rounded-lg py-2 px-3"
              onClick={handleBorrow}
            >
              Borrow
            </button>
          </div>
          <div className="bg-white border shadow rounded-lg p-6 mr-4">
            <div className="text-gray-500 mb-2">Allow</div>
            <div className="flex items-center mb-2">
              <input
                className="border rounded-lg py-2 px-3 w-full"
                type="number"
                value={allowAmount}
                onChange={(e) => setAllowAmount(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 text-white rounded-lg py-2 px-3"
              onClick={handleAllow}
            >
              Allow
            </button>
          </div>
          <div className="bg-white border shadow rounded-lg p-6">
            <div className="text-gray-500 mb-2">Payoff</div>
            <div className="flex items-center mb-2">
             
            </div>
            <button
              className="bg-yellow-500 text-white rounded-lg py-2 px-3"
              onClick={handlePayoff}
            >
              Payoff
            </button>
          </div>
          
        </div>
      </div>
    </div>
    <Footer/>
    </div>
    
  );
}

export default User;