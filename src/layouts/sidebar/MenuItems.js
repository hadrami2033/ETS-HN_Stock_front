const Menuitems = [
  {
    title: "Home الرئيسية",
    icon: "home",
    href: "/",
  },
  {
    title: "Opperations العمليات",
    icon: "file-text",
    href: "/opperations",
  },
  {
    title: "Par date حسب التاريخ",
    icon: "clock",
    href: "/by_interval",
  },
  {
    title: "Alimentations دخل",
    icon: "",
    href: "/entrees",
  },
  {
    title: "Commissions",
    icon: "settings",
    items: [
      {
        title: "Retrait سحب",
        href: "/comm_retrait",
      },
      {
        title: "Versement إيداع",
        href: "/comm_versement",
      }
    ]
  },
  
];

export default Menuitems;
