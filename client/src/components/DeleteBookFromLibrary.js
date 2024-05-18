import React, { useState, useEffect } from "react";
import { Segment, Form, Header, Button, Select } from "semantic-ui-react";
import { useFormik } from 'formik';

function DeleteBookFromLibrary({ bookID, setOpenRemove }) {
    const [libraryList, setLibraryList] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`/book/libraries/${bookID}`)
            .then((r) => r.json())
            .then(libraries => setLibraryList(libraries));
    }, []);

    const formik = useFormik({
        initialValues: {
            selectedLibraryID: '',
        },
        onSubmit: () => {
            fetch(`/delete_book_from_library/library/${formik.values.selectedLibraryID}/book/${bookID}`, {
                method: "DELETE",
            }).then((r) => {
                if (r.ok) {
                    alert("Book successfully deleted from library!");
                    setOpenRemove(false);
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
                <Header>Delete from Library</Header>
                <Select
                    fluid
                    selection
                    options={options}
                    placeholder='Select a Library'
                    name="selectedLibraryID"
                    onChange={(e, { value }) => formik.setFieldValue('selectedLibraryID', value)}
                    value={formik.values.selectedLibraryID}
                />
                <Button type="submit">Done</Button>
            </Form>
            {error && 
                <div style={{ color: '#cc0000', marginTop: '10px' }}>{error}</div>
            }
        </Segment>
    );
}

export default DeleteBookFromLibrary;