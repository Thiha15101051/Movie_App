import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
import {  Link, NavLink } from "react-router-dom";
import {BiCameraMovie} from 'react-icons/bi'
import { FaHome, FaSearch } from "react-icons/fa";
import { MdExplore } from "react-icons/md";

export default function Nav_bar() {

  const navList = (
    <ul className="flex items-center gap-5 lg:flex-row lg:items-center lg:gap-10">
      
        <NavLink id="RouterNavLink" to={"/"}>
          <FaHome size={"1.7rem"} className="text-black" />
        </NavLink>
      
        
        <NavLink id="RouterNavLink" to={"/explore"}>
          <MdExplore size={"1.7rem"} className="text-black" />
        </NavLink>
      
        <NavLink id="RouterNavLink" to={"/search"}>
          <FaSearch size={"1.7rem"} className="text-black" />
        </NavLink>
    </ul>
  );

  return (
    <>
      <Navbar className="sticky shadow-xl bg-sky-100 inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
            <Link id="RouterNavLink" to={'/'}> 
              <BiCameraMovie size={"3rem"} color="black"/>
            </Link>
          <div className="flex items-center gap-4">
            <div className="mr-4  lg:flex">{navList}</div>
          </div>
        </div>
      </Navbar>
    </>
  );
}
