// import userImage from "../../../../images/userImage.jpg";
import { AvatarProgress } from "./avatar-progress";

// import AvatarImage from './AvatarImage';

export default function UserInfo() {
  return (
    <div className='  flex items-center gap-6  '>
      <div className=' p-1 w-14 rounded-full'>
        <AvatarProgress
          progress={82}
          src='/avatar.jpg'
          alt='User'
          size={64}
          strokeWidth={6}
          progressColor='#FFA500'
          backgroundColor='#E5E7EB'
        />
      </div>
      <div className=' flex-1'>
        <h2 className='text-text-lg font-semibold '>باسم صباح سعيد</h2>
        <p className='text-sm text-gray-500  '>
          {" "}
          الثاني الإعدادي - التقييم 56%
        </p>
      </div>
    </div>
  );
}
