import React from 'react';
import { Segment, Form, Header, FormInput, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function CreateLibraryForm({ libraryList, setLibraryList, setOpen }) {
    const formik = useFormik({
        initialValues: {
            libraryName: ''
        },
        validationSchema: Yup.object({
            libraryName: Yup.string()
                .required('The library name is required.')
        }),
        onSubmit: (values, { setErrors }) => {
            fetch("/libraries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values),
            }).then((response) => {
                if (response.ok) {
                    response.json().then((newLibrary) => {
                        setLibraryList([...libraryList, newLibrary]);
                        setOpen(false);
                    });
                } else {
                    response.json().then((err) => setErrors({ server: err.error }));
                }
            });
        }
    });

    return (
        <Segment textAlign='center'>
            <Form onSubmit={formik.handleSubmit}>
                <Header>Give your library a name</Header>
                <FormInput
                    placeholder='Library Name'
                    name='libraryName'
                    onChange={formik.handleChange}
                    value={formik.values.libraryName}
                />
                <Button type="submit">Create</Button>
            </Form>
            {formik.errors.server ? 
                <div style={{ color: '#cc0000', marginTop: '10px' }}>{formik.errors.server}</div>
            : null}
            {formik.errors.libraryName ? (
                <div style={{ color: '#cc0000', marginTop: '10px' }}>{formik.errors.libraryName}</div>
            ) : null}
        </Segment>
    );
}

export default CreateLibraryForm;