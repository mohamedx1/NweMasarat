import React from "react";
import BootChatAvatat from "./../../../common/bootChatAvatar/BootChatAvatat";
import BootChatBody from "../../../common/bootChatAvatar/BootChatBody";

export default function ActivityCopmonent() {
  return (
    <div className=' h-screen flex justify-center relative'>
      <iframe
        className='mt-4 rounded-2xl'
        src='https://www.youtube.com/embed/V8wEa-mTLeY?si=6Tyu0zo2e0eZZup0'
        title='YouTube video player'
        width='90%'
        height='315'
      ></iframe>
      <div className='absolute w-32 bottom-6 left-5 z-30 '>
        <div className='bg-primary-300 rounded-full p-2 '>
          <BootChatAvatat emotion={0} />
        </div>
        <div className='flex justify-center -mt-5'>
          <BootChatBody />
        </div>
        <div className=' absolute top-0 left-40  p-2 w-60 shadow-lg bg-white   '>
          <span className='text-gray-700'>المساعد الآلي</span>
          <div className='text-center text-gray-500'>
            هل انت بخير ؟لاحظت انك لا تتابع الشرح بكامل تركيزك؟ فقط اخبرني عندما
            تكون متاح لاستكمال الدرس.
          </div>
        </div>
      </div>
    </div>
  );
}
