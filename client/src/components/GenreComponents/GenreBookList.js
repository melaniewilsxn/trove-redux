import React, { useEffect, useState } from "react";
import { CardGroup, Button, Modal, Divider } from "semantic-ui-react";
import BookCard from "../BookComponents/BookCard";
import CreateBookForm from "../BookForms/CreateBookForm";

function GenreBookList({ genreName }){
    const [bookList, setBookList] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        fetch(`/genres/${genreName}`)
        .then(r => r.json())
        .then(books => setBookList(books))
    }, [genreName])

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
                    <CreateBookForm bookList={bookList} setBookList={setBookList} setOpen={setOpen} genreName={genreName}/>
                </Modal>
                <Divider/>
            <CardGroup>
                {bookList.map((book) => <BookCard book={book} key={book.id}/>)}
            </CardGroup>
        </div>
    )
}

export default GenreBookList