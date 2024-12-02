// assets
import DeckOutlinedIcon from '@mui/icons-material/DeckOutlined';
import {
  IconHome,
  IconCalendarEvent,
  IconMail,
  IconFileUpload,
  IconFileInvoice,
  IconPhoneCall,
  IconAntennaBars5,
  IconChecklist,
  IconNotebook,
  IconPhoneCheck,
  IconUsers
} from '@tabler/icons';

// constant
const icons = {
  IconHome,
  IconCalendarEvent,
  IconMail,
  IconFileUpload,
  IconFileInvoice,
  IconPhoneCall,
  IconAntennaBars5,
  IconChecklist,
  IconNotebook,
  IconPhoneCheck,
  IconUsers,
  DeckOutlinedIcon
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  title: 'Dashboard-Menu',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconHome,
      breadcrumbs: false
    },
    // {
    //   id: '01',
    //   title: 'Lead Management',
    //   type: 'item',
    //   url: '/dashboard/lead',
    //   icon: icons.IconAntennaBars5,
    //   breadcrumbs: false
    // },
    {
      id: '01',
      title: 'Client',
      type: 'item',
      url: '/dashboard/client',
      icon: icons.IconAntennaBars5,
      breadcrumbs: false
    },
    {
      id: '11',
      title: 'Advice',
      type: 'item',
      url: '/dashboard/advice',
      icon: icons.DeckOutlinedIcon,
      breadcrumbs: false
    },
    {
      id:"02",
      title:"Cases",
      type:'item',
      url:'/dashboard/cases',
      icon:icons.IconFileInvoice,
      breadcrumbs:true

    },
    {
      id: '03',
      title: 'Contact Management',
      type: 'item',
      url: '/dashboard/contact',
      icon: icons.IconPhoneCheck,
      breadcrumbs: false
    },
    {
      id: '04',
      title: 'Hearing',
      type: 'item',
      url: '/dashboard/hearing',
      icon: icons.IconNotebook,
      breadcrumbs: false
    },
    {
      id: '05',
      title: 'Evidence',
      type: 'item',
      url: '/dashboard/evidence',
      icon: icons.IconChecklist,
      breadcrumbs: false
    },
    {
      id: '06',
      title: 'Invoice',
      type: 'item',
      url: '/dashboard/invoice',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: '12',
      title: 'Calls',
      type: 'item',
      url: '/dashboard/call',
      icon: icons.IconPhoneCall,
      breadcrumbs: false
    },
    {
      id: '07',
      title: 'Emails',
      type: 'item',
      url: '/dashboard/email',
      icon: icons.IconMail,
      breadcrumbs: false
    },
    {
      id: '08',
      title: 'Calender',
      type: 'item',
      url: '/dashboard/calender',
      icon: icons.IconCalendarEvent,
      breadcrumbs: false
    },
    {
      id: '09',
      title: 'Document Management',
      type: 'item',
      url: '/dashboard/document',
      icon: icons.IconFileUpload,
      breadcrumbs: false
    },
    {
      id: '10',
      title: 'Email Template',
      type: 'item',
      url: '/dashboard/emailtemplate',
      icon: icons.IconFileInvoice,
      breadcrumbs: false
    },
    {
      id:"13",
      title:"Expense",
      type:'item',
      url:'/dashboard/expenses',
      icon:icons.IconFileInvoice,
      breadcrumbs:true

    },
    {
      id:"14",
      title:"Note",
      type:'item',
      url:'/dashboard/notes',
      icon:icons.IconFileInvoice,
      breadcrumbs:true

    }

  ]
};

export default dashboard;
