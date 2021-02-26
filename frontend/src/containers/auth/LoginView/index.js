// fronntend/src/container/auth/LoginView/index.js

import React, { Component } from 'react'
// import { Link as RouterLink, Redirect } from 'react-router-dom';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { login } from '../../../actions/auth'
import {
    Box,
    Button,
    Container,
    Grid,
    Link,
    TextField,
    Typography,
    makeStyles
  } from '@material-ui/core';

//   import FacebookIcon from '../../../icons/Facebook';
//   import GoogleIcon from '../../../icons/Google';
  import Page from '../../../components/Page';
// import { ErrorMessage } from 'formik'
  
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      height: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
  }));



let LoginView = (props) => {
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

    
    const onSubmit = (formValues) => {
        props.login(formValues);
    }
    const classes = useStyles();
    

    return (
        <Page
            className={classes.root}
            title="Login"
        >
            <Box
                display="flex"
                flexDirection="column"
                height="100%"
                justifyContent="center"                
            >
                <Container maxWidth="sm">
                    <form
                        onSubmit={props.handleSubmit(onSubmit)}
                    >
                        <Box mb={3}>
                            <Typography
                                color="textPrimary"
                                variant="h2"
                            >
                                Sign in
                            </Typography>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                Sign in on the internal platform
                            </Typography>
                        </Box>
                        <Field
                            name="email"
                            type="text"
                            fullWidth        
                            label="E-mail"                            
                            margin="normal" 
                            variant="outlined"
                            helperText="Input E-mail"
                            value={""}
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
                            value={""}
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
                                Sign in now
                            </Button>
                        </Box>
                        <Typography
                            color="textSecondary"
                            variant="body1"
                        >
                            Don&apos;t have an account?
                        {' '}
                        <Link
                            component={RouterLink}
                            to="/register"
                            variant="h6"
                        >
                            Sign up
                        </Link>
                        </Typography>
                    </form>
                </Container>
            </Box>


        </Page>
    )    
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

LoginView = connect(
    mapStateToProps,
    {login}
)(LoginView);

export default reduxForm({
    form: 'loginView'
})(LoginView)