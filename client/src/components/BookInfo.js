import React, { useEffect, useState } from "react";
import { Segment, Image, Button, Modal, Loader, Form, Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AddBookToLibraryForm from "./AddBookToLibraryForm";

function BookInfo({ id }){
    const [book, setBook] = useState(null)
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    useEffect(() => {
        fetch(`/books/${id}`)
        .then(r => r.json())
        .then(book => {
            setBook(book)
            setLoading(false)
        })
    }, [])

    function handleUpdate(e){
        e.preventDefault()
        // fetch(`/books/${id}`, {
        //     method: "PATCH",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         name: updatedLibraryName,
        //     }),
        // }).then((r) => {
        //     if (r.ok) {
        //         r.json().then((updatedLibrary) => {
        //             setLibrary(updatedLibrary)
        //             alert("Library updated successfully!")
        //         })
        //     } else {
        //         r.json().then((err) => alert(err.error))
        //     }
        // })
        setOpenEdit(false)
    }

    function handleDeleteClick(){
        // fetch(`/books/${id}`, {
        //     method: "DELETE",
        // }).then((r) => {
        //     if (r.ok) {
        //         history.push('/discover')
        //         alert("Book successfully deleted!")
        //     } else {
        //         r.json().then((err) => alert(err.error))
        //     }
        // })
        setOpenDelete(false)
    }

    if (loading) {
        return <Loader active inline='centered' />; // Show a loader while data is loading
    }

    return (
        <Segment>
            <div className="ui two column very relaxed grid">
                <div className="column">
                    <Image src={book.cover_image_url} style={{ marginBottom: "15px"}}/>
                    <Modal size="mini"
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        trigger={
                            <div className="ui labeled icon button">
                                Add Book to Library
                                <i className="add icon"></i>
                            </div>
                        }
                    >
                        <AddBookToLibraryForm bookID={id} setOpen={setOpen}/>
                    </Modal>
                    <Modal size="mini"
                        onClose={() => setOpenEdit(false)}
                        onOpen={() => setOpenEdit(true)}
                        open={openEdit}
                        trigger={<Button>Edit Book</Button>}
                    >
                        <Segment textAlign='center'>
                            <Form onSubmit={handleUpdate}>
                                <Header>Edit Book</Header>
                                {/* <Form.Input placeholder={library.name} onChange={(e) => setUpdatedLibraryName(e.target.value)}/> */}
                                <Button type="submit">Done</Button>
                            </Form>
                        </Segment>
                    </Modal>
                    <Modal size="mini"
                        onClose={() => setOpenDelete(false)}
                        onOpen={() => setOpenDelete(true)}
                        open={openDelete}
                        trigger={<Button>Delete Book</Button>}
                    >
                        <Segment textAlign='center'>
                            <Header>Are you sure you want to delete this book from the database?</Header>
                            <Button onClick={handleDeleteClick}>Yes</Button>
                            <Button onClick={() => setOpenDelete(false)}>No</Button>
                        </Segment>
                    </Modal>
                </div>
                <div className="column">
                    <h1 className="ui header">
                        <div className="content">
                            {book.title}
                            <div className="sub header">{book.author}</div>
                        </div>
                    </h1>
                    <p>{book.summary}</p>
                </div>
                <div className="ui vertical divider"></div>
            </div>
        </Segment>
    )
}

export default BookInfo