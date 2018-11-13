import React from "react";
import PropTypes from "prop-types";
import { createMuiTheme } from "@material-ui/core/styles";
import { withTheme } from '@material-ui/core/styles';

const InlineMessage = ({ text, isError, bigMargin, theme }) => (
        <div
            style={{
                color: isError ? theme.palette.error.secondary : theme.palette.primary.secondary,
                fontSize: isError ? "14px" : "19px",
                fontWeight: isError ? "400" : "600",
                width: "auto",
                maxWidth: "515px",
                margin: bigMargin ? "5px auto 0 auto" : "0px",
                textAlign: "center",
                whiteSpace: "pre"
            }}
        >
            {text}
        </div>
);

InlineMessage.propTypes = {
    isError: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
};

export default withTheme(InlineMessage);
