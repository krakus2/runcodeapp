import React, { Component } from "react";
import PropTypes from "prop-types";
import { GridWrapper } from "../../../styles/layout/Landing";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import "../../../styles/form/ResultRow.css";

const styles = theme => ({
    textField2: {
        marginLeft: theme.spacing.unit,
        marginTop: "5px",
        marginBottom: "5px",
        minWidth: "60px"
    },
    textField3: {
        marginLeft: theme.spacing.unit,
        marginTop: "5px",
        marginBottom: "5px",
        minWidth: "70px"
    },
    TheInput2: {
        fontSize: 14,
        padding: "10px 5px"
    },
    TheLabel2: {
        fontSize: 14,
        fontWeight: 400,
        transform: "translate(14px, 14px) scale(1)"
    },
    TheLabel3: {
        fontSize: 14,
        fontWeight: 400,
        transform: "translate(12px, 14px) scale(1)"
    },
    tooltip: {
        fontSize: theme.spacing.tooltipSize
    }
});

class ResultRow extends Component {
    generateGrid = number => {
        const array = [];
        for (let i = 0; i < number; i++) {
            array.push("70px");
        }
        return array.join(" ");
    };

    generateLabel = (i, iloscArg) => {
        const object = {};
        if (i === 0 && iloscArg === 0) {
            object.label = "Wynik";
        } else if ((i + 1) % (iloscArg + 1) === 0 && i !== 0) {
            object.label = "Wynik";
        } else {
            object.label = `Arg ${i % (iloscArg + 1)}`;
        }
        return object;
    };

    /*getKey() {
      return this.keyCount++;
   }*/

    render() {
        const {
            handleWynikiChange,
            iloscWynikow,
            iloscArg,
            wyniki,
            indeksyTablic,
            classes
        } = this.props;
        const fieldsArray = [];

        for (var i = 0; i < iloscWynikow * (iloscArg + 1); i++) {
            if (indeksyTablic.some(el => el === i)) {
                fieldsArray.push(
                    <Tooltip
                        title="Wartości tablicy oddziel przecinkami"
                        classes={{ tooltip: classes.tooltip }}
                        TransitionComponent={Zoom}
                        placement="top"
                    >
                        <div className="array" key={i}>
                            <TextField
                                {...this.generateLabel(i, iloscArg)}
                                placeholder="Zadanie 10"
                                type="text"
                                className={classes.textField2}
                                InputProps={{ classes: { input: classes.TheInput2 } }}
                                InputLabelProps={{
                                    classes: {
                                        root:
                                            (i + 1) % (iloscArg + 1) === 0
                                                ? classes.TheLabel3
                                                : classes.TheLabel2
                                    }
                                }}
                                value={wyniki[i] != undefined ? wyniki[i] : ""}
                                onChange={handleWynikiChange(i)}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                    </Tooltip>
                );
            } else {
                fieldsArray.push(
                    <div key={i}>
                        <TextField
                            {...this.generateLabel(i, iloscArg)}
                            placeholder="Zadanie 10"
                            type="text"
                            className={classes.textField2}
                            InputProps={{ classes: { input: classes.TheInput2 } }}
                            InputLabelProps={{
                                classes: {
                                    root:
                                        (i + 1) % (iloscArg + 1) === 0
                                            ? classes.TheLabel3
                                            : classes.TheLabel2
                                }
                            }}
                            value={wyniki[i] != undefined ? wyniki[i] : ""}
                            onChange={handleWynikiChange(i)}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                );
            }
        }

        return <GridWrapper grid={this.generateGrid(iloscArg + 1)}>{fieldsArray}</GridWrapper>;
    }
}

ResultRow.propTypes = {
    classes: PropTypes.object.isRequired,
    handleWynikiChange: PropTypes.func.isRequired,
    iloscWynikow: PropTypes.number.isRequired,
    iloscArg: PropTypes.number.isRequired,
    wyniki: PropTypes.array.isRequired
};

export default withStyles(styles)(ResultRow);
