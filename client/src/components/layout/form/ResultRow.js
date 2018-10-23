import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridWrapper } from '../../../styles/layout/Landing';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
   textField2: {
      marginLeft: theme.spacing.unit,
      marginTop: '5px',
      marginBottom: '5px',
      width: '60px'
   },
   textField3: {
      marginLeft: theme.spacing.unit,
      marginTop: '5px',
      marginBottom: '5px',
      width: '70px'
   },
   TheInput2: {
      fontSize: 14,
      padding: '10px 5px'
   },
   TheLabel2: {
      fontSize: 14,
      fontWeight: 400,
      transform: 'translate(14px, 14px) scale(1)'
   },
   TheLabel3: {
      fontSize: 14,
      fontWeight: 400,
      transform: 'translate(12px, 14px) scale(1)'
   }
});

class ResultRow extends Component {
   generateGrid = number => {
      const array = [];
      for (let i = 0; i < number; i++) {
         array.push('60px');
      }
      return array.join(' ');
   };

   generateLabel = (i, iloscArg) => {
      const object = {};
      if ((i + 1) % (iloscArg + 1) === 0 && i !== 0) {
         object.label = 'Wynik';
      } else {
         object.label = `Arg ${i % (iloscArg + 1)}`;
      }
      return object;
   };

   getKey() {
      return this.keyCount++;
   }

   render() {
      const { handleWynikiChange, iloscWynikow, iloscArg, wyniki, classes } = this.props;
      const fieldsArray = [];

      for (var i = 0; i < iloscWynikow * (iloscArg + 1); i++) {
         fieldsArray.push(
            <TextField
               key={i}
               {...this.generateLabel(i, iloscArg)}
               placeholder="Zadanie 10"
               type="text"
               className={classes.textField2}
               InputProps={{ classes: { input: classes.TheInput2 } }}
               InputLabelProps={{
                  classes: {
                     root: (i + 1) % (iloscArg + 1) === 0 ? classes.TheLabel3 : classes.TheLabel2
                  }
               }}
               value={wyniki[i] != undefined ? wyniki[i] : ''}
               onChange={handleWynikiChange(i)}
               margin="normal"
               variant="outlined"
            />
         );
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
