import { HomeDashboard, ManagementDashboard, Systemdashboard } from './dashboard';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [HomeDashboard, ManagementDashboard, Systemdashboard ].filter(Boolean)
};

export default menuItems;
