import React, { useEffect, useState } from "react";
import { Segment, Image, Button, Modal, Loader } from "semantic-ui-react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AddBookToLibraryForm from "./AddBookToLibraryForm";

function BookInfo({ id }){
    const [book, setBook] = useState(null)
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)

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