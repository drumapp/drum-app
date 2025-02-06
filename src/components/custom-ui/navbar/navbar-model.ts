
export interface INavbarItem {
      title: string,
      href: string,
      subItems?: INavbarSubItem[]
}
export interface INavbarSubItem {
      title: string,
      href: string,
}
export const navbarItems: INavbarItem[] = [
      {
        title: "Dashboard",
        href: "/dashboard",
      },
      {
        title: "CRM",
        href: "/crm",
        subItems: [
          { title: "Clients", href: "/crm/clients" },
          { title: "Prospects", href: "/crm/prospects" },
          { title: "Contacts", href: "/crm/contacts" },
        ],
      },
      {
        title: "Ventes",
        href: "/ventes",
        subItems: [
          { title: "Devis", href: "/ventes/devis" },
          { title: "Commandes", href: "/ventes/commandes" },
          { title: "Factures", href: "/ventes/factures" },
        ],
      },
      {
        title: "Achat",
        href: "/achat",
        subItems: [
          { title: "Fournisseurs", href: "/achat/fournisseurs" },
          { title: "Commandes", href: "/achat/commandes" },
          { title: "Réceptions", href: "/achat/receptions" },
        ],
      },
      {
        title: "Catalogue",
        href: "/catalogue",
        subItems: [
          { title: "Produits", href: "/items" },
          { title: "Catégories", href: "/catalogue/categories" },
          { title: "Inventaire", href: "/catalogue/inventory" },
        ],
      },
      {
        title: "Tresorerie",
        href: "/tresorerie",
        subItems: [
          { title: "Encaissements", href: "/tresorerie/encaissements" },
          { title: "Décaissements", href: "/tresorerie/decaissements" },
          { title: "Banque", href: "/tresorerie/banque" },
        ],
      },
      {
        title: "Affaires",
        href: "/affaires",
        subItems: [
          { title: "Projets", href: "/affaires/projets" },
          { title: "Opportunités", href: "/affaires/opportunites" },
          { title: "Suivi", href: "/affaires/suivi" },
        ],
      },
      {
        title: "Personnel",
        href: "/personnel",
        subItems: [
          { title: "Employés", href: "/personnel/employes" },
          { title: "Congés", href: "/personnel/conges" },
          { title: "Paie", href: "/personnel/paie" },
        ],
      },
      {
        title: "Statistiques",
        href: "/statistiques",
        subItems: [
          { title: "Ventes", href: "/statistiques/ventes" },
          { title: "Achats", href: "/statistiques/achats" },
          { title: "Performance", href: "/statistiques/performance" },
        ],
      },
      {
        title: "Paramètres",
        href: "/parametres",
        subItems: [
          { title: "Général", href: "/parametres/general" },
          { title: "Utilisateurs", href: "/parametres/utilisateurs" },
          { title: "Sécurité", href: "/parametres/securite" },
        ],
      },
    ]