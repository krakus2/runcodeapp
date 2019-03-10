import React from 'react';
import PropTypes from 'prop-types';
import { RowWrapper } from '../../../styles/layout/Landing';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Tooltip from '../../utils/Tooltip';

const styles = theme => ({
   button2: {
      margin: theme.spacing.unit,
      color: 'white'
   }
});

const AddRemoveButtons = ({ zmienIloscWynikow, iloscWynikow, classes }) => (
   <RowWrapper>
      <Tooltip title={'Dodaj wiersz'}>
         <Button
            variant="fab"
            mini
            color="primary"
            aria-label="Add"
            className={classes.button2}
            onClick={zmienIloscWynikow('+')}
         >
            <AddIcon />
         </Button>
      </Tooltip>
      <Tooltip title="Usuń wiersz">
         <Button
            variant="fab"
            mini
            color="primary"
            aria-label="Delete"
            className={classes.button2}
            onClick={zmienIloscWynikow('-')}
            disabled={iloscWynikow === 1}
         >
            <RemoveIcon />
         </Button>
      </Tooltip>
   </RowWrapper>
);

AddRemoveButtons.propTypes = {
   classes: PropTypes.object.isRequired,
   zmienIloscWynikow: PropTypes.func.isRequired
};

export default withStyles(styles)(AddRemoveButtons);
