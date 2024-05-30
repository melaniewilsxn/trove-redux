import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader, Button, Divider, Modal } from 'semantic-ui-react';
import LibraryBookList from '../components/LibraryComponents/LibraryBookList';
import UpdateLibraryForm from '../components/LibraryForms/UpdateLibraryForm';
import DeleteLibraryForm from '../components/LibraryForms/DeleteLibraryForm';

function Library(){
    const { libraryID } = useParams();

    const [library, setLibrary] = useState()
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`/library/${libraryID}`)
        .then(r => r.json())
        .then(library => {
            setLibrary(library)
            setLoading(false)
        })
    }, [libraryID])

    if (loading) {
        return <Loader active inline='centered' />; // Show a loader while data is loading
    }

    return (
        <div>
            <h1 style={{ fontFamily: 'Bagel Fat One', fontSize: '50px' }}>{library.name}</h1>
            <Modal size="mini"
                onClose={() => setOpenEdit(false)}
                onOpen={() => setOpenEdit(true)}
                open={openEdit}
                trigger={<Button>Edit Library</Button>}
            >
                <UpdateLibraryForm setOpenEdit={setOpenEdit} libraryID={libraryID} setLibrary={setLibrary} library={library}/>
            </Modal>
            <Modal size="mini"
                onClose={() => setOpenDelete(false)}
                onOpen={() => setOpenDelete(true)}
                open={openDelete}
                trigger={<Button>Delete Library</Button>}
            >
                <DeleteLibraryForm setOpenDelete={setOpenDelete} libraryID={libraryID}/>
            </Modal>
            <Divider/>
            <LibraryBookList library={library}/>
        </div>
    )
}

export default Library