import React, { useState } from "react";
import { Segment, Form, Header, FormInput, Button } from "semantic-ui-react";

function CreateLibraryForm({ libraryList, setLibraryList, setOpen }){
    const [libraryName, setLibraryName] = useState("")
    const [error, setError] = useState([])

    function handleSubmit(e){
        e.preventDefault()
        fetch("/libraries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                libraryName,
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((newLibrary) => {
                    setLibraryList([...libraryList, newLibrary])
                    setOpen(false)
                })
            } else {
                r.json().then((err) => setError(err.error))
            }
        })
    }

    return(
        <Segment textAlign='center'>
            <Form onSubmit={handleSubmit}>
                <Header>Give your library a name</Header>
                <FormInput placeholder='Library Name' onChange={(e) => setLibraryName(e.target.value)}/>
                <Button type="submit">Create</Button>
            </Form>
            {error ? 
                <div style={{ color: '#cc0000', marginTop: '10px'}}>{error}</div>
            : null}
        </Segment>
    )
}

export default CreateLibraryForm