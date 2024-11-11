import React from "react";
import BootChatAvatat from "./../../../common/bootChatAvatar/BootChatAvatat";
import BootChatBody from "../../../common/bootChatAvatar/BootChatBody";
import AssisstantBot from "../../assistantBot/AssisstantBot";

export default function ActivityCopmonent() {
  return (
    <div className=' h-screen flex justify-center relative border-r border-r-gray-100'>
      <iframe
        className='mt-4 rounded-2xl'
        src='https://www.youtube.com/embed/V8wEa-mTLeY?si=6Tyu0zo2e0eZZup0'
        title='YouTube video player'
        width='90%'
        height='315'
      ></iframe>
      <AssisstantBot />
    </div>
  );
}
