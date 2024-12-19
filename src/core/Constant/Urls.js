
const base = 'http://localhost:7200/api/v1';
export const urls = Object.freeze({
    base,
    user: {
        register: base + '/register',
        login: base + '/login',
        update: base + '/update',
    },
    document: {
        adddocument: base + '/document/addDocument',
        getalldocument: base + '/document/getAllDocument',
        getdocumentbyid: base + '/document/getDocument/:id',
        updatedocument: base + '/document/updateDocument/:id',
        deletedocument: base + '/document/deleteDocument/:id'
    },
    client: {
        addclient: base + '/client/addClient',
        getalldocument: base + '/client/getAllDocument',
        updatedocument: base + '/client/updateDocument/:id',
        deletedocument: base + '/client/deleteDocument/:id'
    }
})