import React from 'react';
import { Segment, Form, Header, FormInput, Button } from "semantic-ui-react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

function UpdateLibraryForm({ setOpenEdit, libraryID, setLibrary, library }) {
    const formik = useFormik({
        initialValues: {
            libraryName: library.name
        },
        validationSchema: Yup.object({
            libraryName: Yup.string().required('A library name is required')
        }),
        onSubmit: (values, { setErrors }) => {
            fetch(`/library/${libraryID}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: values.libraryName,
                }),
            }).then((response) => {
                if (response.ok) {
                    response.json().then((updatedLibrary) => {
                        setLibrary(updatedLibrary);
                        alert("Library updated successfully!");
                        setOpenEdit(false);
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
                <Header>Rename library</Header>
                <FormInput
                    fluid
                    placeholder='Library Name'
                    name="libraryName"
                    onChange={formik.handleChange}
                    value={formik.values.libraryName}
                />
                <Button type="submit">Done</Button>
            </Form>
            {formik.errors.server && 
                <div style={{ color: '#cc0000', marginTop: '10px' }}>{formik.errors.server}</div>
            }
            {formik.touched.libraryName && formik.errors.libraryName && (
                <div style={{ color: '#cc0000', marginTop: '10px' }}>{formik.errors.libraryName}</div>
            )}
        </Segment>
    );
}

export default UpdateLibraryForm;
