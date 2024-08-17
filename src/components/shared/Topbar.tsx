"use client";

import React, { ChangeEvent, useState, KeyboardEvent, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBars,
  faTimes,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import MobileSearchBar from "@/components/shared/mobile/MobileSearchBar";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import LoggedInMenu from "../user/LoggedInMenu";
import LoggedOutMenu from "../user/LoggedOutMenu";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {getUserFullName} from "@/service/UserService";

export default function TopBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchUserFullName = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
        const fullName = await getUserFullName();
        setFirstName(fullName);
      }
    }

    fetchUserFullName();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("searchFilter", searchValue);
    newParams.set("page", "0");
    router.push(`/catalog?${newParams.toString()}`);
    setSearchValue("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-funkogram_red p-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <a href="/">
              <img className="h-20" src="/funkogram-logo.png" alt="Logo" />
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-12">
          <div className="md:hidden flex items-center">
            <FontAwesomeIcon
              icon={faSearch as IconProp}
              className="h-6 cursor-pointer"
              onClick={toggleSearch}
            />
          </div>
          <div className="hidden md:flex items-center">
            <input
              type="text"
              placeholder="Пребарај"
              className="w-100 h-10 px-4 py-2 rounded-tl-3xl rounded-bl-3xl bg-white text-black"
              value={searchValue}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            <FontAwesomeIcon
              icon={faSearch as IconProp}
              className="h-6 bg-yellow-700 px-4 py-2 rounded-tr-3xl rounded-br-3xl cursor-pointer"
              onClick={handleSearch}
            />
          </div>
          <div className="relative">
              <FontAwesomeIcon icon={faUser as IconProp} className="h-6 hover:text-yellow-700 cursor-pointer" onClick={toggleDropdown}/>
            {isDropdownOpen &&
              (isLoggedIn ? (
                <LoggedInMenu firstName={firstName} />
              ) : (
                <LoggedOutMenu />
              ))}
          </div>
          <a href="/cart" className="hover:text-yellow-700">
            <FontAwesomeIcon
              icon={faCartShopping as IconProp}
              className="h-6"
            />
          </a>
          <button onClick={toggleMenu} type="button" className="lg:hidden">
            {!isOpen ? (
              <FontAwesomeIcon icon={faBars as IconProp} className="h-6" />
            ) : (
              <FontAwesomeIcon icon={faTimes as IconProp} className="h-6" />
            )}
          </button>
        </div>
      </div>

      {isSearchOpen && <MobileSearchBar />}

      {isOpen && <Navbar isOpen={isOpen} />}
    </div>
  );
}
