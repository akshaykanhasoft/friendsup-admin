// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Group from "@material-ui/icons/Group";
//import LibraryBooks from "@material-ui/icons/LibraryBooks";
import GroupChatIcon from "@material-ui/icons/ChatBubbleOutline";
import EventIcon from "@material-ui/icons/Event";
import CategoryIcon from "@material-ui/icons/Category";
//import BubbleChart from "@material-ui/icons/BubbleChart";
//import LocationOn from "@material-ui/icons/LocationOn";
//import Notifications from "@material-ui/icons/Notifications";
// core components/views for Admin layout
//import DashboardPage from "views/Dashboard/Dashboard.jsx";
import DashboardPage from "./views/Dashboard/Dashboard.jsx";
//import UserProfile from "./views/UserProfile/UserProfile.jsx";
//import UserProfile from "./views/UserProfile/UserProfile.jsx";
import TableList from "./views/TableList/TableList.jsx";
import GroupsList from './views/TableList/GroupsList.js';
import EventList from './views/TableList/EventList.js';
import MainCategory from './views/TableList/mainCategory.js';
import GroupChat from './views/TableList/GroupsList.js';
//import GroupDetails from './views/details/groupDetails'
//import Category from './';
//import Typography from "./views/Typography/Typography.jsx";
//import Icons from "./views/Icons/Icons.jsx";
//import Maps from "./views/Maps/Maps.jsx";
//import NotificationsPage from "./views/Notifications/Notifications.jsx";
// core components/views for RTL layout
//import RTLPage from "./views/RTLPage/RTLPage.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/friendsup-admin"
  },
  // {
  //   path: "/userProfile",
  //   name: "User Profile",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/friendsup-admin"
  // },
  {
    path: "/user",
    name: "Users",
    rtlName: "قائمة الجدول",
    icon: Person,
    component: TableList,
    layout: "/friendsup-admin"
  },
  {
    path: "/groups",
    name: "Groups",
    rtlName: "طباعة",
    icon: Group,
    component: GroupsList,
    layout: "/friendsup-admin"
  },
  {
    path: "/events",
    name: "Events",
    rtlName: "طباعة",
    icon: EventIcon,
    component: EventList,
    layout: "/friendsup-admin"
  },
  {
    path: "/maincategory",
    name: "MainCategory",
    rtlName: "طباعة",
    icon: CategoryIcon,
    component: MainCategory,
    layout: "/friendsup-admin"
  },
  {
    path: "/group_chat",
    name: "Group Chat",
    rtlName: "طباعة",
    icon: GroupChatIcon,
    component: GroupChat,
    layout: "/friendsup-admin"
  },
  // {
  //   path: "/admin/group_details/:id",
  //   component: GroupDetails,
  //   layout: "/friendsup-admin"
  // }
  
  // {
  //   path: "/category",
  //   name: "Category",
  //   rtlName: "طباعة",
  //   icon: LibraryBooks,
  //   component: EventList,
  //   layout: "/friendsup-admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/friendsup-admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   rtlName: "خرائط",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/friendsup-admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/friendsup-admin"
  // },

];

export default dashboardRoutes;
