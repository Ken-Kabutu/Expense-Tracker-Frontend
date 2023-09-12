import { dashboard, expenses, logout, transactions, trend } from "./Icons";
export const menuItems = [
  {
    id: 1,
    title: "Dashboard",
    icon: dashboard,
    link: "/",
  },
  {
    id: 2,
    icon: transactions,
    title: "Income",
    link: "/income",
  },
  {
    id: 3,
    icon: trend,
    title: "Expenses",
    link: "/expenses",
  },
  {
    id: 4,
    icon: logout,
    title: "Sign Out",
    link: "/login",
  },
];
