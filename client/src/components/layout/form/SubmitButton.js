import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Tooltip from '../../utils/Tooltip';
import { ButtonWrapper } from '../../../styles/layout/Landing';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
   button: {
      margin: theme.spacing.unit,
      fontSize: '16px',
      width: '125px'
   }
});

const Submit = ({ isInvalid, loading, onSubmitClick, classes, isMobile }) => (
   <ButtonWrapper isMobile={isMobile}>
      {isInvalid ? (
         <Tooltip title="Wypełnij wszystkie obowiązkowe pola, aby przesłać zadanie">
            <div>
               <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  size="large"
                  type="submit"
                  disabled
                  onClick={onSubmitClick}
               >
                  {loading ? (
                     <div className="lds-ring">
                        <div />
                        <div />
                        <div />
                        <div />
                     </div>
                  ) : (
                     'Prześlij'
                  )}
               </Button>
            </div>
         </Tooltip>
      ) : (
         <Button
            variant="contained"
            color="primary"
            className={classes.button}
            size="large"
            type="submit"
            onClick={onSubmitClick}
         >
            {loading ? (
               <div className="lds-ring">
                  <div />
                  <div />
                  <div />
                  <div />
               </div>
            ) : (
               'Prześlij'
            )}
         </Button>
      )}
   </ButtonWrapper>
);

Submit.propTypes = {
   classes: PropTypes.object.isRequired,
   isInvalid: PropTypes.bool.isRequired
};

export default withStyles(styles)(Submit);
