import React from "react";
import PropTypes from "prop-types";
import { createMuiTheme } from "@material-ui/core/styles";

const defaultTheme = createMuiTheme({
    typography: {
        useNextVariants: true
    }
});

const InlineMessage = ({ text, isError, bigMargin }) => (
    <div
        style={{
            color: isError ? defaultTheme.palette.error.main : defaultTheme.palette.primary.main,
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

export default InlineMessage;
