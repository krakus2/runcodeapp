import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme({
    typography: {
        useNextVariants: true
    }
});

const InlineMessage = ({ text, isError, bigMargin, small }) => (
    <div
        style={{
            color: isError ? defaultTheme.palette.error.main : defaultTheme.palette.primary.main,
            fontSize: small ? '13px' : '14px',
            width: 'auto',
            maxWidth: '450px',
            margin: bigMargin ? '5px auto 0 auto' : '0',
            textAlign: 'center',
            whiteSpace: 'pre'
        }}
    >
        {text}
    </div>
);

InlineMessage.propTypes = {
    isError: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
};

export default InlineMessage;
