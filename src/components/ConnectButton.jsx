// src/components/ConnectButton.jsx
import PropTypes from "prop-types";

const ConnectButton = ({ connectWallet }) => {
  return (
    <button
      onClick={connectWallet}
      className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none mb-4"
    >
      Connect Wallet
    </button>
  );
};

ConnectButton.propTypes = {
  connectWallet: PropTypes.func.isRequired, // Corrected this line
};

export default ConnectButton;
