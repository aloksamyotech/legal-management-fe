import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Profile from 'views/Client/ClientView';
import InvoiceForm from 'views/Case/CaseInvoice/InvoiceForm';
import { getPermissionFromToken } from 'core/comman/getpermission';
import { Navigate } from 'react-router';

// dashboard routing
const UserProfile = Loadable(lazy(() => import('views/Users/userView')));
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const AdvocateProfile = Loadable(lazy(() => import('views/Advocate/AdvocateView')));
const HearingView = Loadable(lazy(() => import('views/Hearing/HearingView')));
const AdviceView = Loadable(lazy(() => import('views/Advice/Adviceview')));
const CaseView = Loadable(lazy(() => import('views/Case/Caseview')));
const InvoiceView = Loadable(lazy(() => import('views/Invoice/Invoiceview')));
const EditInvoice = Loadable(lazy(() => import('views/Invoice/EditInvoce')));
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
const CasesReport = Loadable(lazy(() => import('views/Report/Report')));
const MainProfile = Loadable(lazy(() => import('views/Profiles-Field/index')));

// ==============================|| Function to get permission ||============================== //
const userPermissions = getPermissionFromToken();
const ProtectedRoute = ({ element, requiredPermission }) => {
  if (requiredPermission === 'dashboard') return element;
  return userPermissions.includes(requiredPermission.toLowerCase()) ? element : <Navigate to="/" replace />;
};
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
          element: <ProtectedRoute element={<ClientManagement />} requiredPermission="client" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'user/userview/:id',
          element: <ProtectedRoute element={<UserProfile />} requiredPermission="users" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'client/view/:id',
          element: <ProtectedRoute element={<Profile />} requiredPermission="client" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'advocate/view/:id',
          element: <ProtectedRoute element={<AdvocateProfile />} requiredPermission="advocate" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'Advocate',
          element: <ProtectedRoute element={<AdvocateManagement />} requiredPermission="advocate" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'advice',
          element: <ProtectedRoute element={<AdviceManagement />} requiredPermission="advice" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'advice/adviceview/:id',
          element: <ProtectedRoute element={<AdviceView />} requiredPermission="advice" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'cases',
          element: <ProtectedRoute element={<CasesManagement />} requiredPermission="cases" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'cases/casesview/:id',
          element: <ProtectedRoute element={<CaseView />} requiredPermission="cases" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'cases/casesview/invoice/:caseId',
          element: <ProtectedRoute element={<InvoiceForm />} requiredPermission="cases" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: '/dashboard/invoice/edit',
          element: <ProtectedRoute element={<EditInvoice />} requiredPermission="invoice" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'expenses',
          element: <ProtectedRoute element={<Expenses />} requiredPermission="expense" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'expenses/expenseview/:id',
          element: <ProtectedRoute element={<ExpenseView />} requiredPermission="expense" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'contact',
          element: <ProtectedRoute element={<ContactManagement />} requiredPermission="contacts" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'casestage',
          element: <ProtectedRoute element={<CaseStage />} requiredPermission="case stage" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'notes',
          element: <ProtectedRoute element={<Notes />} requiredPermission="notes" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'note/notesview/:id',
          element: <ProtectedRoute element={<NotesView />} requiredPermission="notes" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'hearing',
          element: <ProtectedRoute element={<Hearing />} requiredPermission="hearing" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'hearing/hearingview/:id',
          element: <ProtectedRoute element={<HearingView />} requiredPermission="hearing" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'evidence',
          element: <ProtectedRoute element={<Evidence />} requiredPermission="evidence" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'evidence/evidenceview/:id',
          element: <ProtectedRoute element={<EvidenceView />} requiredPermission="evidence" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'court',
          element: <ProtectedRoute element={<Court />} requiredPermission="court" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'invoice',
          element: <ProtectedRoute element={<Invoice />} requiredPermission="invoice" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'invoice/invoiceview',
          element: <ProtectedRoute element={<InvoiceView />} requiredPermission="invoice" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'judge',
          element: <ProtectedRoute element={<Judge />} requiredPermission="invoice" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'document',
          element: <ProtectedRoute element={<Document />} requiredPermission="document" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'document/documentview/:id',
          element: <ProtectedRoute element={<DocumentView />} requiredPermission="document" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'practicearea',
          element: <ProtectedRoute element={<PracticeArea />} requiredPermission="practice area" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'policestation',
          element: <ProtectedRoute element={<PoliceStation />} requiredPermission="police station" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'matter',
          element: <ProtectedRoute element={<Matter />} requiredPermission="matter" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'tag',
          element: <ProtectedRoute element={<Tag />} requiredPermission="tag" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'expensetype',
          element: <ProtectedRoute element={<ExpenseType />} requiredPermission="expense type" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'report',
          element: <ProtectedRoute element={<CasesReport />} requiredPermission="reports" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'users',
          element: <ProtectedRoute element={<Users />} requiredPermission="users" />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'profile',
          element: <ProtectedRoute element={<MainProfile />} requiredPermission="profile" />
        }
      ]
    },
    // {
    //   path: 'dashboard',
    //   children: [
    //     {
    //       path: 'loghistory',
    //       element: <ProtectedRoute element={<LoggedHistory />} requiredPermission="logged history" />
    //     }
    //   ]
    // },
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
