import React from "react";
import UserInfo from "./userInfo/UserInfo";
import Subjects from "./subjects/Subjects";
import SideNav from "./sideNavInfo/SideNav";
import Settings from "./settings/settings";
import { useAppSelector } from "../../../store/hooks";

export default function UserSideBar() {
  const { isExpended } = useAppSelector((state) => state.sideBar);

  return (
    <>
      <div
        className={
          isExpended
            ? "transition-all duration-300 ease-in-out"
            : "transition-all duration-300 ease-in-out w-1/4"
        }
      >
        <div
          className={
            isExpended
              ? "h-screen p-4 flex flex-col justify-between   bg-neutral-200"
              : "h-screen p-2 flex flex-col justify-between items-center  bg-neutral-200"
          }
        >
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
