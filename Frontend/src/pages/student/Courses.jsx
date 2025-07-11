import React from "react";

const Courses = () => {
  const isLoading = false;
  const course = [1, 2, 3, 4,5,6,7];
  return (
    <div className="mb-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-center text-3xl font-bold mb-10">Our Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : course.map((course, index) => <Course key={index}/>)}
        </div>
      </div>
    </div>
  );
};

export default Courses;

import { Skeleton } from "@/components/ui/skeleton";
import Course from "./Course";
const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3 bg-white shadow-lg">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2 bg-white p-3">
        <Skeleton className="h-4 w-[50%]" />
        <Skeleton className="h-4 w-[40%]" />
      </div>
    </div>
  );
};
