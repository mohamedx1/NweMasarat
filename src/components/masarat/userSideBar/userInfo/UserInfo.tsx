// import userImage from "../../../../images/userImage.jpg";
import { useAppSelector } from "../../../../store/hooks";
import { AvatarProgress } from "./avatar-progress";

// import AvatarImage from './AvatarImage';

export default function UserInfo() {
  const { isExpended } = useAppSelector((state) => state.sideBar);

  return (
    <div
      className={
        isExpended
          ? "  flex items-center gap-6  "
          : "gap-0 h-12 w-fit overflow-hidden block "
      }
    >
      <div className=' p-1 w-14 rounded-full'>
        <AvatarProgress
          progress={82}
          src='/avatar.jpg'
          alt='User'
          size={isExpended ? 64 : 40}
          strokeWidth={isExpended ? 6 : 3}
          progressColor='#FFA500'
          backgroundColor='#E5E7EB'
        />
      </div>
      <div className={isExpended ? " flex-1" : "w-0 overflow-hidden"}>
        <h2 className='text-text-lg font-semibold '>باسم صباح سعيد</h2>
        <p className='text-sm text-gray-500  '>
          {" "}
          الثاني الإعدادي - التقييم 56%
        </p>
      </div>
    </div>
  );
}
