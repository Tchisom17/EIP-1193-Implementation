// src/hooks/useWallet.js
import { useState, useEffect } from "react";
import { ethers } from "ethers";


const useWallet = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [provider, setProvider] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      setProvider(provider);
    } else {
      alert("Please install MetaMask!");
    }
  };

  const fetchBalance = async () => {
    if (provider && account) {
      const balance = await provider.getBalance(account);
      setBalance(ethers.utils.formatEther(balance));
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [account, provider]);

  return { account, balance, connectWallet };
};

export default useWallet;
