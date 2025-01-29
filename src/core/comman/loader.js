import React from 'react';
import PropTypes from 'prop-types';
import css from "./loader.css"
const Loader = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1300, 
      }}
    >
      <div className="loader"></div>
    </div>
  );
};

Loader.propTypes = {
  isVisible: PropTypes.bool.isRequired, 
};

export default Loader;
