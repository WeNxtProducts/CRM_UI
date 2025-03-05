import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-[9999]">
      <div className="relative w-16 h-16">
        {/* Fast Spinner */}
        <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
        {/* Slow Spinner with Custom Speed */}
        <div className="absolute inset-1 border-4 border-transparent border-b-white rounded-full animate-[spin_2s_linear_infinite]"></div>
      </div>
    </div>
  );
};

export default Loader;
