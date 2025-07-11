import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

const Course = () => {
  return (
    <div className="overflow-hidden rounded-lg dark:bg-gray-800 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtdbgK5RvawybzSuAJuufqXz6HMdX-FoqrQw&s"
        alt=""
        className="w-full object-cover rouned-t-lg"
      />
      <div className="px-4 py-2 ">
        <h1 className="text-base font-bold hover:underline truncate mb-2">
          Course Title
        </h1>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-bold text-xs">Username</h1>
          </div>
          <Badge className={"bg-blue-500 rounded-full py-1 px-2 text-xs"}>
            Beginners
          </Badge>
        </div>
        <h1 className="font-bold">&#8377;299</h1>
      </div>
    </div>
  );
};

export default Course;
