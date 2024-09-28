import PropTypes from "prop-types";

const BalanceChecker = ({ address, setAddress, getBalance, balance }) => (
  <div className="mt-8 flex flex-col items-center">
    <input
      type="text"
      placeholder="Enter Ethereum Address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      className="p-2 border border-gray-300 rounded text-black mb-4"
    />
    <button
      onClick={getBalance}
      className="bg-green-500 px-4 py-2 rounded text-white font-semibold"
    >
      Get Balance
    </button>
    <p className="mt-4 text-lg">
      <span className="font-semibold">Balance:</span>{" "}
      {balance !== null ? `${balance} ETH` : "N/A"}
    </p>
  </div>
);

BalanceChecker.propTypes = {
  address: PropTypes.node,
  setAddress: PropTypes.node,
  getBalance: PropTypes.node,
  balance: PropTypes.node,
};
export default BalanceChecker;
