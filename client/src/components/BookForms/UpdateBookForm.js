import React, { useEffect, useState } from 'react';
import { Segment, Header, Form, Button, FormGroup, FormInput, FormTextArea, FormSelect } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function UpdateBookForm({ book, setBook, setOpenEdit }) {
    const [genreList, setGenreList] = useState([]);

    useEffect(() => {
        fetch('/genres')
        .then(r => r.json())
        .then(genres => setGenreList(genres.map(genre => ({
            key: genre.id, 
            text: genre.name, 
            value: genre.id,
        }))));
    }, []);

    const updateBookSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        author: Yup.string().required('Author is required'),
        publicationYear: Yup.number().required('Publication year is required').positive().integer(),
        genre: Yup.string().required('Genre is required'),
        summary: Yup.string(),
        coverImageURL: Yup.string().url('Invalid URL').required('Cover Image URL is required')
    })

    const formik = useFormik({
        initialValues: {
            title: book.title,
            author: book.author,
            publicationYear: book.publication_year,
            summary: book.summary,
            coverImageURL: book.cover_image_url,
            genre: book.genre.id,
        },
        validationSchema: updateBookSchema,
        onSubmit: (values) => {
            fetch(`/books/${book.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: values.title,
                    author: values.author,
                    publication_year: values.publicationYear,
                    genre_id: values.genre,
                    summary: values.summary,
                    cover_image_url: values.coverImageURL,
                }),
            }).then(r => {
                if (r.ok) {
                    r.json().then(updatedBook => {
                        setBook(updatedBook);
                        alert("Book updated successfully!");
                        setOpenEdit(false);
                    });
                } else {
                    r.json().then(err => formik.setErrors({ server: err.error }));
                }
            });
        }
    });

    return (
        <Segment>
            <Form onSubmit={formik.handleSubmit}>
                <Header textAlign='center'>Update book:</Header>
                <FormGroup>
                    <FormInput
                        fluid
                        label='Title'
                        placeholder='Title'
                        width={6}
                        {...formik.getFieldProps('title')}
                    />
                    <FormInput
                        fluid
                        label='Author'
                        placeholder='Author'
                        width={5}
                        {...formik.getFieldProps('author')}
                    />
                    <FormInput
                        fluid
                        label='Publication Year'
                        placeholder='Year'
                        width={2}
                        {...formik.getFieldProps('publicationYear')}
                        onChange={(e) => formik.setFieldValue('publicationYear', parseInt(e.target.value))}
                    />
                    <FormSelect
                        fluid
                        label='Genre'
                        width={3}
                        options={genreList}
                        {...formik.getFieldProps('genre')}
                    />
                </FormGroup>
                <FormTextArea
                    label='Summary'
                    placeholder='Tell us more about the book...'
                    {...formik.getFieldProps('summary')}
                />
                <FormInput
                    fluid
                    label='Cover Image URL'
                    placeholder='Cover Image URL'
                    {...formik.getFieldProps('coverImageURL')}
                />
                <Button type="submit">Update</Button>
            </Form>
            {formik.errors.server &&
                <div style={{ color: '#cc0000', marginTop: '10px' }}>{formik.errors.server}</div>
            }
        </Segment>
    );
}

export default UpdateBookForm;