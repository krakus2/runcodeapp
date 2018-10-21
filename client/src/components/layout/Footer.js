import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { FooterWrapper } from '../../styles/layout/Footer';

const styles = {
   root: {
      flexGrow: 1
   }
};

function Footer(props) {
   const { classes } = props;

   return (
      <FooterWrapper>
         <div className={classes.root}>
            <AppBar position="static" color="default">
               <Toolbar>
                  <Typography variant="h6" color="inherit">
                     Footer
                  </Typography>
               </Toolbar>
            </AppBar>
         </div>
      </FooterWrapper>
   );
}

Footer.propTypes = {
   classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
