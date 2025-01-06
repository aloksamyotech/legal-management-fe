import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Profile from 'views/Client/ClientView';
import InvoiceForm from 'views/Case/CaseInvoice/InvoiceForm';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const AdvocateProfile = Loadable(lazy(() => import('views/Advocate/AdvocateView')));
const HearingView = Loadable(lazy(() => import('views/Hearing/HearingView')));
const AdviceView = Loadable(lazy(() => import('views/Advice/Adviceview')));
const CaseView = Loadable(lazy(() => import('views/Case/Caseview')));
const InvoiceView = Loadable(lazy(() => import('views/Invoice/Invoiceview')));
const CasesManagement = Loadable(lazy(() => import('views/Case')));
const Notes = Loadable(lazy(() => import('views/Note')));
const Expenses = Loadable(lazy(() => import('views/Expense')));
const AdviceManagement = Loadable(lazy(() => import('views/Advice')));
const ClientManagement = Loadable(lazy(() => import('views/Client')));
const AdvocateManagement = Loadable(lazy(() => import('views/Advocate')));
const ContactManagement = Loadable(lazy(() => import('views/Contact')));
const CaseStage = Loadable(lazy(() => import('views/CaseStage')));
const Hearing = Loadable(lazy(() => import('views/Hearing')));
const Invoice = Loadable(lazy(() => import('views/Invoice')));
const Court = Loadable(lazy(() => import('views/Court')));
const Evidence = Loadable(lazy(() => import('views/Evidence')));
const PracticeArea = Loadable(lazy(() => import('views/PracticeArea')));
const Document = Loadable(lazy(() => import('views/Documents')));
const Judge = Loadable(lazy(() => import('views/Judge')));
const EvidenceView = Loadable(lazy(() => import('views/Evidence/EvidenceView')));
const DocumentView = Loadable(lazy(() => import('views/Documents/DocumentView')));
const NotesView = Loadable(lazy(() => import('views/Note/NotesView')));
const ExpenseView = Loadable(lazy(() => import('views/Expense/expenseview')));
const PoliceStation = Loadable(lazy(() => import('views/PoliceStation')));
const Tag = Loadable(lazy(() => import('views/Tag')));
const Matter = Loadable(lazy(() => import('views/Matter')));
const ExpenseType = Loadable(lazy(() => import('views/ExpenseType')));
const Users = Loadable(lazy(() => import('views/Users')));
const LoggedHistory = Loadable(lazy(() => import('views/LoggedHistory')));
const AddTemplates = Loadable(lazy(() => import('views/EmailTemplates/AddTemplates')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },

    {
      path: 'dashboard',
      children: [
        {
          path: 'client',
          element: <ClientManagement />,
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'client/view/:id',
          element: <Profile />,
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'advocate/view/:id',
          element: <AdvocateProfile />,
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'Advocate',
          element: <AdvocateManagement />,
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'advice',
          element: <AdviceManagement />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'advice/adviceview/:id',
          element: <AdviceView />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'cases',
          element: <CasesManagement />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'cases/casesview/:id',
          element: <CaseView />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'cases/casesview/invoice',
          element: <InvoiceForm />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'expenses',
          element: <Expenses />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'expenses/expenseview/:id',
          element: <ExpenseView />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'contact',
          element: <ContactManagement />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'casestage',
          element: <CaseStage />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'notes',
          element: <Notes />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'note/notesview/:id',
          element: <NotesView />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'hearing',
          element: <Hearing />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'hearing/hearingview/:id',
          element: <HearingView />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'evidence',
          element: <Evidence />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'evidence/evidenceview/:id',
          element: <EvidenceView />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'court',
          element: <Court />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'invoice',
          element: <Invoice />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'invoice/invoiceview',
          element: <InvoiceView />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'judge',
          element: <Judge />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'document',
          element: <Document />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'document/documentview/:id',
          element: <DocumentView />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'practicearea',
          element: <PracticeArea />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'policestation',
          element: <PoliceStation />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'matter',
          element: <Matter />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'tag',
          element: <Tag />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'expensetype',
          element: <ExpenseType />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'users',
          element: <Users />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'loghistory',
          element: <LoggedHistory />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'emailtemplate/addTemplates',
          element: <AddTemplates />
        }
      ]
    }
  ]
};

export default MainRoutes;
