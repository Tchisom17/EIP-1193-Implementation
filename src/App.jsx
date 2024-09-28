import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import Header from "./components/Header";
import AccountInfo from "./components/AccountInfo";
import BalanceChecker from "./components/BalanceChecker";

const App = () => {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [balance, setBalance] = useState(null);
  const [address, setAddress] = useState("");

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      setAccount(null);
      setBalance(null);
      console.log("Please connect to MetaMask.");
    }
  };

  const handleChainChanged = (chainId) => {
    setChainId(chainId);
    setBalance(null);
  };

  const connectToMetaMask = async () => {
    try {
      const provider = await detectEthereumProvider();
      if (provider && provider === window.ethereum) {
        console.log("MetaMask is available!");
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        handleAccountsChanged(accounts);
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        handleChainChanged(chainId);
        window.ethereum.on("accountsChanged", handleAccountsChanged);
        window.ethereum.on("chainChanged", handleChainChanged);
      } else {
        console.log("MetaMask is not available!");
      }
    } catch (error) {
      if (error.code === 4001) {
        console.log("User rejected the connection request.");
      } else {
        console.error(error);
      }
    }
  };

  const getBalance = async () => {
    if (!address) {
      alert("Please enter a valid Ethereum address");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(address);
      setBalance(ethers.formatEther(balance));
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance(null);
    }
  };

  useEffect(() => {
    connectToMetaMask();
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, []);

  return (
    <div className="App bg-gray-800 min-h-screen flex flex-col items-center text-white">
      <Header connectToMetaMask={connectToMetaMask} />
      <AccountInfo account={account} chainId={chainId} />
      <BalanceChecker
        address={address}
        setAddress={setAddress}
        getBalance={getBalance}
        balance={balance}
      />
    </div>
  );
};

export default App;
