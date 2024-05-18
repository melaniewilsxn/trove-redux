import React from 'react';
import { Segment, Form, Header, FormGroup, FormTextArea, FormSelect, Button } from "semantic-ui-react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

function CreateReviewForm({ bookID, setOpenReview, reviewList, setReviewList }) {

    const createReviewSchema = Yup.object().shape({
        rating: Yup.number().required('Rating is required'),
        mood: Yup.string().required('Mood is required'),
        pace: Yup.string().required('Pace is required'),
        comment: Yup.string()
    })

    const formik = useFormik({
        initialValues: {
            rating: '',
            mood: '',
            pace: '',
            comment: ''
        },
        validationSchema: createReviewSchema,
        onSubmit: (values, { setErrors }) => {
            fetch(`/book/reviews/${bookID}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values),
            }).then((response) => {
                if (response.ok) {
                    response.json().then((newReview) => {
                        setReviewList([...reviewList, newReview]);
                        setOpenReview(false);
                    });
                } else {
                    response.json().then((err) => setErrors({ server: err.error }));
                }
            });
        }
    });

    const ratingOptions = [
        {key: 1, text: "1 ☆", value: 1},
        {key: 2, text: "2 ☆☆", value: 2},
        {key: 3, text: "3 ☆☆☆", value: 3},
        {key: 4, text: "4 ☆☆☆☆", value: 4},
        {key: 5, text: "5 ☆☆☆☆☆", value: 5},
    ];
    const moodOptions = [
        {key: 1, text: "Cheerful", value: "Cheerful"},
        {key: 2, text: "Reflective", value: "Reflective"},
        {key: 3, text: "Dark", value: "Dark"},
        {key: 4, text: "Romantic", value: "Romantic"},
        {key: 5, text: "Suspenseful", value: "Suspenseful"},
        {key: 6, text: "Inspirational", value: "Inspirational"},
        {key: 7, text: "Humurous", value: "Humorous"},
        {key: 8, text: "Tragic", value: "Tragic"},
    ];
    const paceOptions = [
        {key: 1, text: "Fast-paced", value: "Fast-paced"},
        {key: 2, text: "Moderate", value: "Moderate"},
        {key: 3, text: "Slow-paced", value: "Slow-paced"},
        {key: 4, text: "Variable", value: "Variable"},
    ];

    return (
        <Segment>
            <Form onSubmit={formik.handleSubmit}>
                <Header textAlign='center'>Write a Review:</Header>
                <FormGroup>
                    <FormSelect 
                        fluid label='Rating' 
                        placeholder='Rating' 
                        options={ratingOptions} 
                        width={4} 
                        name="rating"
                        onChange={(e, { value }) => formik.setFieldValue('rating', value)}
                        value={formik.values.rating}
                    />
                    <FormSelect 
                        fluid label='Mood' 
                        placeholder='Mood' 
                        options={moodOptions} 
                        width={6} 
                        name="mood"
                        onChange={(e, { value }) => formik.setFieldValue('mood', value)}
                        value={formik.values.mood}
                    />
                    <FormSelect 
                        fluid label='Pace' 
                        placeholder='Pace' 
                        options={paceOptions} 
                        width={6} 
                        name="pace"
                        onChange={(e, { value }) => formik.setFieldValue('pace', value)}
                        value={formik.values.pace}
                    />
                </FormGroup>
                <FormTextArea 
                    label='Comment' 
                    placeholder='Tell us what you thought about the book...' 
                    name="comment"
                    onChange={formik.handleChange}
                    value={formik.values.comment}
                />
                <Button type="submit">Done</Button>
            </Form>
            {formik.errors.server &&
                <div style={{ color: '#cc0000', marginTop: '10px' }}>{formik.errors.server}</div>
            }
        </Segment>
    )
}

export default CreateReviewForm