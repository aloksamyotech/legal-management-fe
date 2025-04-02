import Evidence from 'views/Evidence';

const base = 'http://localhost:7205/api/v1';
// const base = 'https://lawdesk.samyotech.in/api/v1';
//const base = 'http://165.22.218.55:7200/api/v1';
export const urls = Object.freeze({
  base,
  //initialbase: 'http://165.22.218.55:7200',
  initialbase: 'http://localhost:7205',
  // initialbase: 'https://lawdesk.samyotech.in',
  user: {
    register: base + '/user/register',
    login: base + '/user/login',
    update: base + '/user/update/:id',
    getAlluser: base + '/user/getalluser',
    getAlluserpage: base + '/user/getalluserpage',
    getuserbyId: base + '/user/getuserbyId/:id',
    deleteuser: base + '/user/deleteUser/:id',
    permissionUpdate: base + '/user/updateUserpermission/:id',
    forgetpass: base + '/user/resetpassword',
    updateLogo: base + '/user/updatelogo',
    Getlogo: base + '/user/getcompanyLogo'
  },

  Emailurl: {
    toggle: base + '/BlockMail/toggleEmail',
    fetch: base + '/BlockMail/getBlockedEmail'
  },

  client: {
    addclient: base + '/client/addClient',
    getallclient: base + '/client/getAllClient',
    getallclientindex: base + '/client//getAllClientIndex',
    updateclient: base + '/client/updateClient',
    deleteclient: base + '/client/deleteClient/:id',
    getClientbyId: base + '/client/getClientbyid/:id',
    getcasebyclient: base + '/client/getCaseByClient/:clientId',
    bulkupload: base + '/client/bulkUpload'
  },
  Advocate: {
    addadvocate: base + '/advocate/addadvocate',
    getalladvocate: base + '/advocate/getalladvocate',
    updateadvocate: base + '/advocate//updateadvocate',
    deleteadvocate: base + '/advocate/deleteadvocate/:id',
    getadvocatebyid: base + '/advocate/getAdvocatebyId/:id',
    getcasebyadvocateid: base + '/advocate/getCasebyadvocateId/:advocateId'
  },
  Advice: {
    addadvice: base + '/advise/addAdvise',
    getalladvice: base + '/advise/getAdvise',
    getalladviceforpage: base + '/advise/getAdvforPage',
    getaadvice: base + '/advise/getoneAdvise/:id',
    updateadvice: base + '/advise/updateAdvise/:id',
    deleteadvice: base + '/advise/deleteAdvise/:id',
    paymnetupdate: base + '/advise/updateAdvisepayment'
  },
  Case: {
    addcase: base + '/case/addCase',
    getallcase: base + '/case/getCase',
    getallcaseforpage: base + '/case/getallCasepagination',
    getallcaserepo: base + '/report/getcaserepo',
    getcase: base + '/case/getCasebyid/:id',
    deletecases: base + '/case/deleteCase/:id',
    updatecases: base + '/case/updateCase/:id'
  },
  Judge: {
    addjudge: base + '/judge/addJudge',
    gettalljudge: base + '/judge/getAllJudge',
    gettalljudgepage: base + '/judge/getAllJudgepage',
    updatejudge: base + '/judge/updateJudge/:id',
    deltejudges: base + '/judge/deleteJudge/:id'
  },
  Court: {
    addcourt: base + '/court/addCourt',
    gettallcourt: base + '/court/getAllCourt',
    gettallcourtpage: base + '/court/getAllCourtpage',
    updatecourt: base + '/court/updateCourt/:id',
    deletecourt: base + '/court/deleteCourt/:id'
  },
  PracticeArea: {
    addPracticeArea: base + '/practicearea/addPracticearea',
    getllpracticearea: base + '/practicearea/getAllPracticearea',
    getllpracticeareapage: base + '/practicearea/getAllPracticeareapage',
    deletepracticearea: base + '/practicearea/deletePracticearea/:id',
    updatepracticearea: base + '/practicearea/updatePracticearea/:id'
  },
  PoliceStation: {
    addPoliceStation: base + '/policestation/addPolicestation',
    getAllPoliceStation: base + '/policestation/getAllPolicestation',
    getAllPoliceStationpage: base + '/policestation/getAllPolicestationpage',
    deletePoliceStation: base + '/policestation/deletePolicestation/:id',
    updatePoliceStation: base + '/policestation/updatePolicestation/:id'
  },
  Matter: {
    addmatter: base + '/matter/addMatter',
    getallmatter: base + '/matter/getAllMatter',
    deletematter: base + '/matter/deleteMatter/:id',
    updatematter: base + '/matter/updateMatter/:id'
  },
  Tag: {
    addTag: base + '/tag/addTag',
    getalltag: base + '/tag/getAllTag',
    deletetag: base + '/tag/deleteTag/:id',
    updatetag: base + '/tag/updateTag/:id'
  },
  CaseStage: {
    addCaseStage: base + '/casestage/addCaseStage',
    getallCaseStage: base + '/casestage/getAllCaseStage',
    getallCaseStagepage: base + '/casestage/getAllCaseStagepage',
    deleteCaseStage: base + '/casestage/deleteCaseStage/:id',
    updateCaseStage: base + '/casestage/updateCaseStage/:id'
  },
  ExpenseType: {
    addExpenseType: base + '/expensetype/addExpenseType',
    getallExpenseType: base + '/expensetype/getAllExpenseType',
    deleteExpenseType: base + '/expensetype/deleteExpenseType/:id',
    updateExpenseType: base + '/expensetype/updateExpenseType/:id'
  },
  Contact: {
    addcontact: base + '/contact/addContact',
    deletecontact: base + '/contact/deleteContact/:id',
    getcontact: base + '/contact/getContact',
    getcontactforpage: base + '/contact/getContactforpage',
    updatecontact: base + '/contact/updateContact/:id'
  },
  Note: {
    addnote: base + '/note/addNote',
    getallnote: base + '/note/getAllNote',
    getallnoteforpage: base + '/note/getAllNoteforpage',
    getnote: base + '/note/getNote/:id',
    updatenote: base + '/note/updateNote/:id',
    deletenote: base + '/note/deleteNote/:id'
  },
  Expense: {
    addexpenses: base + '/expense/addExpense',
    getallexpenses: base + '/expense/getAllExpense',
    getallexpforpage: base + '/expense/getAllExpforpage',
    getexpense: base + '/expense/getExpense/:id',
    updateexpense: base + '/expense/updateExpense/:id',
    deleteexpense: base + '/expense/deleteExpense/:id'
  },
  Hearing: {
    addhearing: base + '/hearing/addHearing',
    getcaseHearing: base + '/hearing/gethearingbycase/:caseId',
    getallhearing: base + '/hearing/getallhearing',
    getallhearingforpage: base + '/hearing/getallhearingforpage',
    getallhearingRepo: base + '/Report/gethearingrepo',
    gethearing: base + '/hearing/getHearing/:id',
    deletehearing: base + '/hearing/deleteHearing/:id',
    updatehearing: base + '/hearing/updateHearing/:id'
  },
  Evidence: {
    addevidence: base + '/evidence/addEvidence',
    getcaseEvidense: base + '/evidence/getevidencebycaseid/:caseId',
    getallevidence: base + '/evidence/getEvidence',
    getallevidenceforpage: base + '/evidence/getEvidenceforpage',
    getevidence: base + '/evidence/getEvidencebyId/:id',
    deleteevidence: base + '/evidence/deleteEvidence/:id',
    updateevidence: base + '/evidence/updateEvidence/:id'
  },
  Document: {
    documentadd: base + '/document/addDocument',
    getdocumentBycase: base + '/document/getDocumentbycase/:caseId',
    getalldocument: base + '/document/getAllDocument',
    getalldocforpage: base + '/document/getAllDocforpage',
    getdocumentbyid: base + '/document/getDocument/:id',
    deletedocument: base + '/document/deleteDocument/:id',
    updatedocument: base + '/document/updateDocument/:id'
  },
  Invoice: {
    create: base + '/invoice/addInvoice',
    getinvoicebycase: base + '/invoice/getinvoicebycase/:caseId',
    getallinvoice: base + '/invoice/getAllInvoice',
    getinvoiceByid: base + '/invoice/getInvoice/:id',
    updateinvoice: base + '/invoice/updateInvoice/:id',
    deleteinvoice: base + '/invoice/deleteInvoice/:id',
    invoicepayment: base + '/invoice/updateInvoicePayment'
  },
  ChatBot: {
    sendPrompt: base + '/chat/ask-ai'
  }
});
