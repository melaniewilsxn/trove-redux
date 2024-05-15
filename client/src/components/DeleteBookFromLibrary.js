import React, { useState, useEffect } from "react";
import { Segment, Form, Header, FormSelect, Button } from "semantic-ui-react";

function DeleteBookFromLibrary({ bookID, setOpenRemove }){
    const [libraryList, setLibraryList] = useState([]);
    const [selectedLibraryID, setSelectedLibraryID] = useState(null);
    const [error, setError] = useState([])

    useEffect(() => {
        fetch(`/book/libraries/${bookID}`)
        .then((r) => r.json())
        .then(libraries => setLibraryList(libraries));
    }, []);

    function handleSubmit(){
        fetch(`/delete_book_from_library/library/${selectedLibraryID}/book/${bookID}`, {
            method: "DELETE",
        }).then((r) => {
            if (r.ok) {
                alert("Book successfully deleted from library!")
                setOpenRemove(false)
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

    return(
        <Segment textAlign='center'>
            <Form onSubmit={handleSubmit}>
                <Header>Delete from Library</Header>
                <FormSelect
                    fluid
                    selection
                    options={options}
                    placeholder='Select a Library'
                    onChange={(e, {value}) => setSelectedLibraryID(value)}
                    value={selectedLibraryID}
                />
                <Button type="submit">Done</Button>
            </Form>
            {error ? 
            <div style={{ color: '#cc0000', marginTop: '10px'}}>{error}</div>
            : null}
        </Segment>
    )
}

export default DeleteBookFromLibrary