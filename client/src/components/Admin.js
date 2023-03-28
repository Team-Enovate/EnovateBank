import React, { useState, useEffect } from "react";
import {contractABI2,contractAddress2} from "../utils/constants2";
import {contractAddress1} from "../utils/constants1";

import Navbar from "./Navbar";
import Footer from "./footer";

const { ethers } = require("ethers");

function Admin() {
  const [transferValue, setTransferValue] = useState("");
  const[transferSuccess,setTransferSuccess]=useState(false);



  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    async function loadProvider() {
      // load provider (example: using metamask)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setProvider(provider);
      setSigner(signer);
    }
    if (window.ethereum) {
      loadProvider();
    } else {
      console.error(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }, []);

  async function handleTransfer() {
    if (!provider || !signer) {
      alert("Please connect to Ethereum network");
      return;
    }
    const contract = new ethers.Contract(
      contractAddress2,
      contractABI2,
      signer
    );
    try {
      const transferValues=ethers.utils.parseEther(transferValue)
      const tx = await contract.transfer(contractAddress1, transferValues);
      await tx.wait();
      setTransferSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  }

 
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-gray-100">
        <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Transfer Tokens
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="transferAmount"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Amount to Transfer(ENVT)
                </label>
                <input
                  id="mintAmount"
                  type="number"
                  value={transferValue}
                  onChange={(e) => setTransferValue(e.target.value)}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
    
              </div>
              <button
                onClick={handleTransfer}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Transfer
              </button>
              {transferSuccess && (
                <p className="text-green-500 mt-2">
                  Tokens successfully transfered!
                </p>
              )}
            </div>
            
            
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Admin;