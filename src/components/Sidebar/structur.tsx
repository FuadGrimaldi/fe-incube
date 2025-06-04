const sidebarStructure = [
  {
    id: "dashboard",
    title: "Dashboard",
    name: "dasbor",
    parent: true,
    icon: "dasbor",
    link: "/dashboard",
  },
  {
    id: "report",
    title: "Report",
    name: "report",
    parent: true,
    icon: "mou",
    link: "/dashboard/report",
  },
  {
    id: "controlling",
    title: "Controlling",
    name: "controlling",
    parent: true,
    icon: "pusatunduhdata",
    child: [
      {
        id: "input-telur",
        title: "eggs Monitoring",
        name: "input-telur",
        link: "/dashboard/eggs-monitoring",
        icon: "dot",
      },
      {
        id: "input-aktuator",
        title: "Incube Control",
        name: "input-aktuator",
        link: "/dashboard/controlling",
        icon: "dot",
      },
    ],
  },
  {
    id: "setting",
    title: "Setting",
    name: "setting",
    parent: true,
    icon: "perusahaan",
    link: "/dashboard/setting",
  },
  {
    id: "logout",
    title: "Logout",
    name: "Logout",
    parent: true,
    icon: "perusahaan",
    link: "/logout",
  },
];

export { sidebarStructure };
