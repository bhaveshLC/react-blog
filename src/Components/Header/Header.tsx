import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";
import Container from "../Container/Container";

const Header = () => {
  const isLoggedIn = useSelector((state: any) => state.status);
  const Logout = () => {};

  const navigation = useNavigate();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `hover:text-blue-500 ${
      isActive ? "text-blue-500 font-semibold" : "text-gray-500"
    }`;

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/posts", label: "All Posts" },
    { to: "/create-post", label: "Add Post" },
  ];

  const authNavItems = isLoggedIn
    ? [
        { to: "/profile", label: "Profile" },
        { component: <LogoutBtn />, key: "logout" },
      ]
    : [{ to: "/login", label: "Login" }];

  return (
    <Container>
      <nav className="">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link className="text-2xl font-bold hover:text-gray-200" to="/">
            My Blog
          </Link>
          <nav>
            <ul className="flex items-center space-x-6">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className={navLinkClass}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
              {authNavItems.map((item) =>
                item.component ? (
                  <li key={item.key}>{item.component}</li>
                ) : (
                  <li key={item.to}>
                    <NavLink to={item.to} className={navLinkClass}>
                      {item.label}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      </nav>
    </Container>
  );
};

export default Header;
