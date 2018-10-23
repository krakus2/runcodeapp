import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ButtonWrapper } from '../../../styles/layout/Landing';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
   button: {
      margin: theme.spacing.unit,
      fontSize: '16px',
      width: '125px'
   },
   tooltip: {
      fontSize: theme.spacing.tooltipSize
   }
});

const Submit = ({ isInvalid, loading, onSubmitClick, classes }) => (
   <ButtonWrapper>
      {isInvalid ? (
         <Tooltip
            title="Wypełnij wszystkie obowiązkowe pola, aby przesłać zadanie"
            classes={{ tooltip: classes.tooltip }}
            TransitionComponent={Zoom}
            placement="bottom"
         >
            <div>
               <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  size="large"
                  type="submit"
                  disabled
                  onClick={onSubmitClick}
               >
                  {loading ? (
                     <Fade
                        in={loading}
                        style={{
                           transitionDelay: loading ? '200ms' : '0ms'
                        }}
                        unmountOnExit
                     >
                        <CircularProgress color="inherit" size={24} />
                     </Fade>
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
               <Fade
                  in={loading}
                  style={{
                     transitionDelay: loading ? '200ms' : '0ms'
                  }}
                  unmountOnExit
               >
                  <CircularProgress color="inherit" size={24} />
               </Fade>
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
