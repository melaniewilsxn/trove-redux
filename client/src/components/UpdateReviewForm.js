import React, { useState } from "react";
import { Segment, Form, Header, FormGroup, FormSelect, FormTextArea, Button } from "semantic-ui-react";

function UpdateReviewForm({ review, setOpenEdit, handleUpdatedReview }){
    const [rating, setRating] = useState(review.rating)
    const [mood, setMood] = useState(review.mood)
    const [pace, setPace] = useState(review.pace)
    const [comment, setComment] = useState(review.comment)
    const [error, setError] = useState(null)

    function handleSubmit(e){
        e.preventDefault()
        fetch(`/reviews/${review.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                rating: rating,
                mood: mood,
                pace: pace,
                comment: comment,
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((updatedReview) => {
                    handleUpdatedReview(updatedReview)
                    alert("Review updated successfully!")
                    setOpenEdit(false)
                })
            } else {
                r.json().then((err) => setError(err.error))
            }
        })
    }

    const ratingOptions = [
        {key: 1, text: "1 ☆", value: 1},
        {key: 2, text: "2 ☆☆", value: 2},
        {key: 3, text: "3 ☆☆☆", value: 3},
        {key: 4, text: "4 ☆☆☆☆", value: 4},
        {key: 5, text: "5 ☆☆☆☆☆", value: 5},
    ]
    const moodOptions = [
        {key: 1, text: "Cheerful", value: "Cheerful"},
        {key: 2, text: "Reflective", value: "Reflective"},
        {key: 3, text: "Dark", value: "Dark"},
        {key: 4, text: "Romantic", value: "Romantic"},
        {key: 5, text: "Suspenseful", value: "Suspenseful"},
        {key: 6, text: "Inspirational", value: "Inspirational"},
        {key: 7, text: "Humurous", value: "Humurous"},
        {key: 8, text: "Tragic", value: "Tragic"},
    ]
    const paceOptions = [
        {key: 1, text: "Fast-paced", value: "Fast-paced"},
        {key: 2, text: "Moderate", value: "Moderate"},
        {key: 3, text: "Slow-paced", value: "Slow-paced"},
        {key: 4, text: "Variable", value: "Variable"},
    ]
    return(
        <Segment>
            <Form onSubmit={handleSubmit}>
                <Header textAlign='center'>Update Review:</Header>
                <FormGroup>
                    <FormSelect fluid label='Rating' placeholder='Rating' options={ratingOptions} value={rating} width={4} onChange={(e, {value}) => setRating(value)}/>
                    <FormSelect fluid label='Mood' placeholder='Mood' options={moodOptions} value={mood} width={6} onChange={(e, {value}) => setMood(value)}/>
                    <FormSelect fluid label='Pace' placeholder='Pace' options={paceOptions} value={pace} width={6} onChange={(e, {value}) => setPace(value)}/>
                </FormGroup>
                <FormTextArea label='Comment' placeholder='Tell us what you thought about the book...' value={comment} onChange={(e) => setComment(e.target.value)}/>
                <Button type="submit">Done</Button>
            </Form>
            {error ? 
                <div style={{ color: '#cc0000', marginTop: '10px'}}>{error}</div>
            : null}
        </Segment>
    )
}

export default UpdateReviewForm