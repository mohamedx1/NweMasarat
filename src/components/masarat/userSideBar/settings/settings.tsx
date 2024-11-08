import React, { useState } from "react";
import { Camera, Volume1, Clipboard, LogOut, Play } from "lucide-react";
import Mainbutn from "./../../../common/buttons/Mainbutn";
import CustomSlider from "./../../../common/slider/CustomSlider";
import { useAppSelector } from "../../../../store/hooks";

export default function Settings() {
  const [sliderValue, setSliderValue] = useState(80);
  const { isExpended } = useAppSelector((state) => state.sideBar);
  // Custom styles

  const handleValueChange = (newValue: number) => {
    setSliderValue(newValue);
    console.log("Slider value changed:", newValue);
    // You can perform additional actions here, like making an API call
  };
  return (
    <div className='mt-4 '>
      <div className='flex gap-4 mt-2'>
        <Mainbutn
          pading={"p-1"}
          bg={"bg-white"}
          hvr={"hover:bg-primary-300 hover:text-white"}
          border={"border-primary-100  border shadow-md"}
          text={"text-primary-300"}
        >
          <Camera />
        </Mainbutn>
        <div
          className={
            isExpended ? "text-gray-700 w-1/2 " : "w-0 overflow-hidden "
          }
        >
          تفعيل الكاميرا
        </div>
      </div>
      <div className={"flex gap-4 mt-2"}>
        <div className='my-auto '>
          <Mainbutn
            pading={"p-1"}
            bg={"bg-white"}
            hvr={"hover:bg-primary-300 hover:text-white"}
            border={"border-primary-100  border shadow-md"}
            text={"text-primary-300"}
          >
            <Volume1 />
          </Mainbutn>
        </div>
        <div className=''>
          <div
            className={
              isExpended
                ? "text-gray-700 "
                : "hidden transition-all duration-300 ease-in-out"
            }
          >
            <CustomSlider
              initialValue={sliderValue}
              onValueChange={handleValueChange}
            />
          </div>
        </div>
      </div>
      <div className='flex gap-4 mt-2'>
        <Mainbutn
          pading={"p-1"}
          bg={"bg-white"}
          hvr={"hover:bg-primary-300 hover:text-white"}
          border={"border-primary-100  border shadow-md"}
          text={"text-primary-300"}
        >
          <Clipboard />
        </Mainbutn>
        <div
          className={
            isExpended
              ? "text-gray-700 w-fit"
              : "w-0 overflow-hidden transition-all duration-300 ease-in-out"
          }
        >
          لوحة التحكم الأبوي
        </div>
      </div>
      <div className='flex gap-4 mt-2'>
        <Mainbutn
          pading={"p-1"}
          bg={"bg-white"}
          hvr={"hover:bg-primary-300 hover:text-white"}
          border={"border-primary-100  border shadow-md"}
          text={"text-primary-300"}
        >
          <LogOut />
        </Mainbutn>
        <div
          className={
            isExpended
              ? "text-gray-700  transition-all duration-300 ease-in-out"
              : "w-0 overflow-hidden transition-all duration-300 ease-in-out "
          }
        >
          تسجيل الخروج
        </div>
      </div>
      <div className='flex gap-4 mt-2'>
        <Mainbutn
          pading={"p-1"}
          bg={"bg-white"}
          hvr={"hover:bg-primary-300 hover:text-white"}
          border={"border-primary-100  border shadow-md"}
          text={"text-primary-300"}
        >
          <Play />
        </Mainbutn>
        <div className={isExpended ? "text-gray-700" : "w-0 overflow-hidden "}>
          خذ جولة
        </div>
      </div>
    </div>
  );
}
