import React, { useState } from "react";
import { Segment, Header, Button } from "semantic-ui-react";

function DeleteReviewForm({ reviewID, setOpenDelete, handleDeletedReview }){
    // const history = useHistory()
    const [error, setError] = useState(null)

    function handleDeleteClick(){
        fetch(`/reviews/${reviewID}`, {
            method: "DELETE",
        }).then((r) => {
            if (r.ok) {
                handleDeletedReview(reviewID)
                alert("Review successfully deleted!")
                setOpenDelete(false)
            } else {
                r.json().then((err) => setError(err.error))
            }
        })
    }

    return(
        <Segment textAlign='center'>
            <Header>Are you sure you want to delete this comment?</Header>
            <Button onClick={handleDeleteClick}>Yes</Button>
            <Button onClick={() => setOpenDelete(false)}>No</Button>
            {error ? 
            <div style={{ color: '#cc0000', marginTop: '10px'}}>{error}</div>
            : null}
        </Segment>
    )
}

export default DeleteReviewForm