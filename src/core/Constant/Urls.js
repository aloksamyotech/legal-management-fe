

const base = 'http://localhost:7200/api/v1';
export const urls = Object.freeze({
    base,
    initialbase:'http://localhost:7200',
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
        getallclient: base + '/client/getAllClient',
        updateclient: base + '/client/updateClient',
        deletedocument: base + '/client/deleteDocument/:id'
    },
    Advocate: {
        addadvocate: base + '/advocate/addadvocate',
        getalladvocate: base + '/advocate/getalladvocate',
        updateadvocate: base + '/advocate/update',
        deleteadvocate: base + '/advocate/deleteadvocate/:id'
    },
    Advice: {
        addadvice: base + '/advise/addAdvise',
        getalladvice: base + '/advise/getAdvise',
        getaadvice: base + '/advise/getoneAdvise/:id',
        updateadvice: base + '/advise/updateAdvise/:id',
        deleteadvice: base + '/advise/deleteAdvise/:id',
    },
    Case:{
        addcase:base+'/case/addCase',
    
    },
    Judge:{
        addjudge:base+"/judge/addJudge",
        gettalljudge:base+"/judge/getAllJudge",
    },
    Court:{
        addcourt:base+"/court/addCourt",
        gettallcourt:base+"/court/getAllCourt",
    },
    PracticeArea:{
        addPracticeArea: base+"/practicearea/addPracticearea",
        getllpracticearea:base+"/practicearea/getAllPracticearea",
        deletepracticearea:base+"/practicearea/deletePracticearea/:id",
        updatepracticearea:base+"/practicearea/updatePracticearea/:id"
    },
    PoliceStation:{
        addPoliceStation:base+"/policestation/addPolicestation",
        getAllPoliceStation:base+"/policestation/getAllPolicestation",
        deletePoliceStation:base+"/policestation/deletePolicestation/:id",
        updatePoliceStation:base+"/policestation/updatePolicestation/:id"
    },
    Matter:{
        addmatter: base+"/matter/addMatter",
        getallmatter: base+"/matter/getAllMatter",
        deletematter: base+"/matter/deleteMatter/:id",
        updatematter: base+"/matter/updateMatter/:id",
    },
    Tag:{
        addTag: base+"/tag/addTag",
        getalltag: base+"/tag/getAllTag",
        deletetag: base+"/tag/deleteTag/:id",
        updatetag: base+"/tag/updateTag/:id",
    },
    CaseStage:{
        addCaseStage: base+"/casestage/addCaseStage",
        getallCaseStage: base+"/casestage/getAllCaseStage",
        deleteCaseStage: base+"/casestage/deleteCaseStage/:id",
        updateCaseStage: base+"/casestage/updateCaseStage/:id",
    },
    ExpenseType:{
        addExpenseType: base+"/expensetype/addExpenseType",
        getallExpenseType: base+"/expensetype/getAllExpenseType",
        deleteExpenseType: base+"/expensetype/deleteExpenseType/:id",
        updateExpenseType: base+"/expensetype/updateExpenseType/:id",
    },

})