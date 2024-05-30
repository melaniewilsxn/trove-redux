import React, { useEffect, useState } from "react";
import { Segment, Image, Button, Modal, Loader, Header, Grid, GridColumn, GridRow, Container } from "semantic-ui-react";
import AddBookToLibraryForm from "../BookLibraryForms/AddBookToLibraryForm";
import UpdateBookForm from "../BookForms/UpdateBookForm";
import DeleteBookForm from "../BookForms/DeleteBookForm";
import ReviewList from "../ReviewComponents/ReviewList";
import DeleteBookFromLibrary from "../BookLibraryForms/DeleteBookFromLibrary";

function BookInfo({ id, user }){
    const [book, setBook] = useState(null)
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [openRemove, setOpenRemove] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    useEffect(() => {
        fetch(`/books/${id}`)
        .then(r => r.json())
        .then(book => {
            setBook(book)
            setLoading(false)
        })
    }, [id])

    if (loading) {
        return <Loader active inline='centered' />; // Show a loader while data is loading
    }

    return (
        <Segment>
            <Grid divided='vertically' style={{margin: "15px"}}>
                <GridRow columns={2}>
                    <GridColumn>
                        <Image src={book.cover_image_url} style={{ marginBottom: "15px"}} centered/>
                        <Container textAlign="center" style={{ marginBottom: "15px"}}>
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
                                onClose={() => setOpenRemove(false)}
                                onOpen={() => setOpenRemove(true)}
                                open={openRemove}
                                trigger={
                                    <div className="ui labeled icon button">
                                        Remove Book from Library
                                        <i className="minus icon"></i>
                                    </div>
                                }
                            >
                                <DeleteBookFromLibrary bookID={id} setOpenRemove={setOpenRemove}/>
                            </Modal>
                        </Container>
                        <Container textAlign="center">
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
                        </Container>
                    </GridColumn>
                    <GridColumn>
                        <Header as='h1' style={{ fontFamily: 'Bagel Fat One' }}>
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