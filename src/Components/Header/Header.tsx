import { Link, NavLink } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";
import ThemeBtn from "../Custom/ToggleBtn";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const Header = () => {
  const isLoggedIn = useSelector((state: any) => state.auth.status);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `hover:text-blue-500 ${
      isActive ? "text-blue-500 font-semibold" : "text-gray-500"
    }`;

  // const navItems = [
  //   { to: "/", label: "Home" },
  //   { to: "/my-posts", label: "My Posts" },
  //   { to: "/create-post", label: "Add Post" },
  // ];

  const authNavItems = isLoggedIn
    ? [
        { to: "/my-posts", label: "My Posts" },
        { to: "/create-post", label: "Add Post" },
        { to: "/profile", label: "Profile" },
        { component: <LogoutBtn />, key: "logout" },
      ]
    : [{ to: "/login", label: "Login" }];
  return (
    <div className="shadow-lg bg-white dark:bg-gray-800 transition-colors">
      <nav>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            className="text-2xl font-bold dark:text-white hover:scale-105 transition"
            to="/"
          >
            Blog
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              <span className="italic">N</span>est
            </span>
          </Link>
          <nav>
            <ul className="flex items-center space-x-6">
              <li key="/home" className="hover:scale-105 transition">
                <NavLink to="/" className={navLinkClass}>
                  Home
                </NavLink>
              </li>
              {authNavItems.map((item) =>
                item.component ? (
                  <li key={item.key} className="hover:scale-105 transition">
                    {item.component}
                  </li>
                ) : (
                  <li key={item.to} className="hover:scale-105 transition">
                    <NavLink to={item.to} className={navLinkClass}>
                      {item.label}
                    </NavLink>
                  </li>
                )
              )}
              <li>
                <ThemeBtn />
              </li>
            </ul>
          </nav>
        </div>
      </nav>
    </div>
  );
};

export default Header;
