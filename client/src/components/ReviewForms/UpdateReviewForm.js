import React from 'react';
import { Segment, Form, Header, FormGroup, FormSelect, FormTextArea, Button } from "semantic-ui-react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

function UpdateReviewForm({ review, setOpenEdit, handleUpdatedReview }) {

    const updateReviewSchema = Yup.object().shape({
        rating: Yup.number().required('Rating is required'),
        mood: Yup.string().required('Mood is required'),
        pace: Yup.string().required('Pace is required'),
        comment: Yup.string()
    })

    const formik = useFormik({
        initialValues: {
            rating: review.rating,
            mood: review.mood,
            pace: review.pace,
            comment: review.comment
        },
        validationSchema: updateReviewSchema,
        onSubmit: (values, { setErrors }) => {
            fetch(`/reviews/${review.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values),
            }).then((response) => {
                if (response.ok) {
                    response.json().then((updatedReview) => {
                        handleUpdatedReview(updatedReview);
                        alert("Review updated successfully!");
                        setOpenEdit(false);
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
        {key: 7, text: "Humorous", value: "Humorous"},
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
                <Header textAlign='center'>Update Review:</Header>
                <FormGroup>
                    <FormSelect
                        fluid label='Rating'
                        placeholder='Rating'
                        options={ratingOptions}
                        name="rating"
                        onChange={(e, { value }) => formik.setFieldValue('rating', value)}
                        value={formik.values.rating}
                        width={4}
                    />
                    <FormSelect
                        fluid label='Mood'
                        placeholder='Mood'
                        options={moodOptions}
                        name="mood"
                        onChange={(e, { value }) => formik.setFieldValue('mood', value)}
                        value={formik.values.mood}
                        width={6}
                    />
                    <FormSelect
                        fluid label='Pace'
                        placeholder='Pace'
                        options={paceOptions}
                        name="pace"
                        onChange={(e, { value }) => formik.setFieldValue('pace', value)}
                        value={formik.values.pace}
                        width={6}
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
    );
}

export default UpdateReviewForm;