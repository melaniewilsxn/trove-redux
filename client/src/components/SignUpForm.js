import React from 'react';
import { Button, Form, Grid, Header, Image, Segment, GridColumn } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function SignUpForm({ setShowLogin, onLogin }){
  const signUpSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required').max(30),
    lastName: Yup.string().required('Last name is required').max(30),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    username: Yup.string().required('Username is required').max(30),
    password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/\d/, 'Password must contain a number')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[a-z]/, 'Password must contain a lowercase letter'),
  });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: ''
        },
        validationSchema: signUpSchema,
        onSubmit: (values) => {
            fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((r) => {
                if (r.ok) {
                    r.json().then((user) => onLogin(user));
                } else {
                  r.json().then((err) => {
                    formik.setFieldError('general', err.error);
                  });
                }
            });
        }
    });

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <GridColumn style={{ maxWidth: 450 }}>
                <Segment inverted>
                    <Image src='http://localhost:3000/trove.png' size="massive"/>
                    <Header as="h2" textAlign='center'>
                        Sign Up
                    </Header>
                </Segment>
                <Form size='large' onSubmit={formik.handleSubmit}>
                    <Segment stacked inverted>
                        <Form.Input fluid icon='chevron right' iconPosition='left' placeholder='First Name' 
                            name='firstName' 
                            onChange={formik.handleChange}
                            value={formik.values.firstName}/>
                          {formik.errors.firstName && (
                            <p style={{ color: "red" }}>{formik.errors.firstName}</p>
                          )}
                        <Form.Input fluid icon='chevron right' iconPosition='left' placeholder='Last Name'
                            name='lastName'
                            onChange={formik.handleChange}
                            value={formik.values.lastName}/>
                          {formik.errors.lastName && (
                            <p style={{ color: "red" }}>{formik.errors.lastName}</p>
                          )}
                        <Form.Input fluid icon='mail' iconPosition='left' placeholder='Email'
                            name='email'
                            onChange={formik.handleChange}
                            value={formik.values.email}/>
                          {formik.errors.email && (
                            <p style={{ color: "red" }}>{formik.errors.email}</p>
                          )}
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='Username'
                            name='username'
                            onChange={formik.handleChange}
                            value={formik.values.username}/>
                          {formik.errors.username && (
                            <p style={{ color: "red" }}>{formik.errors.username}</p>
                          )}
                        <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password'
                            name='password'
                            type='password'
                            onChange={formik.handleChange}
                            value={formik.values.password}/>
                          {formik.errors.password && (
                            <p style={{ color: "red" }}>{formik.errors.password}</p>
                          )}
                        <Button fluid size='large' type="submit">
                            Create Account
                        </Button>
                        {formik.errors.general && (
                            <div style={{ color: '#cc0000', marginTop: '10px' }}>{formik.errors.general}</div>
                        )}
                    </Segment>
                </Form>
                <Segment inverted>
                    Already have an account? <a href='#' onClick={() => setShowLogin(true)}>Login</a>
                </Segment>
            </GridColumn>
        </Grid>
    )
}

export default SignUpForm;