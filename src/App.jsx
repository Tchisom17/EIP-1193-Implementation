// src/App.jsx
import useWallet from "./hooks/useWallet";

const App = () => {
  const {
    account,
    chainId,
    balance,
    inputAddress,
    connectWallet,
    setInputAddress,
    fetchBalance,
  } = useWallet();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <button
        onClick={connectWallet}
        className="bg-blue-500 text-white p-3 rounded-md mb-4"
      >
        Connect Wallet
      </button>

      {account && (
        <div className="info-container">
          <h2>Address: {account}</h2>
          <h2>Chain ID: {chainId}</h2>
        </div>
      )}

      <input
        type="text"
        value={inputAddress}
        onChange={(e) => setInputAddress(e.target.value)}
        placeholder="Enter address"
        className="border p-2 rounded mb-4"
      />

      <button
        onClick={fetchBalance}
        className="bg-green-500 text-white p-3 rounded-md"
      >
        Get Balance
      </button>

      {balance && (
        <div className="mt-4">
          <h3>Balance: {balance} ETH</h3>
        </div>
      )}
    </div>
  );
};

export default App;
