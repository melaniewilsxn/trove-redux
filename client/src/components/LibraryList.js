import React, { useState, useEffect } from 'react'
import LibraryCard from './LibraryCard';
import { CardGroup, Button, Modal, Form, Header, Segment, Divider } from 'semantic-ui-react'
import CreateLibraryForm from './CreateLibraryForm';

function LibraryList(){
    const [libraryList, setLibraryList] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        fetch("/libraries")
        .then((r) => r.json())
        .then(libraries => setLibraryList(libraries));
    }, []);

    return (
        <div>
            <Modal size="mini"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button>Add New Library</Button>}
            >
                <CreateLibraryForm libraryList={libraryList} setLibraryList={setLibraryList} setOpen={setOpen}/>
            </Modal>
            <Divider/>
            <CardGroup itemsPerRow={4}>
                {libraryList.map((library) => <LibraryCard library={library} key={library.id}/>)}
            </CardGroup>
        </div>
    )
}

export default LibraryList