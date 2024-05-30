import React, { useState } from "react";
import { Comment, CommentAuthor, CommentAvatar, CommentContent, CommentMetadata, CommentText, Rating, CommentActions, CommentAction, Modal } from "semantic-ui-react";
import { parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import DeleteReviewForm from "../ReviewForms/DeleteReviewForm";
import UpdateReviewForm from "../ReviewForms/UpdateReviewForm";

function ReviewComment({ user, review, handleDeletedReview, handleUpdatedReview }){
    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)

    function formatDate(dateString){
        const timeZone = 'America/New_York';
        const date = parseISO(dateString + 'Z');
        return formatInTimeZone(date, timeZone, 'MMMM d, yyyy \'at\' h:mm aaa'); // Using 'aaa' for AM/PM
    }

    const formattedDate = formatDate(review.created_at)

    return(
        <Comment>
            <CommentAvatar src="http://localhost:3000/profile.png"/>
            <CommentContent>
                <CommentAuthor>{review.user.username}</CommentAuthor>
                <CommentMetadata>
                    <Rating icon='star' rating={review.rating} maxRating={5} disabled/>
                    | Mood: {review.mood} | Pace: {review.pace} | {formattedDate}
                </CommentMetadata>
                <CommentText>{review.comment}</CommentText>
                {(user.id === review.user.id) ?
                <CommentActions>
                    <Modal size="large"
                        onClose={() => setOpenEdit(false)}
                        onOpen={() => setOpenEdit(true)}
                        open={openEdit}
                        trigger={<CommentAction>Edit</CommentAction>}
                    >
                        <UpdateReviewForm review={review} setOpenEdit={setOpenEdit} handleUpdatedReview={handleUpdatedReview}/>
                    </Modal>
                    <Modal size="mini"
                        onClose={() => setOpenDelete(false)}
                        onOpen={() => setOpenDelete(true)}
                        open={openDelete}
                        trigger={<CommentAction>Delete</CommentAction>}
                    >
                        <DeleteReviewForm reviewID={review.id} setOpenDelete={setOpenDelete} handleDeletedReview={handleDeletedReview}/>
                    </Modal>
                </CommentActions>
                : null}
            </CommentContent>
        </Comment>
    )
}

export default ReviewComment