import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import withContext from '../../../context/Context_HOC';
import AddRemoveButtons from './AddRemoveButtons';
import { GridWrapper, RowWrapper } from '../../../styles/layout/Landing';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '../../utils/Tooltip';
import Typography from '@material-ui/core/Typography';
import '../../../styles/form/WynikiRow.css';

const styles = theme => ({
   textField2: {
      marginLeft: theme.spacing.unit,
      marginTop: '5px',
      marginBottom: '5px',
      minWidth: '60px'
   },
   textField3: {
      marginLeft: theme.spacing.unit,
      marginTop: '5px',
      marginBottom: '5px',
      minWidth: '70px'
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
   /*    tooltip: {
      fontSize: theme.spacing.tooltipSize
   } */
});

class Testy extends Component {
   generateGrid = number => {
      const array = [];
      for (let i = 0; i < number; i++) {
         array.push('70px');
      }
      return array.join(' ');
   };

   generateLabel = (i, iloscArg) => {
      const object = {};
      if (i === 0 && iloscArg === 0) {
         object.label = 'Wynik';
      } else if ((i + 1) % (iloscArg + 1) === 0 && i !== 0) {
         object.label = 'Wynik';
      } else {
         object.label = `Arg ${(i % (iloscArg + 1)) + 1}`;
      }
      return object;
   };

   render() {
      const {
         handleWynikiChange,
         zmienIloscWynikow,
         iloscWynikow,
         iloscArg,
         wyniki,
         indeksyTablic,
         classes,
         context
      } = this.props;
      const fieldsArray = [];

      for (var i = 0; i < iloscWynikow * (iloscArg + 1); i++) {
         if (indeksyTablic.some(el => el === i)) {
            fieldsArray.push(
               <Tooltip key={i} title="Wartości tablicy oddziel przecinkami">
                  <div className="array" key={i}>
                     <TextField
                        key={i}
                        {...this.generateLabel(i, iloscArg)}
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
                        value={wyniki[i] != undefined ? wyniki[i] : ''}
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
                     key={i}
                     {...this.generateLabel(i, iloscArg)}
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
                     value={wyniki[i] != undefined ? wyniki[i] : ''}
                     onChange={handleWynikiChange(i)}
                     margin="normal"
                     variant="outlined"
                  />
               </div>
            );
         }
      }

      return (
         <>
            <RowWrapper column leftMargin>
               <Typography variant="h6">Zestawy testów i wartość zwracana</Typography>
               <Typography variant="caption" gutterBottom>
                  Zdefiniuj testy. Podaj wartości parametrów wywołania funkcji oraz
                  wartość zwracaną przez funkcję dla tych parametrów.
               </Typography>
            </RowWrapper>
            <GridWrapper
               isMobile={context.isMobile}
               grid={this.generateGrid(iloscArg + 1)}
            >
               {fieldsArray}
            </GridWrapper>
            <AddRemoveButtons
               zmienIloscWynikow={zmienIloscWynikow}
               iloscWynikow={iloscWynikow}
            />
         </>
      );
   }
}

Testy.propTypes = {
   classes: PropTypes.object.isRequired,
   handleWynikiChange: PropTypes.func.isRequired,
   iloscWynikow: PropTypes.number.isRequired,
   iloscArg: PropTypes.number.isRequired,
   wyniki: PropTypes.array.isRequired
};

const withCompose = compose(
   withStyles(styles),
   withContext
);

export default withCompose(Testy);
