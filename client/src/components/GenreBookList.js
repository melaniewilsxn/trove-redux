import React, { useEffect, useState } from "react";
import { CardGroup, Button, Modal, Form, Header, Segment, Divider, FormGroup, FormInput, FormTextArea } from "semantic-ui-react";
import BookCard from "./BookCard";

function GenreBookList({ genreName }){
    const [bookList, setBookList] = useState([])
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [publicationYear, setPublicationYear] = useState()
    const [summary, setSummary] = useState("")
    const [coverImageURL, setCoverImageURL] = useState("")
    const [genre, setGenre] = useState(`${genreName}`)
    const [error, setError] = useState([])

    useEffect(() => {
        fetch(`/genres/${genreName}`)
        .then(r => r.json())
        .then(books => setBookList(books))
    }, [])

    function handleSubmit(e){
        e.preventDefault()
        fetch("/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                author,
                publicationYear,
                genre,
                summary,
                coverImageURL,
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((newBook) => {
                    setBookList([...bookList, newBook])
                    setOpen(false)
                })
            } else {
                r.json().then((err) => setError(err.error))
            }
        })
    }

    return (
        <div>
            <Modal size="large"
                    onClose={() => setOpen(false)}
                    onOpen={() => {
                        setOpen(true)
                        setError(null)
                    }}
                    open={open}
                    trigger={<Button>Add New Book</Button>}
                >
                    <Segment>
                        <Form onSubmit={handleSubmit}>
                            <Header textAlign='center'>Add new book:</Header>
                            <FormGroup>
                                <FormInput fluid label='Title' placeholder='Title' width={6} onChange={(e) => setTitle(e.target.value)}/>
                                <FormInput fluid label='Author' placeholder='Author' width={5} onChange={(e) => setAuthor(e.target.value)}/>
                                <FormInput fluid label='Publication Year' placeholder='Year' width={2} onChange={(e) => setPublicationYear(parseInt(e.target.value))}/>
                                <FormInput fluid label='Genre' value={genre} readOnly={true} width={3}/>
                            </FormGroup>
                            <FormTextArea label='Summary' placeholder='Tell us more about the book...' onChange={(e) => setSummary(e.target.value)}/>
                            <FormInput fluid label='Cover Image URL' placeholder='Cover Image URL' onChange={(e) => setCoverImageURL(e.target.value)}/>
                            <Button type="submit">Create</Button>
                        </Form>
                        {error ? 
                          <div style={{ color: '#cc0000', marginTop: '10px'}}>{error}</div>
                        : null}
                    </Segment>
                </Modal>
                <Divider/>
            <CardGroup>
                {bookList.map((book) => <BookCard book={book} key={book.id}/>)}
            </CardGroup>
        </div>
    )
}

export default GenreBookList