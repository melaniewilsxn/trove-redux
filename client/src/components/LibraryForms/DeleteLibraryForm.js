import React, { useState } from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

function DeleteLibraryForm({ setOpenDelete, libraryID }){
    const navigate = useNavigate()

    const [error, setError] = useState(null)

    function handleDeleteClick(){
        fetch(`/library/${libraryID}`, {
            method: "DELETE",
        }).then((r) => {
            if (r.ok) {
                navigate('/library')
                alert("Library successfully deleted!")
                setOpenDelete(false)
            } else {
                r.json().then((err) => setError(err.error))
            }
        })
    }

    return(
        <Segment textAlign='center'>
            <Header>Are you sure you want to delete this library?</Header>
            <Button onClick={handleDeleteClick}>Yes</Button>
            <Button onClick={() => setOpenDelete(false)}>No</Button>
            {error ? 
            <div style={{ color: '#cc0000', marginTop: '10px'}}>{error}</div>
            : null}
        </Segment>
    )
}

export default DeleteLibraryForm