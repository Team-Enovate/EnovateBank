import fullLogo from "../logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";


function Navbar() {
  const allowedAddress = ""; // replace with your allowed wallet address
  const navigate = useNavigate();
  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState("0x");

  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  }

  function updateButton() {
    const ethereumButton = document.querySelector(".enableEthereumButton");
    ethereumButton.textContent = "Connected";
    ethereumButton.classList.remove("hover:bg-blue-70");
    ethereumButton.classList.remove("bg-blue-500");
    ethereumButton.classList.add("hover:bg-green-70");
    ethereumButton.classList.add("bg-green-500");
  }

  async function connectWebsite() {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== '0x5') {
      //alert('Incorrect network! Switch your metamask network to Rinkeby');
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x5' }],
      })
    }
    await window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(() => {
        updateButton();
        console.log("here");
        getAddress();
        window.location.replace(location.pathname)
      });
  }
  useEffect(() => {
    const checkAddress = async () => {
      const ethers = require("ethers");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const addr = await signer.getAddress();
      if (addr.toLowerCase() !== allowedAddress.toLowerCase()) {
        // redirect to homepage if not allowed address
        navigate("/");
      }
    };
  
    if (location.pathname === "/admin" && window.ethereum && connected) {
      checkAddress();
    }
  }, [connected, navigate, location.pathname, allowedAddress]);
  
 useEffect(() => {
  let val = window.ethereum.isConnected();
  if (val) {
    console.log("here");
    getAddress();
    toggleConnect(val);
    updateButton();
  }

  window.ethereum.on('accountsChanged', function(accounts){
    window.location.replace(location.pathname)
  })
}, [location.pathname]); // add empty dependency array


  return (
    <div className="">
      <nav className="bg-gray-900 text-white py-2">
        <ul className="container mx-auto flex justify-between items-center">
          <li className="flex items-end ml-5 pb-2">
            <Link to="/">
            <img
                src={fullLogo}
                alt=""
                width={150}
                height={150}
                className="inline-block -mt-2"
              />
            </Link>
          </li>
          <li className="w-2/6">
            <ul className="lg:flex justify-between font-bold mr-10 text-lg">
            
             
              {location.pathname === "/" ? (
                <li className="border-b-2 hover:pb-0 p-2">
                  <Link to="/">Home</Link>
                </li>
              ) : (
                <li className="hover:border-b-2 hover:pb-0 p-2">
                  <Link to="/">Home</Link>
                </li>)}
              {location.pathname === "/sellNFT" ? (
                <li className="border-b-2 hover:pb-0 p-2">
                  <Link to="/About">About </Link>
                </li>
              ) : (
                <li className="hover:border-b-2 hover:pb-0 p-2">
                  <Link to="/About">About </Link>
                </li>
              )}
              {location.pathname === "/User" ? (
                <li className="border-b-2 hover:pb-0 p-2">
                  <Link to="/User">User</Link>
                </li>
              ) : (
                <li className="hover:border-b-2 hover:pb-0 p-2">
                  <Link to="/User">User</Link>
                </li>
              )}
              
              <li>
                <button
                  className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                  onClick={connectWebsite}
                >
                  {connected ? "Connected" : "Connect Wallet"}
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className="text-white text-bold text-right mr-10 text-sm">
        {currAddress !== "0x"
          ? "Connected to"
          : "Not Connected. Please login to view NFTs"}{" "}
        {currAddress !== "0x" ? currAddress.substring(0, 15) + "..." : ""}
      </div>
    </div>
  );
}

export default Navbar;
