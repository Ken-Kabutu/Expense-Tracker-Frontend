import { dashboard, expenses, logout, transactions, trend } from "./Icons";
export const menuItems = [
  {
    id: 1,
    icon: <i className="dashboard-icon"></i>,
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    id: 2,
    icon: <i className="income-icon"></i>,
    title: "Income",
    link: "/income",
  },
  {
    id: 3,
    icon: <i className="expenses-icon"></i>,
    title: "Expenses",
    link: "/expenses",
  },
  {
    id: 4,
    icon: <i className="signout-icon"></i>,
    title: "Sign Out",
    link: "/login",
  },
];
