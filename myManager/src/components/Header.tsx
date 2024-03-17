import React from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button";

function Header() {
  return (
    <header className="h-auto w-full flex items-center justify-between p-2 px-4 border border-x-0 bg-white border-y-0 border-b-2 border-emerald-400 shadow-sm ">
      <div className="p-2 ms-2 text-lg font-[500] text-nowrap  w-full">
        Product Filter Table
      </div>
      <div className="flex justify-end items-center w-full mx-3 p-2 gap-3">
        <NavLink to="/form/create">
          <Button
            code="success"
            variant="ghost"
            label="Add Product"
            onClick={() => {}}
            size="sm"
          />
        </NavLink>
        <NavLink to="/home">
          <Button
            code="primary"
            variant="ghost"
            label="Home"
            onClick={() => {}}
            size="sm"
          />
        </NavLink>
      </div>
    </header>
  );
}

export default Header;