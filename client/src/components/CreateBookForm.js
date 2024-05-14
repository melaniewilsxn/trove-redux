import React, { useState, useEffect } from "react";
import { Button, Segment, Form, FormGroup, FormInput, FormTextArea, Header, FormSelect } from "semantic-ui-react";

function CreateBookForm({ bookList, setBookList, setOpen, genreName}){
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [publicationYear, setPublicationYear] = useState()
    const [summary, setSummary] = useState("")
    const [coverImageURL, setCoverImageURL] = useState("")
    const [genre, setGenre] = useState(`${genreName}`)
    const [genreList, setGenreList] = useState([])
    const [error, setError] = useState(null)

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
                    setError(null)
                    setOpen(false)
                })
            } else {
                r.json().then((err) => setError(err.error))
            }
        })
    }

    return(
        <Segment>
            <Form onSubmit={handleSubmit}>
                <Header textAlign='center'>Add new book:</Header>
                <FormGroup>
                    <FormInput fluid label='Title' placeholder='Title' width={6} onChange={(e) => setTitle(e.target.value)}/>
                    <FormInput fluid label='Author' placeholder='Author' width={5} onChange={(e) => setAuthor(e.target.value)}/>
                    <FormInput fluid label='Publication Year' placeholder='Year' width={2} onChange={(e) => setPublicationYear(parseInt(e.target.value))}/>
                    {genreName ?
                        <FormInput fluid label='Genre' value={genre} readOnly={true} width={3}/>
                    :   <FormSelect 
                            fluid
                            label='Genre'
                            placeholder='Genre'
                            options={genreList}
                            value={genre} 
                            width={3}
                            onChange={(e, { value }) => setGenre(value)}
                        />
                    }
                </FormGroup>
                <FormTextArea label='Summary' placeholder='Tell us more about the book...' onChange={(e) => setSummary(e.target.value)}/>
                <FormInput fluid label='Cover Image URL' placeholder='Cover Image URL' onChange={(e) => setCoverImageURL(e.target.value)}/>
                <Button type="submit">Create</Button>
            </Form>
            {error ? 
                <div style={{ color: '#cc0000', marginTop: '10px'}}>{error}</div>
            : null}
        </Segment>
    )
}

export default CreateBookForm