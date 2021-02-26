// fronntend/src/container/auth/RegisterView/index.js

import React, { Component } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { register } from '../../../actions/auth'
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormHelperText,
    Link,
    TextField,
    Typography,
    makeStyles
  } from '@material-ui/core';

import Page from '../../../components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

let RegisterView = (props) => {
  const classes = useStyles();
  // const navigate = useNavigate();

  const renderTextField = ({
      input,
      label,
      type,
      meta : { touched, invalid, error},
      ...custom
  }) => {
      // console.log('renderTextField', input, custom);
      return (<TextField
          label={label}
          placeholder={label}
          error={touched && invalid}
          helperText={touched && invalid}
          type={type}
          {...input}
          {...custom}
      /> )
  }

  const onSubmit = formValues => {
    props.register(formValues);
  }
  // if(props.isAuthenticated){
  //   return <Redirect to='/'/>;
  // }
  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">

              <form onSubmit={props.handleSubmit(onSubmit)}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <Field
                    name="nickname"
                    type="text"
                    fullWidth        
                    label="Nickname"                            
                    margin="normal" 
                    variant="outlined"
                    helperText="Input Nickname"
                    validate={[required, minLength3, maxLength15]}
                    component={renderTextField}                            
                />
                <Field
                    name="email"
                    type="text"
                    fullWidth        
                    label="E-mail"                            
                    margin="normal" 
                    variant="outlined"
                    helperText="Input E-mail"
                    validate={required}
                    component={renderTextField}                            
                />
                <Field
                    name="password"
                    type="password"
                    fullWidth
                    label="Password"
                    margin="normal"
                    variant="outlined"
                    helperText="Input Password"
                    validate={required}
                    component={renderTextField}                            
                /> 
                <Field
                    name="password2"
                    type="password"
                    fullWidth
                    label="Confirm Password"
                    margin="normal"
                    variant="outlined"
                    helperText="Confirm Password"
                    validate={[required, passwordsMatch]}
                    component={renderTextField}                            
                />                 
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
          
        </Container>
      </Box>
    </Page>
  );
};

const required = value => (value ? undefined : 'Required')
const minLength = min => value => 
  value && value.length < min 
    ? `Must be at least $(min) characters`
    : undefined;

const minLength3 = minLength(3)

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less`: undefined;

const maxLength15 = maxLength(15)

const passwordsMatch = (value, allValues) => 
  value !== allValues.password ? 'Password do not match' : undefined;
  
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

RegisterView = connect(
  mapStateToProps,
  {register}
)(RegisterView);

export default reduxForm({
  form: 'registerView'
})(RegisterView)
  