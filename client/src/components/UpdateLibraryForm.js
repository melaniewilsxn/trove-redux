import React, { useState } from "react";
import { Segment, Form, Header, FormInput, Button } from "semantic-ui-react";

function UpdateLibraryForm({ setOpenEdit, libraryID, setLibrary, library }){
    const [error, setError] = useState(null)
    const [libraryName, setLibraryName] = useState(library.name)

    function handleUpdate(e){
        e.preventDefault()
        fetch(`/library/${libraryID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: libraryName,
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((updatedLibrary) => {
                    setLibrary(updatedLibrary)
                    alert("Library updated successfully!")
                    setOpenEdit(false)
                })
            } else {
                r.json().then((err) => setError(err.error))
            }
        })
        setOpenEdit(false)
    }

    return(
        <Segment textAlign='center'>
            <Form onSubmit={handleUpdate}>
                <Header>Rename library</Header>
                <FormInput fluid placeholder='Library Name' onChange={(e) => setLibraryName(e.target.value)} value={libraryName}/>
                <Button type="submit">Done</Button>
            </Form>
            {error ? 
            <div style={{ color: '#cc0000', marginTop: '10px'}}>{error}</div>
            : null}
        </Segment>
    )
}

export default UpdateLibraryForm