import React from "react";
import UserInfo from "./userInfo/UserInfo";
import Subjects from "./subjects/Subjects";
import SideNav from "./sideNavInfo/SideNav";
import Settings from "./settings/settings";

export default function UserSideBar() {
  return (
    <>
      <div className=''>
        <div className='h-screen p-4 flex flex-col justify-between  '>
          <div>
            <SideNav />
            <UserInfo />
            <Subjects />
          </div>
          <Settings />
        </div>
      </div>
    </>
  );
}
