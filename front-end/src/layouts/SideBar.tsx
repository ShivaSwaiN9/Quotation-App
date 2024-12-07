import { dashboardArr } from '@/utils/Index';
import { useRouter } from 'next/router';
import React from 'react';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

export default function SideBar() {
  const router = useRouter();

  return (
    <aside className="w-52 py-5 h-screen bg-[#111827] text-white flex flex-col shadow-lg  ">
      <div
        className="flex items-center gap-2 text-white hover:text-violet-500 transition-colors duration-300 ease-in-out cursor-pointer mb-6 px-4"
        onClick={() => router.push('/')}
      >
        <PanoramaFishEyeIcon fontSize="large" />
        <span className="text-xl font-bold">INDOPRO</span>
      </div>
      {/* <div
        className="flex items-center gap-2 text-white hover:text-violet-500 transition-colors duration-300 ease-in-out cursor-pointer mb-6 px-4"
        onClick={() => router.push("/")}
      >
      <div className="w-full gap-x-2 flex justify-center items-center">
        <div className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full animate-bounce"></div>
        <div className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce"></div>
        <div className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce"></div>
        <span className="text-xl font-bold">INDOPRO</span>
      </div>
      </div> */}
      <div className="flex flex-col text-base font-semibold">
        {dashboardArr.map((item) => (
          <span
            key={item.id}
            className="flex items-center mb-2 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-700 hover:text-violet-500 transition-colors duration-300 ease-in-out"
            onClick={() => router.push(item.path)}
          >
            <h2 className="text-lg">{item.title}</h2>
          </span>
        ))}
      </div>
    </aside>
  );
}
