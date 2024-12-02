import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
// const LeadManagement = Loadable(lazy(() => import('views/Lead')));
const CasesManagement = Loadable(lazy(() => import('views/Case')));
const Notes= Loadable(lazy(() => import('views/Note')));
const Expenses = Loadable(lazy(() => import('views/Expense')));
const AdviceManagement = Loadable(lazy(() => import('views/Advice')));
const ClientManagement = Loadable(lazy(() => import('views/Client')));
const ContactManagement = Loadable(lazy(() => import('views/Contact')));
const Call = Loadable(lazy(() => import('views/Calls')));
const Hearing = Loadable(lazy(() => import('views/Hearing')));
const Invoice = Loadable(lazy(() => import('views/Invoice')));
const Email = Loadable(lazy(() => import('views/Email')));
const Evidence = Loadable(lazy(() => import('views/Evidence')));
const EmailTemplates = Loadable(lazy(() => import('views/EmailTemplates')));
const Document = Loadable(lazy(() => import('views/Documents')));
const Calender = Loadable(lazy(() => import('views/Calender')));
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
          children:[{

            path:"clientview",
            element:<AdviceManagement />
          }
          ]
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
          path: 'call',
          element: <Call />
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
          path: 'email',
          element: <Email />
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
          path: 'calender',
          element: <Calender />
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
          path: 'emailtemplate',
          element: <EmailTemplates />
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
