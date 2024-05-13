import React, { useState, useEffect } from 'react'
import { Segment, Header, Form, Button, FormSelect, FormGroup, FormInput, FormTextArea } from 'semantic-ui-react'

function UpdateBookForm({ book, setBook, setOpenEdit}){
    const [title, setTitle] = useState(book.title)
    const [author, setAuthor] = useState(book.author)
    const [publicationYear, setPublicationYear] = useState(book.publication_year)
    const [summary, setSummary] = useState(book.summary)
    const [coverImageURL, setCoverImageURL] = useState(book.cover_image_url)
    const [genre, setGenre] = useState(book.genre.id)
    const [genreList, setGenreList] = useState([])
    const [error, setError] = useState([])

    useEffect(() => {
        fetch('/genres')
        .then(r => r.json())
        .then(genres => {
            setGenreList(genres.map((genre) => ({
                    key: genre.id, 
                    text: genre.name, 
                    value: genre.id,
                })
            ))
        })
    }, [])

    function handleUpdate(e){
        e.preventDefault()
        fetch(`/books/${book.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                author: author,
                publication_year: publicationYear,
                genre_id: genre,
                summary: summary,
                cover_image_url: coverImageURL,
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((updatedBook) => {
                    setBook(updatedBook)
                    alert("Book updated successfully!")
                    setOpenEdit(false)
                })
            } else {
                r.json().then((err) => setError(err.error))
            }
        })
    }

    return (
        <Segment>
            <Form onSubmit={handleUpdate}>
                <Header textAlign='center'>Update book:</Header>
                <FormGroup>
                    <FormInput fluid label='Title' placeholder='Title' width={6} onChange={(e) => setTitle(e.target.value)} value={title}/>
                    <FormInput fluid label='Author' placeholder='Author' width={5} onChange={(e) => setAuthor(e.target.value)} value={author}/>
                    <FormInput fluid label='Publication Year' placeholder='Year' width={2} onChange={(e) => setPublicationYear(parseInt(e.target.value))} value={publicationYear}/>
                    <FormSelect 
                        fluid
                        options={genreList}
                        label='Genre' 
                        value={genre} 
                        width={3}
                        onChange={(e, { value }) => setGenre(value)}
                    />
                </FormGroup>
                <FormTextArea label='Summary' placeholder='Tell us more about the book...' onChange={(e) => setSummary(e.target.value)} value={summary}/>
                <FormInput fluid label='Cover Image URL' placeholder='Cover Image URL' onChange={(e) => setCoverImageURL(e.target.value)} value={coverImageURL}/>
                <Button type="submit">Update</Button>
            </Form>
            {error ? 
            <div style={{ color: '#cc0000', marginTop: '10px'}}>{error}</div>
            : null}
        </Segment>
    )
}

export default UpdateBookForm