// src/hooks/useWallet.js
import { useState, useEffect, useCallback } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

const useWallet = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState("");
  const [chainId, setChainId] = useState("");
  const [balance, setBalance] = useState("");
  const [inputAddress, setInputAddress] = useState("");

  // Initialize provider and set up event listeners
  const initializeProvider = useCallback(async () => {
    const detectedProvider = await detectEthereumProvider();
    if (detectedProvider && detectedProvider === window.ethereum) {
      setProvider(new ethers.BrowserProvider(detectedProvider));
      window.ethereum.on("chainChanged", handleChainChanged);
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    } else {
      console.log("Please install MetaMask!");
    }
  }, []);

  useEffect(() => {
    initializeProvider();
  }, [initializeProvider]);

  // Handle account changes
  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      console.log("Please connect to MetaMask.");
      setAccount("");
    } else {
      setAccount(accounts[0]);
      fetchChainId();
    }
  };

  // Handle chain changes
  const handleChainChanged = (chainId) => {
    setChainId(parseInt(chainId, 16));
  };

  // Fetch Chain ID
  const fetchChainId = useCallback(async () => {
    if (provider) {
      const id = await provider.getNetwork();
      setChainId(id.chainId);
    }
  }, [provider]);

  // Connect to the wallet
  const connectWallet = async () => {
    if (!provider) return;

    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      fetchChainId();
    } catch (err) {
      if (err.code === 4001) {
        console.log("User rejected the request.");
      } else {
        console.error(err);
      }
    }
  };

  // Fetch balance of the input address
  const fetchBalance = async () => {
    if (!provider || !inputAddress) return;

    try {
      const balance = await provider.getBalance(inputAddress);
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  return {
    account,
    chainId,
    balance,
    inputAddress,
    connectWallet,
    setInputAddress,
    fetchBalance,
  };
};

export default useWallet;
