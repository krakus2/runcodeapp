import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import withContext from '../../context/Context_HOC';
import { validateEmail } from '../../utils/utils.js';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { HeaderWrapper, FormWrapper, MyAppBar, Title } from '../../styles/layout/Header';
import InlineMessage from '../utils/InlineMessage';

const styles = theme => ({
   AppBar: {
      margin: '5px'
   },
   textField: {
      marginRight: theme.spacing.unit,
      marginLeft: theme.spacing.unit,
      width: '200px'
   },
   TheInput: {
      fontSize: 14,
      padding: '10px 5px'
   },
   TheLabel: {
      fontSize: 14,
      fontWeight: 400,
      transform: 'translate(14px, 13px) scale(1)'
   },
   TheHelper: {
      fontSize: 11,
      marginLeft: 0
   },
   button: {
      margin: theme.spacing.unit,
      marginTop: 15
   }
});

class Header extends Component {
   state = {
      email: '',
      password: '',
      emailErr: false,
      passwordErr: false,
      loginErr: false
   };

   handleChange = name => event => {
      this.setState({
         [name]: event.target.value
      });
   };

   onSubmit = e => {
      e.preventDefault();
      console.log('submit');
      let { email, password } = this.state;
      if (!validateEmail(email)) {
         this.setState({ emailErr: true });
      } else {
         this.setState({ emailErr: false });
      }
      if (password.length === 0) {
         this.setState({ passwordErr: true });
      } else {
         this.setState({ passwordErr: false });
      }
   };

   render() {
      const { classes, context } = this.props;
      const { email, emailErr, loginErr, password, passwordErr } = this.state;
      return (
         <MyAppBar /*position="static" color="secondary"*/>
            <HeaderWrapper isMobile={context.isMobile}>
               <Title isMobile={context.isMobile}>RUNCODE</Title>
               <FormWrapper
                  error={emailErr || passwordErr || loginErr}
                  onSubmit={this.onSubmit}
                  isMobile={context.isMobile}
               >
                  <TextField
                     id="email"
                     label="Adres email"
                     type="text"
                     placeholder="example@example.com"
                     error={emailErr ? true : false}
                     helperText={emailErr ? 'To nie wygląda na email' : ''}
                     className={classes.textField}
                     InputProps={{ classes: { input: classes.TheInput } }}
                     InputLabelProps={{ classes: { root: classes.TheLabel } }}
                     FormHelperTextProps={{
                        classes: { root: classes.TheHelper }
                     }}
                     value={email}
                     onChange={this.handleChange('email')}
                     margin="normal"
                     variant="outlined"
                     disabled
                  />
                  <TextField
                     id="haslo"
                     label="Hasło"
                     type="password"
                     error={passwordErr}
                     helperText={passwordErr ? 'Wprowadź hasło' : ''}
                     className={classes.textField}
                     InputProps={{ classes: { input: classes.TheInput } }}
                     InputLabelProps={{ classes: { root: classes.TheLabel } }}
                     FormHelperTextProps={{
                        classes: { root: classes.TheHelper }
                     }}
                     value={password}
                     onChange={this.handleChange('password')}
                     margin="normal"
                     variant="outlined"
                     disabled
                  />
                  <Button
                     variant="contained"
                     color="secondary"
                     type="submit"
                     className={classes.button}
                     disabled
                  >
                     Zaloguj
                  </Button>
                  {loginErr && (
                     <InlineMessage
                        isError={true}
                        text={'Nie udało się zalogować. Spróbuj ponownie'}
                        bigMargin={false}
                        small={true}
                     />
                  )}
               </FormWrapper>
            </HeaderWrapper>
         </MyAppBar>
      );
   }
}

Header.propTypes = {
   classes: PropTypes.object.isRequired
};

const withCompose = compose(
   withStyles(styles),
   withContext
);

export default withCompose(Header);
