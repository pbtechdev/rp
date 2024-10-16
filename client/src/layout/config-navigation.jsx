import Iconify from "../components/iconify";
// ----------------------------------------------------------------------

const navConfig = [
  {
    title: "Dashboard",
    path: "/",
    icon: <Iconify icon="mingcute:home-7-fill" />,
  },
  {
    title: "Users",
    icon: <Iconify icon="fa6-solid:users-gear" />,
    children: [
      {
        title: "Users List",
        path: "/users-list",
      },
    ],
  },
  {
    title: "Attendance",
    icon: <Iconify icon="mdi:timetable" />,
    children: [
      {
        title: "Employee Status",
        path: "/employee-status-page",
      },
      
    ],
  },
];

export default navConfig;
