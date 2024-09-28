import PropTypes from "prop-types";

const Header = ({ connectToMetaMask }) => (
  <header className="w-full py-6 text-center bg-blue-600">
    <h1 className="text-2xl font-bold">MetaMask Integration with React</h1>
    <button
      onClick={connectToMetaMask}
      className="mt-4 bg-yellow-500 text-black font-semibold px-4 py-2 rounded"
    >
      Enable Ethereum
    </button>
  </header>
);
Header.propTypes = {
  connectToMetaMask: PropTypes.node,
};

export default Header;
