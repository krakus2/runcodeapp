import React from "react";
import { RowWrapper } from "../../../styles/layout/Landing.js";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export default function Rekurencja({ czyRekurencja, handleSwitchChange }) {
    return (
        <>
            <RowWrapper>
                <Typography variant="h6">Zadanie wymaga rozwiązania rekurencyjnego</Typography>
            </RowWrapper>
            <RowWrapper leftMargin={true}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={czyRekurencja}
                            onChange={handleSwitchChange("czyRekurencja")}
                            value="czyRekurencja"
                            color="primary"
                        />
                    }
                />
            </RowWrapper>
        </>
    );
}
