import React from "react";
import Course from "./Course";
const MyLearning = () => {
  const myCourse = [];
  const isLoading = false;
  return (
    <div className="max-w-4xl mx-auto px-4 my-24 md:px-0">
      <h1 className="font-bold text-2xl">My Learning</h1>
      <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : myCourse.length === 0 ? (
          <p className="text-sm text-gray-500 truncate">
            You have not enrolled in any courses yet.
          </p>
        ) : (
          myCourse.map((course, index) => <Course key={index} />)
        )}
      </div>
    </div>
  );
};

export default MyLearning;

const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3 bg-white shadow-lg">
      <div className="h-[125px] w-full bg-gray-200 rounded-xl animate-pulse"></div>
      <div className="space-y-2 bg-white p-3">
        <div className="h-4 w-[50%] bg-gray-200 animate-pulse"></div>
        <div className="h-4 w-[40%] bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
};
