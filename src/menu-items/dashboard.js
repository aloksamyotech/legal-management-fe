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
  IconMap,
  IconUsers,
  IconClipboardText,
  IconMenu,
  IconUserCircle
} from '@tabler/icons';
import SpeakerGroupIcon from '@mui/icons-material/SpeakerGroup';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { getPermissionFromToken } from 'core/comman/getpermission';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
// constant
const icons = {
  IconMap,
  IconMenu,
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
  DeckOutlinedIcon,
  SpeakerGroupIcon,
  AssuredWorkloadIcon,
  ConfirmationNumberOutlinedIcon,
  IconClipboardText,
  IconUserCircle,
  LabelOutlinedIcon
};
const Permission = getPermissionFromToken();

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const filterMenuItems = (menu) => {
  const filteredChildren = menu.children
    .map((item) => {
      if (item.type === 'collapse') {
        item.children = item.children.filter((subItem) => Permission?.includes(subItem.title.toLowerCase()));
        return item.children.length > 0 ? item : null;
      }
      return Permission?.includes(item.title.toLowerCase()) ? item : null;
    })
    .filter(Boolean);

  return filteredChildren.length > 0 ? { ...menu, children: filteredChildren } : null;
};
export const HomeDashboard = filterMenuItems({
  title: 'Home',
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

    {
      title: 'Staff Management',
      type: 'collapse',
      icon: icons.IconUsers,
      children: [
        {
          id: '20',
          title: 'Users',
          type: 'item',
          url: '/dashboard/users',
          breadcrumbs: false
        }
        // {
        //   id: '19',
        //   title: 'Logged History',
        //   type: 'item',
        //   url: '/dashboard/loghistory',

        //   breadcrumbs: false
        // }
      ]
    }
  ]
});

export const ManagementDashboard = filterMenuItems({
  title: 'Bussiness Management',
  type: 'group',
  children: [
    {
      id: '01',
      title: 'Client',
      type: 'item',
      url: '/dashboard/client',
      icon: PersonOutlineIcon,
      breadcrumbs: false
    },
    {
      id: '21',
      title: 'Advocate',
      type: 'item',
      url: '/dashboard/advocate',
      icon: icons.SpeakerGroupIcon,
      breadcrumbs: false
    },
    {
      id: '07',
      title: 'Advice',
      type: 'item',
      url: '/dashboard/advice',
      icon: icons.DeckOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: '02',
      title: 'Cases',
      type: 'item',
      url: '/dashboard/cases',
      icon: icons.IconFileInvoice,
      breadcrumbs: true
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
      icon: icons.AssuredWorkloadIcon,
      breadcrumbs: false
    },
    {
      id: '08',
      title: 'Document',
      type: 'item',
      url: '/dashboard/document',
      icon: icons.IconFileUpload,
      breadcrumbs: false
    },

    {
      id: '09',
      title: 'Expense',
      type: 'item',
      url: '/dashboard/expenses',
      icon: icons.IconFileInvoice,
      breadcrumbs: true
    },
    {
      id: '03',
      title: 'Contacts',
      type: 'item',
      url: '/dashboard/contact',
      icon: icons.IconPhoneCheck,
      breadcrumbs: false
    },
    {
      id: '10',
      title: 'Notes',
      type: 'item',
      url: '/dashboard/notes',
      icon: icons.IconFileInvoice,
      breadcrumbs: true
    }
  ]
});
export const Systemdashboard = filterMenuItems({
  title: 'System Setup',
  type: 'group',
  children: [
    {
      title: 'Master',
      type: 'collapse',
      icon: icons.IconMap,
      children: [
        {
          id: '11',
          title: 'Case Stage',
          type: 'item',
          url: '/dashboard/casestage',
          breadcrumbs: true
        },
        {
          id: '12',
          title: 'Court',
          type: 'item',
          url: '/dashboard/court',
          breadcrumbs: true
        },
        {
          id: '13',
          title: 'Judge',
          type: 'item',
          url: '/dashboard/judge',
          breadcrumbs: false
        },
        {
          id: '14',
          title: 'Practice Area',
          type: 'item',
          url: '/dashboard/practicearea',
          breadcrumbs: false
        },
        {
          id: '15',
          title: 'Police Station',
          type: 'item',
          url: '/dashboard/policestation',
          breadcrumbs: false
        }
      ]
    },

    {
      id: '16',
      title: 'Matter',
      type: 'item',
      url: '/dashboard/matter',
      icon: icons.ConfirmationNumberOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: '17',
      title: 'Tag',
      type: 'item',
      url: '/dashboard/tag',
      icon: icons.LabelOutlinedIcon,
      breadcrumbs: false
    },
    {
      id: '18',
      title: 'Expense Type',
      type: 'item',
      url: '/dashboard/expensetype',
      icon: icons.IconMenu,
      breadcrumbs: false
    },
    {
      id: '22',
      title: 'Reports',
      type: 'item',
      url: '/dashboard/report',
      icon: icons.IconClipboardText,
      breadcrumbs: false
    },
    {
      id: '23',
      title: 'Profile',
      type: 'item',
      url: '/dashboard/profile',
      icon: icons.IconUserCircle,
      breadcrumbs: false
    }
  ]
});
