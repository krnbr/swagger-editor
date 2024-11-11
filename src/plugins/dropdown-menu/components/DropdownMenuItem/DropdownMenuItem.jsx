import React from 'react';
import PropTypes from 'prop-types';

const DropdownMenuItem = ({ children, onClick, closeId, removedFromStorage }) => {
  return (
    <div>
      <li className="dropdown-item">
        <button
          type="button"
          onClick={onClick}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {children}
          {closeId && (
            <button
              className="close-button-history"
              type="button"
              key={closeId}
              style={{
                marginLeft: '37px',
              }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent button click
                removedFromStorage(closeId);
              }}
            >
              &times;
            </button>
          )}
        </button>
      </li>
    </div>
  );
};

DropdownMenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  closeId: PropTypes.string,
  removedFromStorage: PropTypes.func,
};

DropdownMenuItem.defaultProps = {
  closeId: null,
  removedFromStorage: null,
};

export default DropdownMenuItem;
