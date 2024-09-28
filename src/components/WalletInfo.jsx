// src/components/WalletInfo.jsx
import PropTypes from 'prop-types';

const WalletInfo = ({ account, balance, network }) => {
  return (
    <div className="text-center">
      {account ? (
        <>
          <p className="mb-2">Connected Account: {account}</p>
          <p className="mb-2">Network: {network}</p>
          <p className="mb-2">Balance: {balance} ETH</p>
        </>
      ) : (
        <p className="text-red-500">No wallet connected</p>
      )}
    </div>
  );
};
WalletInfo.propTypes = {
    account: PropTypes.node,
    balance: PropTypes.node,
    network: PropTypes.node,
}

export default WalletInfo;
