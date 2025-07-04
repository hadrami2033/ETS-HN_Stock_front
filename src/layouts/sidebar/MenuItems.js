const Menuitems = [
  {
    title: "Caisse",
    icon: "",
    href: "/",
  },
  {
    title: "Produits",
    icon: "file-text",
    href: "/products",
  },
  {
    title: "Historique de ventes",
    icon: "clock",
    href: "/by_interval",
  },
  {
    title: "Clients",
    icon: "users",
    href: "/clients",
  },
  {
    title: "Les dettes",
    icon: "",
    href: "/debts",
  },
  {
    title: "Gestion magasins",
    icon: "database",
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
  {
    title: "Gestion employés",
    icon: "users",
    items: [
      {
        title: "Les employés",
        href: "/employes",
      },
      {
        title: "Prets sur employés",
        href: "/prets",
      }
    ]
  }
  
];

export default Menuitems;
