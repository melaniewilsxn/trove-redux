import React, { useState, useEffect } from 'react';
import { Segment, Header, Form, Button, Select } from 'semantic-ui-react';
import { useFormik } from 'formik';

function AddBookToLibraryForm({ bookID, setOpen }) {
    const [libraryList, setLibraryList] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch("/libraries")
            .then((r) => r.json())
            .then(libraries => setLibraryList(libraries));
    }, []);

    const formik = useFormik({
        initialValues: {
            selectedLibraryID: '',
        },
        onSubmit: (values) => {
            fetch("/add_book_to_library", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    library_id: values.selectedLibraryID,
                    book_id: bookID,
                }),
            }).then((r) => {
                if (r.ok) {
                    console.log("Success!");
                    setOpen(false);
                } else {
                    r.json().then((err) => setError(err.error));
                }
            });
        }
    });

    const options = libraryList.map((library) => ({ 
        key: library.id, 
        text: library.name, 
        value: library.id 
    }));

    return (
        <Segment textAlign='center'>
            <Form onSubmit={formik.handleSubmit}>
                <Header>Add to library</Header>
                <Select
                    fluid
                    options={options}
                    placeholder='Select a Library'
                    name='selectedLibraryID'
                    onChange={(e, { value }) => formik.setFieldValue('selectedLibraryID', value)}
                    value={formik.values.selectedLibraryID}
                    style={{ marginBottom: '10px' }}
                />
                <Button type="submit">Done</Button>
            </Form>
            {error && 
                <div style={{ color: '#cc0000', marginTop: '10px'}}>{error}</div>
            }
        </Segment>
    );
}

export default AddBookToLibraryForm;