import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Loader, Button, Divider, Modal, Segment, Form, Header } from 'semantic-ui-react';
import LibraryBookList from '../components/LibraryBookList';

function Library(){
    const { libraryID } = useParams();
    const history = useHistory()

    const [library, setLibrary] = useState()
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [updatedLibraryName, setUpdatedLibraryName] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState([])

    useEffect(() => {
        fetch(`/library/${libraryID}`)
        .then(r => r.json())
        .then(library => {
            setLibrary(library)
            setLoading(false)
        })
    }, [])

    function handleUpdate(e){
        e.preventDefault()
        fetch(`/library/${libraryID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: updatedLibraryName,
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((updatedLibrary) => {
                    setLibrary(updatedLibrary)
                    alert("Library updated successfully!")
                })
            } else {
                r.json().then((err) => alert(err.error))
            }
        })
        setOpenEdit(false)
    }

    function handleDeleteClick(){
        fetch(`/library/${libraryID}`, {
            method: "DELETE",
        }).then((r) => {
            if (r.ok) {
                history.push('/library')
                setLibrary(null)
                alert("Library successfully deleted!")
            } else {
                r.json().then((err) => alert(err.error))
            }
        })
        setOpenDelete(false)
    }

    if (loading) {
        return <Loader active inline='centered' />; // Show a loader while data is loading
    }

    return (
        <div>
            <h1>{library.name}</h1>
            <Modal size="mini"
                onClose={() => setOpenEdit(false)}
                onOpen={() => setOpenEdit(true)}
                open={openEdit}
                trigger={<Button>Edit Library</Button>}
            >
                <Segment textAlign='center'>
                    <Form onSubmit={handleUpdate}>
                        <Header>Rename library</Header>
                        <Form.Input placeholder={library.name} onChange={(e) => setUpdatedLibraryName(e.target.value)}/>
                        <Button type="submit">Done</Button>
                    </Form>
                </Segment>
            </Modal>
            <Modal size="mini"
                onClose={() => setOpenDelete(false)}
                onOpen={() => setOpenDelete(true)}
                open={openDelete}
                trigger={<Button>Delete Library</Button>}
            >
                <Segment textAlign='center'>
                    <Header>Are you sure you want to delete this library?</Header>
                    <Button onClick={handleDeleteClick}>Yes</Button>
                    <Button onClick={() => setOpenDelete(false)}>No</Button>
                </Segment>
            </Modal>
            <Divider/>
            <LibraryBookList library={library}/>
        </div>
    )
}

export default Library