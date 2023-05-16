import { useState } from "react";
import {
  createStyles,
  Navbar,
  Group,
  Code,
  getStylesRef,
  rem,
} from "@mantine/core";
import { RiMovie2Fill, RiAccountCircleLine } from "react-icons/ri";
import { FaHome, FaSearch } from "react-icons/fa";
import {BiSearch} from 'react-icons/bi'
import {BsFillBookmarkHeartFill} from 'react-icons/bs'
import { MdExplore, MdOutlineSwitchAccount, MdLogout,MdSearch } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";

const menu = [
  { link: "/", label: "Home", icon: <FaHome size={"1.5rem"} /> },
  { link: "/explore", label: "Explore", icon: <MdExplore size={"1.5rem"} /> },
  { link: "/search", label: "Search", icon: <BiSearch size={"1.5rem"} /> },
];
const personal = [
  { link: "/bookmark", label: "Bookmarked", icon: <BsFillBookmarkHeartFill size={"1.5rem"}/> },
  { link: "/account", label: "Account", icon: <RiAccountCircleLine size={"1.5rem"}/> },
  { link: "/changeAccount", label: "Change account", icon: <MdOutlineSwitchAccount size={"1.5rem"}/> },
  { link: "/logout", label: "Logout", icon: <MdLogout size={"1.5rem"}/> },
];

export function SideBar() {

  const links = menu.map((item) => (
    <NavLink key={nanoid()} to={item.link}>
      <div className=" py-3  flex items-center w-3/4 pl-5">
        <div>{item.icon}</div>
        <div className="ml-3 text-md">{item.label}</div>
      </div>
    </NavLink>
  ));
  const Personal = personal.map((item) => (
    <NavLink key={nanoid()} to={item.link}>
      <div className=" py-3  flex items-center w-3/4 pl-5">
        <div>{item.icon}</div>
        <div className=" ml-3 text-md">{item.label}</div>
      </div>
    </NavLink>
  ));

  return (
    <Navbar
      width={{ sm: 250 }}
      className=" h-[100vh] sticky hidden lg:flex top-0 bg-gray-300 border-none"
      p="md"
    >
      <Navbar.Section>
        <Link to={'/'}>
          <div className="flex items-center mb-5 gap-2">
            <RiMovie2Fill size={"2.5rem"} className=" text-yellow-500" />
            <div className=" text-2xl font-semibold text-sky-400">
              CINEMA<span className="text-yellow-500">CLUB</span>
            </div>
          </div>
        </Link>
      </Navbar.Section>
      <Navbar.Section>
        <h1 className=" my-3 text-xl font-semibold select-none">Menu</h1>
        <div className=" flex flex-col">{links}</div>
      </Navbar.Section>
      <Navbar.Section>
        <h1 className=" my-3 font-semibold text-xl select-none">Personal</h1>
        <div className=" flex flex-col">{Personal}</div>
      </Navbar.Section>
    </Navbar>
  );
}
