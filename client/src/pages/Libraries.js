import React from 'react';
import LibraryList from '../components/LibraryComponents/LibraryList';

function Libraries(){

    return (
        <div>
            <h1 style={{ fontFamily: 'Bagel Fat One', fontSize: '50px' }}>Your Libraries</h1>
            <LibraryList/>
        </div>
    )
}

export default Libraries