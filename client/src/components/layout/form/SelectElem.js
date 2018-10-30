import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        width: 'auto',
        display: 'flex',
        flexDirection: 'row'
    },
    select: {
        minWidth: 120,
        paddingRight: 40
    }
});

class SelectElem extends Component {
    state = {
        labelWidth: 100
    };
    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
        });
    }
    render() {
        const {
            i,
            handleArgTypeChange,
            args,
            argsName,
            secondColumn,
            values,
            title,
            classes
        } = this.props;
        const { labelWidth } = this.state;
        let conditionalValue;
        if (secondColumn === true) {
            if (args[i * 2 + 1] === null || args[i * 2 + 1] === undefined) {
                conditionalValue = '';
            } else {
                conditionalValue = args[i * 2 + 1];
            }
        } else {
            if (args[i * 2 + 1] === null || args[i * 2] === undefined) {
                conditionalValue = '';
            } else {
                conditionalValue = args[i * 2];
            }
        }
        return (
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                    ref={ref => {
                        this.InputLabelRef = ref;
                    }}
                    htmlFor="outlined-age-simple"
                >
                    {`${title}`}
                </InputLabel>
                <Select
                    classes={{ outlined: classes.select }}
                    value={conditionalValue}
                    onChange={handleArgTypeChange(i)(secondColumn === true ? 1 : 0)(argsName)}
                    input={<OutlinedInput labelWidth={labelWidth} name="typ1" />}
                >
                    {values.map((elem, i) => (
                        <MenuItem value={elem} key={elem}>
                            {`${elem}`}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}

SelectElem.propTypes = {
    classes: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired,
    handleArgTypeChange: PropTypes.func.isRequired,
    args: PropTypes.array.isRequired,
    argsName: PropTypes.string.isRequired,
    secondColumn: PropTypes.bool.isRequired,
    values: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
};

export default withStyles(styles)(SelectElem);
