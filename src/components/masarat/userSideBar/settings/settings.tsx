import React, { useState } from "react";
import {
  Camera,
  CameraOff,
  Volume1,
  Clipboard,
  LogOut,
  Play,
} from "lucide-react";
import Mainbutn from "./../../../common/buttons/Mainbutn";
import CustomSlider from "./../../../common/slider/CustomSlider";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { toggleModal } from "../../../../store/modalCollaps/ModalCollapseSlice";
export default function Settings() {
  const [sliderValue, setSliderValue] = useState(80);
  const { isExpended } = useAppSelector((state) => state.sideBar);

  const handleClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      console.log("Camera access granted.");
      // You can use the stream (e.g., attach it to a video element)
      // Stop the stream if needed
      stream.getTracks().forEach((track) => track.stop());
    } catch (error: any) {
      if (error.name === "NotAllowedError") {
        console.log("Camera access denied.");
      } else {
        console.error("Error accessing the camera:", error);
      }
    }
  };
  // Custom styles

  const handleValueChange = (newValue: number) => {
    setSliderValue(newValue);
    console.log("Slider value changed:", newValue);
    // You can perform additional actions here, like making an API call
  };
  return (
    <div className={`mt-4 ${isExpended ? "" : "mx-auto"} `}>
      <div className={`flex  mt-2 ${isExpended ? "gap-4" : "items-center"}`}>
        <Mainbutn
          pading={"p-1"}
          bg={"bg-white"}
          hvr={"hover:bg-primary-300 hover:text-white"}
          border={"border-primary-100  border shadow-md"}
          text={"text-primary-300"}
          onClick={handleClick}
        >
          {<Camera />}
        </Mainbutn>
        <div
          className={
            isExpended ? "text-gray-700 w-1/2 " : "w-0 overflow-hidden "
          }
        >
          تفعيل الكاميرا
        </div>
      </div>
      <div className={`flex  mt-2 ${isExpended ? "gap-4" : "items-center"}`}>
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
      <div className={`flex  mt-2 ${isExpended ? "gap-4" : "items-center"}`}>
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
      <div className={`flex  mt-2 ${isExpended ? "gap-4" : "items-center"}`}>
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
      <div className={`flex  mt-2 ${isExpended ? "gap-4" : "items-center"}`}>
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
