import React from "react";

const Loader = () => {
  return (
    <div className="fixed left-0 right-0 z-99999 flex items-center justify-center  overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-screen sm:h-full bg-white/5 backdrop-blur-sm">
  
  <div className="loader"></div>
  </div>
  );
};

export default Loader;
