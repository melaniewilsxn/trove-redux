import React from 'react';
import { Button, Form, Grid, Header, Image, Segment, GridColumn } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';

function LoginForm({ setShowLogin, onLogin }) {
    const navigate = useNavigate();

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
        validateOnBlur: false,
        validateOnChange: false,
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
                        navigate('/');
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
                    <Image src='/trove.png' size="massive" />
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
                            error={
                                formik.submitCount > 0 && formik.errors.username ? {
                                    content: formik.errors.username,
                                    pointing: 'below',
                                } : null
                            }
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            error={
                                formik.submitCount > 0 && formik.errors.password ? {
                                    content: formik.errors.password,
                                    pointing: 'below',
                                } : null
                            }
                        />
                        <Button fluid size='large' type="submit" disabled={formik.isSubmitting}>
                            Login
                        </Button>
                        {formik.errors.general && (
                            <div style={{ color: 'red', marginTop: '10px' }}>{formik.errors.general}</div>
                        )}
                    </Segment>
                </Form>
                <Segment inverted>
                    New to us? <span onClick={() => setShowLogin(false)} style={{color: '#2185d0', cursor: 'pointer'}}>Sign Up</span>
                </Segment>
            </GridColumn>
        </Grid>
    );
}

export default LoginForm;