import React from 'react';
import { Button, Form, Grid, Header, Image, Segment, GridColumn } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';

function LoginForm({ setShowLogin, onLogin }) {
    const history = useHistory();

    const loginSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((r) => {
                if (r.ok) {
                    r.json().then((user) => {
                        onLogin(user);
                        history.push('/');
                    });
                } else {
                    r.json().then((err) => {
                        formik.setFieldError('general', err.error);
                    });
                }
                formik.setSubmitting(false);
            });
        }
    });

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <GridColumn style={{ maxWidth: 450 }}>
                <Segment inverted>
                    <Image src='http://localhost:3000/trove.png' size="massive" />
                    <Header as="h2" textAlign='center'>
                        Log-in to your account
                    </Header>
                </Segment>
                <Form size='large' onSubmit={formik.handleSubmit}>
                    <Segment stacked inverted>
                        <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='Username'
                            name="username"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                        />
                        {formik.errors.username && (
                            <p style={{ color: "red" }}>{formik.errors.username}</p>
                        )}
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.errors.password && (
                            <p style={{ color: "red" }}>{formik.errors.password}</p>
                        )}
                        <Button fluid size='large' type="submit" disabled={formik.isSubmitting}>
                            Login
                        </Button>
                        {formik.errors.general && (
                            <div style={{ color: '#cc0000', marginTop: '10px' }}>{formik.errors.general}</div>
                        )}
                    </Segment>
                </Form>
                <Segment inverted>
                    New to us? <a href='#' onClick={() => setShowLogin(false)}>Sign Up</a>
                </Segment>
            </GridColumn>
        </Grid>
    );
}

export default LoginForm;