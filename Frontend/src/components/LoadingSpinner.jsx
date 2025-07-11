import React from "react";
import { Home, Loader2, School2 } from "lucide-react";
const LoadingSpinner = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
            <School2/>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white tracking-wide">
            Learnify
          </h1>
        </div>

        {/* Spinner */}
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />

        <p className="text-gray-500 text-sm">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
