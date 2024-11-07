import React, { useState } from "react";
import Mainbutn from "../../../common/buttons/Mainbutn";
import logo from "../../../../images/logo.svg";
import { PanelLeft } from "lucide-react";
export default function SideNav() {
  return (
    <div className='flex justify-between mb-2'>
      <div className='w-1/2'>
        <img className='' src={logo} alt='logo' />
      </div>
      <Mainbutn
        pading={"p-1"}
        bg={"bg-white"}
        hvr={"hover:bg-primary-300 hover:text-white"}
        border={"border-primary-100  border shadow-md"}
        text={"text-primary-300"}
      >
        <PanelLeft />
      </Mainbutn>
    </div>
  );
}
