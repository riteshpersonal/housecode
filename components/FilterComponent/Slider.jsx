import React from 'react';

const Slider = ({ value, onChange, min, max }) => {
  return (
    <>
      <input
        type="range"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        // className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
        className="w-full border border-neutral-300 appearance-none rounded-full h-5 px-1.5 outline-none overflow-hidden" 
      />
    </>
  );
};

export default Slider;
