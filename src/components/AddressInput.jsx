// src/components/AddressInput.jsx
import PropTypes from 'prop-types';

const AddressInput = ({ inputAddress, handleInputChange }) => {
  return (
    <input
      type="text"
      value={inputAddress}
      onChange={handleInputChange}
      placeholder="Enter Address"
      className="w-full px-4 py-2 border rounded mb-4"
    />
  );
};
AddressInput.propTypes = {
    inputAddress: PropTypes.node,
    handleInputChange: PropTypes.node,
}

export default AddressInput;
