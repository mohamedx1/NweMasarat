import React, { useState } from "react";
import { Camera, Volume1, Clipboard, LogOut, Play } from "lucide-react";
import Mainbutn from "./../../../common/buttons/Mainbutn";
import CustomSlider from "./../../../common/slider/CustomSlider";
type CustomStyles = {
  container?: React.CSSProperties;
  title?: React.CSSProperties;
  slider?: React.CSSProperties;
  progress?: React.CSSProperties;
  thumb?: React.CSSProperties;
  value?: React.CSSProperties;
};
export default function Settings() {
  const [sliderValue, setSliderValue] = useState(80);

  // Custom styles
  const customStyles: CustomStyles = {
    container: {
      width: "100%",
      maxWidth: "500px",
      borderRadius: "10px",
    },
    title: {
      fontSize: "10px",
      color: "#333",
      marginBottom: "20px",
    },
    slider: {
      height: "6px",
      backgroundColor: "#ddd",
    },
    progress: {
      backgroundColor: "#ffd700",
    },
    thumb: {
      width: "24px",
      height: "24px",
      backgroundColor: "#fff",
      border: "3px solid #ffd700",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    },
    value: {
      fontSize: "15px",
      color: "#666",
      marginTop: "1px",
    },
  };

  const handleValueChange = (newValue: number) => {
    setSliderValue(newValue);
    console.log("Slider value changed:", newValue);
    // You can perform additional actions here, like making an API call
  };
  return (
    <div className='mt-4'>
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
        <div className='text-gray-700'>تفعيل الكاميرا</div>
      </div>
      <div className='flex gap-4 mt-2'>
        <div className='my-auto'>
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
        <div>
          <div className='text-gray-700 '>
            <CustomSlider
              initialValue={sliderValue}
              onValueChange={handleValueChange}
              customStyles={customStyles}
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
        <div className='text-gray-700'>لوحة التحكم الأبوي</div>
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
        <div className='text-gray-700'>تسجيل الخروج</div>
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
        <div className='text-gray-700'>خذ جولة</div>
      </div>
    </div>
  );
}
