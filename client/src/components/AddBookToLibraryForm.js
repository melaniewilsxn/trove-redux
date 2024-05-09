import React, { useState, useEffect } from 'react'
import { Segment, Header, Form, Button, FormSelect } from 'semantic-ui-react'

function AddBookToLibraryForm({ bookID, setOpen }){
    const [libraryList, setLibraryList] = useState([]);
    const [selectedLibraryID, setSelectedLibraryID] = useState(null);
    const [error, setError] = useState([])

    useEffect(() => {
        fetch("/libraries")
        .then((r) => r.json())
        .then(libraries => setLibraryList(libraries));
    }, []);

    function handleChange(e, { value }){
        setSelectedLibraryID(value)
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch("/add_book_to_library", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                library_id: selectedLibraryID,
                book_id: bookID,
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then(console.log("Success!"))
                setOpen(false)
            } else {
                r.json().then((err) => setError(err.error))
            }
        })
    }
    
    const options = libraryList.map((library) => ({ 
        key: library.id, 
        text: library.name, 
        value: library.id 
    }))

    return (
        <Segment textAlign='center'>
            <Form onSubmit={handleSubmit}>
                <Header>Add to playlist</Header>
                <FormSelect
                    fluid
                    selection
                    options={options}
                    placeholder='Select a Library'
                    onChange={handleChange}
                    value={selectedLibraryID}
                />
                <Button type="submit">Done</Button>
            </Form>
        </Segment>
    )
}

export default AddBookToLibraryForm