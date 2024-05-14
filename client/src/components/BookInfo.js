import React, { useEffect, useState } from "react";
import { Segment, Image, Button, Modal, Loader, Header, Grid, GridColumn, GridRow, Divider } from "semantic-ui-react";
import AddBookToLibraryForm from "./AddBookToLibraryForm";
import UpdateBookForm from "./UpdateBookForm";
import DeleteBookForm from "./DeleteBookForm";
import CreateReviewForm from "./CreateReviewForm";
import ReviewList from "./ReviewList";

function BookInfo({ id, user }){
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

    if (loading) {
        return <Loader active inline='centered' />; // Show a loader while data is loading
    }

    return (
        <Segment>
            <Grid divided='vertically' style={{margin: "15px"}}>
                <GridRow columns={2}>
                    <GridColumn>
                        <Image src={book.cover_image_url} style={{ marginBottom: "15px"}} centered/>
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
                        <Modal size="large"
                            onClose={() => setOpenEdit(false)}
                            onOpen={() => setOpenEdit(true)}
                            open={openEdit}
                            trigger={<Button>Edit Book</Button>}
                        >
                            <UpdateBookForm book={book} setBook={setBook} setOpenEdit={setOpenEdit}/>
                        </Modal>
                        <Modal size="mini"
                            onClose={() => setOpenDelete(false)}
                            onOpen={() => setOpenDelete(true)}
                            open={openDelete}
                            trigger={<Button>Delete Book</Button>}
                        >
                            <DeleteBookForm book={book} setOpenDelete={setOpenDelete}/>
                        </Modal>
                    </GridColumn>
                    <GridColumn>
                        <Header as='h1'>
                            {book.title}
                            <Header.Subheader>{book.author} | {book.publication_year} | {book.genre.name}</Header.Subheader>
                        </Header>
                        <p>{book.summary}</p>
                    </GridColumn>
                </GridRow>
                <GridRow columns={1}>
                    <GridColumn>
                        <ReviewList bookID={id} user={user}/>
                    </GridColumn>
                </GridRow>
            </Grid>
        </Segment>
    )
}

export default BookInfo