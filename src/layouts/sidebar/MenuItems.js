const Menuitems = [
  {
    title: "Home الرئيسية",
    icon: "home",
    href: "/",
  },
  {
    title: "Produits",
    icon: "file-text",
    href: "/products",
  },
  {
    title: "Les achats",
    icon: "clock",
    href: "/by_interval",
  },
  {
    title: "Clients",
    icon: "users",
    href: "/clients",
  },
  {
    title: "Alimentations",
    icon: "",
    href: "/entrees",
  },
  {
    title: "Gestion magasins",
    icon: "settings",
    items: [
      {
        title: "Mouvement de stock",
        href: "/stockmouvments",
      },
      {
        title: "Les magasins",
        href: "/magasins",
      }
    ]
  },
  
];

export default Menuitems;
