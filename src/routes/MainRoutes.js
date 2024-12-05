import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Profile from 'views/Client/ClientView';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
// const LeadManagement = Loadable(lazy(() => import('views/Lead')));
const CasesManagement = Loadable(lazy(() => import('views/Case')));
const Notes= Loadable(lazy(() => import('views/Note')));
const Expenses = Loadable(lazy(() => import('views/Expense')));
const AdviceManagement = Loadable(lazy(() => import('views/Advice')));
const ClientManagement = Loadable(lazy(() => import('views/Client')));
const ContactManagement = Loadable(lazy(() => import('views/Contact')));
const CaseStage = Loadable(lazy(() => import('views/CaseStage')));
const Hearing = Loadable(lazy(() => import('views/Hearing')));
const Invoice = Loadable(lazy(() => import('views/Invoice')));
const Court = Loadable(lazy(() => import('views/Court')));
const Evidence = Loadable(lazy(() => import('views/Evidence')));
const PracticeArea = Loadable(lazy(() => import('views/PracticeArea')));
const Document = Loadable(lazy(() => import('views/Documents')));
const Judge = Loadable(lazy(() => import('views/Judge')));
const PoliceStation = Loadable(lazy(() => import('views/PoliceStation')));
const Tag= Loadable(lazy(() => import('views/Tag')));
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
          element: <ClientManagement/>,
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'client/view',
          element: <Profile/>,
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
          path: 'cases',
          element: <CasesManagement />
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
          path: 'hearing',
          element: <Hearing />
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'evidence',
          element: <Evidence/>
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'court',
          element: <Court/>
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
          element: <PoliceStation/>
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'matter',
          element: <Matter/>
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'tag',
          element: <Tag/>
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'expensetype',
          element: <ExpenseType/>
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'users',
          element: <Users/>
        }
      ]
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'loghistory',
          element: <LoggedHistory/>
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
