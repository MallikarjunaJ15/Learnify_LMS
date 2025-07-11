import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const HeroSection = () => {
  return (
    <div className=" py-24 px-4 bg-gradient-to-r from-blue-500 from-30% to-indigo-600 dark:from-gray-800 dark:to-gray-900 text-center">
      <div className="max-w-2xl mx-auto ">
        <h1 className="text-white text-3xl font-bold mb-4">
          Find the Best Courses for you
        </h1>
        <p className="text-sm text-gray-200 mb-6 dark:text-gray-400">
          Courses That Click With You..,{""}Courses That Create Careers.
        </p>
        <form
          action=""
          className="relative flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
        >
          <Input
            type={"text"}
            placeholder="Search Courses"
            className={
              "grow placeholder-gray-400 dark:placeholder-gray-500 outline-none border-none bg-white focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100"
            }
          />
          <Button
            className={
              "bg-blue-600 absolute top-0 right-0 rounded-r-full dark:bg-blue-700 px-6 py-3 hover:bg-blue-700 "
            }
          >
            Search
          </Button>
        </form>
        <Button
          className={
            "rounded-full bg-white dark:bg-gray-800 text-blue-600  py-0.5 text-xs hover:bg-gray-200"
          }
        >
          Explore Course
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
