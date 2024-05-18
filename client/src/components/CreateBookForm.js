import React, { useEffect, useState } from "react";
import { Button, Segment, Form, FormGroup, FormInput, FormTextArea, Header, FormSelect } from "semantic-ui-react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

function CreateBookForm({ bookList, setBookList, setOpen, genreName }){
    const [genreList, setGenreList] = useState([]);

    useEffect(() => {
        fetch('/genres')
        .then(r => r.json())
        .then(genres => setGenreList(genres.map((genre) => ({
            key: genre.id, 
            text: genre.name, 
            value: genre.name,
        }))));
    }, []);

    const createBookScehma = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        author: Yup.string().required('Author is required'),
        publicationYear: Yup.number().required('Publication year is required').positive().integer(),
        genre: Yup.string().required('Genre is required'),
        summary: Yup.string(),
        coverImageURL: Yup.string().url('Invalid URL').required('Cover Image URL is required')
    })

    const formik = useFormik({
        initialValues: {
            title: '',
            author: '',
            publicationYear: '',
            genre: genreName || '',
            summary: '',
            coverImageURL: ''
        },
        validationSchema: createBookScehma,
        onSubmit: (values) => {
            fetch("/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values),
            }).then((r) => {
                if (r.ok) {
                    r.json().then((newBook) => {
                        setBookList([...bookList, newBook]);
                        setOpen(false);
                    });
                } else {
                    r.json().then((err) => formik.setErrors({ server: err.error }));
                }
            });
        }
    });

    return(
        <Segment>
            <Form onSubmit={formik.handleSubmit}>
                <Header textAlign='center'>Add new book:</Header>
                <FormGroup>
                    <FormInput 
                        fluid label='Title' 
                        placeholder='Title' 
                        width={6} 
                        {...formik.getFieldProps('title')}
                    />
                    <FormInput 
                        fluid label='Author' 
                        placeholder='Author' 
                        width={5} 
                        {...formik.getFieldProps('author')}
                    />
                    <FormInput 
                        fluid label='Publication Year' 
                        placeholder='Year' 
                        width={2} 
                        {...formik.getFieldProps('publicationYear')}
                        onChange={(e) => formik.setFieldValue('publicationYear', parseInt(e.target.value))}
                    />
                    {genreName ?
                        <FormInput fluid label='Genre' value={formik.values.genre} readOnly={true} width={3}/>
                    :   <FormSelect 
                            fluid
                            label='Genre'
                            options={genreList}
                            placeholder='Genre'
                            width={3}
                            {...formik.getFieldProps('genre')}
                            onChange={(e, { value }) => formik.setFieldValue('genre', value)}
                        />
                    }
                </FormGroup>
                <FormTextArea 
                    label='Summary' 
                    placeholder='Tell us more about the book...' 
                    {...formik.getFieldProps('summary')}
                />
                <FormInput 
                    fluid label='Cover Image URL' 
                    placeholder='Cover Image URL' 
                    {...formik.getFieldProps('coverImageURL')}
                />
                <Button type="submit">Create</Button>
            </Form>
            {formik.errors.server ? 
                <div style={{ color: '#cc0000', marginTop: '10px'}}>{formik.errors.server}</div>
            : null}
        </Segment>
    );
}

export default CreateBookForm;