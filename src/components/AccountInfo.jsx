import PropTypes from 'prop-types'

const AccountInfo = ({ account, chainId }) => (
  <div className="mt-6">
    <p className="mb-2 text-lg">
      <span className="font-semibold">Account:</span> {account ? account : 'Not connected'}
    </p>
    <p className="text-lg">
      <span className="font-semibold">Chain ID:</span> {chainId ? chainId : 'Not connected'}
    </p>
  </div>
);

AccountInfo.propTypes = {
    account: PropTypes.node,
    chainId: PropTypes.node,
}

export default AccountInfo;
