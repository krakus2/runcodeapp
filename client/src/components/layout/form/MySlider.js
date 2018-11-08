import React from "react";
import PropTypes from "prop-types";
import { Slider } from "antd";
import { SliderWrapper } from "../../../styles/layout/Landing";
import Typography from "@material-ui/core/Typography";

const MySlider = ({ handleSliderChange, iloscArg, max }) => {
    return (
        <SliderWrapper>
            <Typography variant="h6">Liczba i typ argumentów funkcji</Typography>
            <Typography variant="body2" gutterBottom>
                Określ liczbę i typy parametrów wymaganych przez funkcję.
            </Typography>
            <Slider min={0} max={max} dots value={iloscArg} onChange={handleSliderChange} />
        </SliderWrapper>
    );
};

MySlider.propTypes = {
    handleSliderChange: PropTypes.func.isRequired,
    iloscArg: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
};

export default MySlider;
