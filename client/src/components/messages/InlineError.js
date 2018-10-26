import React from "react";
import PropTypes from "prop-types";
import { createMuiTheme } from "@material-ui/core/styles";

const defaultTheme = createMuiTheme();

const InlineMessage = ({ text, isError }) => (
    <div
        style={{
            color: isError ? "#ae5856" : defaultTheme.palette.primary.main,
            fontSize: "14px",
            width: "auto",
            maxWidth: "450px",
            margin: "5px auto 0 auto",
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
