import React, { useState } from "react";
import { IoIosCall } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { IconContext } from "react-icons";
import { CgMenuGridO } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";

const Footer = () => {
  const [toggle, setToggle] = useState(0);
  return (
    <div className="fixed bottom-0 bg-white shadow-2xl h-12 w-full md:w-6/12 grid grid-cols-6 justify-evenly m-auto border-2 border-t-gray-200">
      <div
        className="col-span-1 mx-auto mt-4 cursor-pointer"
        onClick={() => setToggle(0)}
      >
        <IoIosCall />
        {toggle === 0 && <div className="h-4 green-line"></div>}
      </div>
      <div
        className="col-span-1 mx-auto mt-4 cursor-pointer"
        onClick={() => setToggle(1)}
      >
        <AiOutlineUser />
        {toggle === 1 && <div className="h-4 green-line"></div>}
      </div>
      <div className="col-span-2 flex justify-center relative cursor-pointer">
        <div className="absolute w-14 h-14 top-[-1.3rem] border-2 border-gray-300 rounded-full bottom-[-0.90rem] flex items-center">
          <div className="w-11 h-11 bg-[#2AC420] rounded-full m-auto flex items-center justify-center">
            <IconContext.Provider value={{ color: "white", size: "35px" }}>
              <CgMenuGridO />
            </IconContext.Provider>
          </div>
        </div>
      </div>

      <div
        className="col-span-1 mx-auto mt-4 cursor-pointer"
        onClick={() => setToggle(2)}
      >
        <IoIosSettings />
        {toggle === 2 && <div className="h-4 green-line"></div>}
      </div>
      <div
        className="col-span-1 mx-auto mt-3 cursor-pointer"
        onClick={() => setToggle(3)}
      >
        <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center m-auto">
          <div className="w-2 h-2 bg-[#2AC420] rounded-full m-auto"></div>
        </div>
        {toggle === 3 && <div className="h-4 green-line"></div>}
      </div>
    </div>
  );
};

export default Footer;
