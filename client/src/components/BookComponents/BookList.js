import React, { useEffect, useState } from "react";
import { CardGroup, Modal, Button, Divider } from "semantic-ui-react";
import BookCard from "./BookCard";
import CreateBookForm from "../BookForms/CreateBookForm";

function BookList(){
    const [bookList, setBookList] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        fetch(`/books`)
        .then(r => r.json())
        .then(books => setBookList(books))
    }, [])

    return (
        <div>
            <Modal size="large"
                onClose={() => setOpen(false)}
                onOpen={() => {
                    setOpen(true)
                }}
                open={open}
                trigger={<Button>Add New Book</Button>}
            >
                <CreateBookForm bookList={bookList} setBookList={setBookList} setOpen={setOpen}/>
            </Modal>
            <Divider/>
            <CardGroup>
                {bookList.map((book) => <BookCard book={book} key={book.id}/>)}
            </CardGroup>
        </div>
    )
}

export default BookList