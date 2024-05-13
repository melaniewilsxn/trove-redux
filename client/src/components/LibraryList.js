import React, { useState, useEffect } from 'react'
import LibraryCard from './LibraryCard';
import { CardGroup, Button, Modal, Form, Header, Segment, Divider } from 'semantic-ui-react'

function LibraryList(){
    const [libraryList, setLibraryList] = useState([])
    const [open, setOpen] = useState(false)
    const [libraryName, setLibraryName] = useState("")
    const [error, setError] = useState([])

    useEffect(() => {
        fetch("/libraries")
        .then((r) => r.json())
        .then(libraries => setLibraryList(libraries));
    }, []);

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
                r.json().then((newLibrary) => setLibraryList([...libraryList, newLibrary]))
            } else {
                r.json().then((err) => setError(err.error))
            }
        })
        setOpen(false)
    }

    return (
        <div>
            <Modal size="mini"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button>Add New Library</Button>}
            >
                <Segment textAlign='center'>
                    <Form onSubmit={handleSubmit}>
                        <Header>Give your library a name</Header>
                        <Form.Input placeholder='Library Name' onChange={(e) => setLibraryName(e.target.value)}/>
                        <Button type="submit">Create</Button>
                    </Form>
                </Segment>
            </Modal>
            <Divider/>
            <CardGroup itemsPerRow={4}>
                {libraryList.map((library) => <LibraryCard library={library} key={library.id}/>)}
            </CardGroup>
        </div>
    )
}

export default LibraryList