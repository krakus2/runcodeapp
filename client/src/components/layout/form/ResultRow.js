import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RowWrapper } from '../../../styles/layout/Landing';
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
   }
});

class ResultRow extends Component {
   constructor(props) {
      super(props);

      this.keyCount = 0;
   }

   getKey() {
      return this.keyCount++;
   }

   render() {
      const { handleWynikiChange, iloscWynikow, iloscArg, wyniki, classes } = this.props;
      return (
         <React.Fragment>
            {Array.from(Array(iloscWynikow)).map((elem, i) => (
               <RowWrapper key={this.getKey()}>
                  {Array.from(Array(iloscArg)).map((elem, j) => {
                     const object = {};
                     if (i === 0) {
                        object.value = wyniki[j * i + j];
                     } else {
                        // prettier-ignore
                        object.value = wyniki[(iloscArg+1)*i + j];
                     }
                     return (
                        <TextField
                           key={this.getKey()}
                           id={`Arg ${2 * i + j}`}
                           label={`Arg ${j + 1}`}
                           placeholder="Zadanie 10"
                           type="text"
                           className={classes.textField2}
                           InputProps={{ classes: { input: classes.TheInput2 } }}
                           InputLabelProps={{ classes: { root: classes.TheLabel2 } }}
                           {...object}
                           onChange={handleWynikiChange(i)(j)(false)}
                           margin="normal"
                           variant="outlined"
                        />
                     );
                  })}
                  <TextField
                     id={`Wynik ${i}`}
                     label={`Wynik ${i + 1}`}
                     placeholder="Zadanie 10"
                     type="text"
                     className={classes.textField3}
                     InputProps={{ classes: { input: classes.TheInput2 } }}
                     InputLabelProps={{ classes: { root: classes.TheLabel2 } }}
                     value={wyniki[(i + 1) * (iloscArg + 1) - 1]}
                     onChange={handleWynikiChange(i)()(true)}
                     margin="normal"
                     variant="outlined"
                  />
               </RowWrapper>
            ))}
         </React.Fragment>
      );
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
