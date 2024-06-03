import React, { useState, useEffect } from "react";
import { Loader, CommentGroup, Modal, Button, Header } from "semantic-ui-react";
import ReviewComment from "./ReviewComment";
import CreateReviewForm from "../ReviewForms/CreateReviewForm";

function ReviewList({ bookID }){
    const [reviewList, setReviewList] = useState([]);
    const [loading, setLoading] = useState(true)
    const [openReview, setOpenReview] = useState(false)

    useEffect(() => {
        fetch(`/book/reviews/${bookID}`)
        .then((r) => r.json())
        .then(reviews => {
            setReviewList(reviews)
            setLoading(false)
        })
    }, [bookID])

    function handleDeletedReview(reviewID){
        setReviewList(reviews => reviews.filter(review => review.id !== reviewID))
    }

    function handleUpdatedReview(updatedReview){
        setReviewList(reviewList.map(review => {
            if (review.id === updatedReview.id){
                return updatedReview
            }
            return review
        }))
    }

    if (loading) {
        return <Loader active inline='centered' />; // Show a loader while data is loading
    }

    return (
        <div>
            <CommentGroup>
                <Header as='h1' style={{ fontFamily: 'Bagel Fat One'}}>Reviews</Header>
                {reviewList.map((review) => <ReviewComment review={review} key={review.id} handleDeletedReview={handleDeletedReview} handleUpdatedReview={handleUpdatedReview}/>)}
            </CommentGroup>
            <Modal size="large"
            onClose={() => setOpenReview(false)}
            onOpen={() => setOpenReview(true)}
            open={openReview}
            trigger={<Button>Write Review</Button>}
            >
                <CreateReviewForm bookID={bookID} setOpenReview={setOpenReview} setReviewList={setReviewList} reviewList={reviewList}/>
            </Modal>
        </div>
    )
}

export default ReviewList