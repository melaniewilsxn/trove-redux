import React from "react";
import BookList from "../components/BookComponents/BookList";

function Books({}){
    return(
        <div>
            <h1 style={{ fontFamily: 'Bagel Fat One', fontSize: '50px' }}>All Books</h1>
            <BookList />
        </div>
    )
}

export default Books