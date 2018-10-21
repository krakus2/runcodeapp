import React from 'react';
import PropTypes from 'prop-types';

const InlineError = ({ text }) => (
   <div
      style={{
         color: '#ae5856',
         fontSize: '14px',
         width: 'auto',
         maxWidth: '450px',
         margin: '5px auto 0 auto',
         textAlign: 'center',
         whiteSpace: 'pre'
      }}
   >
      {text}
   </div>
);

InlineError.propTypes = {
   text: PropTypes.string.isRequired
};

export default InlineError;
