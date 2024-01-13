import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import {MembersTable} from "views/admin/investor/investor";
import Properties from "views/admin/marketplace/Properties/New_Property";

import { EmailComponent } from "views/admin/marketplace/Email/CreateEmail";

import { Opentask } from "views/admin/Tasks/components/opentasks";

import Emailpage from "views/admin/marketplace/Email/Emailpage";

import Document from "documents/document";

import Notification from "Notifications/Notification";

import Chat from "Chat/Chat";
// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdEmail,
} from "react-icons/md";
import { BsBuilding } from "react-icons/bs";
import { FaHouseUser } from "react-icons/fa";
import { ChatBubble, NotificationAdd, ReportGmailerrorred } from "@mui/icons-material";
import { ChatBubbleBottomCenterIcon, DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import NotificationIcon from "components/icons/NotificationIcon";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Properties",
    layout: "/admin",
    path: "properties",
    icon: <FaHouseUser className="h-5 w-5" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Investor Profile",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <MembersTable />,
  },
  {
    name: "Conversation",
    layout: "/admin",
    path: "chat",
    icon: <ChatBubbleBottomCenterIcon className="h-5 w-5" />,
    component: <Chat />,
  },
  {
    name: "Create Email",
    layout: "/admin",
    path: "email",
    icon: <MdEmail className="h-5 w-5" />,
    component: <EmailComponent />,
  },
  {
    name: "Your Tasks",
    layout: "/admin",
    path: "tasks",
    icon: <MdOutlineShoppingCart className="h-5 w-5" />,
    component: <Opentask />,
  },
  {
    name: "Email Lists",
    layout: "/admin",
    path: "lists",
    icon: <MdEmail className="h-5 w-5" />,
    component: <Emailpage />,
  },
  {
    name: "Documents",
    layout: "/admin",
    path: "documents",
    icon: <DocumentArrowDownIcon className="h-5 w-5" />,
    component: <Document />,
  },
  {
    name: "Notifications",
    layout: "/admin",
    path: "notifications",
    icon: <NotificationAdd className="h-5 w-5" />,
    component: <Notification />,
  },
  {
    name: "Reports",
    layout: "/admin",
    path: "reports",
    icon: <ReportGmailerrorred className="h-4 w-4" />,
   
  }
];
export default routes;
