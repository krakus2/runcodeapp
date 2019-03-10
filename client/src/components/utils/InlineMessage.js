import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles';

const InlineMessage = ({ text, isError, bigMargin, theme }) => {
   console.log(theme);
   return (
      <div
         style={{
            color: isError ? theme.palette.error.main : theme.palette.primary.main,
            fontSize: isError ? '15px' : '20px',
            fontWeight: isError ? '400' : '600',
            width: 'auto',
            maxWidth: '515px',
            margin: bigMargin ? '5px auto 0 auto' : '0px',
            textAlign: 'center'
            /*whiteSpace: 'pre'*/
         }}
      >
         {text}
      </div>
   );
};

InlineMessage.propTypes = {
   isError: PropTypes.bool.isRequired,
   bigMargin: PropTypes.bool,
   text: PropTypes.string.isRequired
};

export default withTheme()(InlineMessage);
