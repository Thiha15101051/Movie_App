import React, { useState } from "react";
import {
  createStyles,
  Code,
  getStylesRef,
  rem,
} from "@mantine/core";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
import { Drawer, Group } from "@mantine/core";
import { RiMovie2Fill, RiAccountCircleLine } from "react-icons/ri";
import { FaHome, FaSearch } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import {
  MdExplore,
  MdOutlineSwitchAccount,
  MdLogout,
  MdSearch,
} from "react-icons/md";
import {AiOutlineMenu} from 'react-icons/ai'
import { useDispatch } from "react-redux";
import {
  reset_Category,
  reset_Mv_Page,
  reset_Tv_Page,
  reset_Type,
} from "../redux/features/counterSlice";
import { Link, NavLink } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { nanoid } from "@reduxjs/toolkit";
import '../App.css'

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

export default function Nav_bar() {

  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();

  function TypeChangeHandler() {
    dispatch(reset_Type());
    dispatch(reset_Mv_Page());
    dispatch(reset_Tv_Page());
    dispatch(reset_Category());
  }
  const links = menu.map((item) => (
    <NavLink key={nanoid()} to={item.link} onClick={() => close()}>
      <div className=" flex items-center w-3/4 pl-5 py-3">
        <div>{item.icon}</div>
        <div className="ml-3 text-md">{item.label}</div>
      </div>
    </NavLink>
  ));
  const Personal = personal.map((item) => (
    <NavLink key={nanoid()} to={item.link} onClick={() => close()}>
      <div className=" py-3 flex items-center w-3/4 pl-5">
        <div>{item.icon}</div>
        <div className=" ml-3 text-md">{item.label}</div>
      </div>
    </NavLink>
  ));

  return (
    <>
      <Navbar
        className={`opacity-90 shadow-lg border-none shadow-white fixed bg-gray-700 inset-0 z-10 h-max max-w-full block lg:hidden rounded-none py-2 px-4 lg:px-7 lg:py-3`}
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link id="RouterNavLink" to={"/"} className="flex items-center gap-3">
            <RiMovie2Fill size={"3rem"} className=" text-white" />
            <h1 className=" text-sky-400 text-3xl font-semibold">
              CINEMA<span className=" text-yellow-500">CLUB</span>
            </h1>
          </Link>
          <AiOutlineMenu onClick={open} size={"2rem"} />
        </div>
      </Navbar>
      {/* responsive drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        size="60%"
        overlayProps={{ opacity: 0.5, blur: 4 }}
      >
        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center gap-2">
          <RiMovie2Fill size={'2.5rem'} className=" text-yellow-500"/>
          <h1 className=" text-sky-400 text-3xl font-semibold">CINEMA<span className=" text-yellow-500">CLUB</span></h1>
          </div>
          <div className="">
            <h1 className="  text-2xl font-semibold mb-2">Menu</h1>
            <div>
              {links}
            </div>
          </div>
          <div className="">
            <h1 className="  text-2xl font-semibold mb-2">Personal</h1>
            <div>
              {Personal}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
