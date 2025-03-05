import React from "react";
import Image from "next/image";
import { BellIcon, GearIcon } from "@radix-ui/react-icons"; // Using Radix UI icons

const DashBoardHeader = () => {
    const user = {
        name: "John Doe",
        designation: "Software Engineer",
        avatar: "", // Avatar URL (leave empty to test fallback)
    };

    return (
        <div className="bg-white h-[50px] flex items-center justify-between px-4 rounded-xl shadow-sm">
            {/* Left Side: Avatar & Name */}
            <div className="flex items-center">
                {user.avatar ? (
                    <Image
                        src={user.avatar}
                        alt="User Avatar"
                        width={36}
                        height={36}
                        className="rounded-full"
                    />
                ) : (
                    <div className="w-9 h-9 flex items-center justify-center bg-gray-300 rounded-full text-white font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                )}
                <div className="ml-3 flex flex-col">
                    <span className="text-xs text-gray-500">Welcome Back</span>
                    <span className="text-sm font-semibold">{user.name}</span>
                </div>
            </div>

            {/* Right Side: Notification & Settings Icons */}
            <div className="flex items-center space-x-3">
                {/* Notification Icon with Badge */}
                <div className="relative">
                    <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 relative">
                        <BellIcon className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="absolute top-2 right-2 w-[5px] h-[5px] bg-red-500 rounded-full"></span>
                </div>

                <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100">
                    <GearIcon className="w-4 h-4 text-gray-600" />
                </button>
            </div>
        </div>
    );
};

export default DashBoardHeader;
