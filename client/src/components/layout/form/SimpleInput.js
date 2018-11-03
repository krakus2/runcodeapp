import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: 5,
        marginBottom: 5,
        width: '100%'
    },
    textArea: {
        minHeight: 100
    },
    TheInput: {
        fontSize: 18
    },
    TheLabel: {
        fontSize: 18,
        fontWeight: 400
    },
    TheHelper: {
        fontSize: 11
    }
});

class SimpleInput extends Component {
    helperProps() {
        const object = {};
        if (this.props.helper) {
            object.FormHelperTextProps = {
                classes: { root: this.props.classes.TheHelper }
            };
            object.FormHelperTextProps.helperText = this.props.helper;
        }
        return object;
    }

    placeholderProps() {
        const object = {};
        if (this.props.placeholder) {
            object.placeholder = this.props.placeholder;
        }
        return object;
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.value === this.props.value) {
            return false;
        }
        return true;
    }

    render() {
        const { label, value, handleChange, error, errorSearcher, classes, multiline } = this.props;
        return (
            <>
                <TextField
                    label={label}
                    {...this.helperProps()}
                    {...this.placeholderProps()}
                    type="text"
                    multiline={multiline}
                    error={error.types && error.types.some(elem => elem === errorSearcher)}
                    className={classes.textField}
                    InputProps={{ classes: { input: this.props.classes.TheInput } }}
                    InputLabelProps={{ classes: { root: classes.TheLabel } }}
                    value={value}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                />
                <SimpleInput
                    label="Opis zadania"
                    multiline={true}
                    error={this.state.error}
                    errorSearcher="OpisZadania"
                    value={this.state.opisZadania}
                    handleChange={this.handleTextInputChange('opisZadania')}
                />
            </>
        );
    }
}

SimpleInput.defaultProps = {
    multiline: false
};

SimpleInput.propTypes = {
    handleChange: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    errorSearcher: PropTypes.string.isRequired,
    helper: PropTypes.string,
    placeholder: PropTypes.string,
    multiline: PropTypes.bool,
    label: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleInput);
