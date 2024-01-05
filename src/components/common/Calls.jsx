import React, { useEffect, useState } from "react";
import { IoIosCall } from "react-icons/io";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineArchive } from "react-icons/md";
import { MdArchive } from "react-icons/md";
import { IconContext } from "react-icons";
import OptionIcon from "./OptionIcon";

const Calls = ({ item, handleArchive, handleCallDetails }) => {
  const [timeStamp, setTimeStamp] = useState(0);

  useEffect(() => {
    const timestamp = item?.created_at;
    const date = new Date(timestamp);

    const year = date.getUTCFullYear();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getUTCMonth()];
    const day = date.getUTCDate().toString().padStart(2, "0");

    let hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    hours = hours < 10 ? "0" + hours : hours;

    const formattedTime = `${hours}:${minutes}`;
    const formattedDate = `${month}, ${day} ${year}`;
    setTimeStamp({ time: formattedTime, format: ampm, date: formattedDate });
  }, [item]);

  return (
    <div>
      <div className="my-2 flex transition-all duration-300">
        <div className="dash-line float-left m-auto"></div>
        <p className="text-gray-400 text-center text-xs font-semibold">
          {timeStamp?.date}
        </p>
        <div className="dash-line float-right m-auto"></div>
      </div>
      <div
        onClick={() => handleCallDetails(item?.id)}
        className="container grid grid-cols-12 h-12 w-10/12 mx-auto px-4 bg-white border-2 border-gray-200 shadow-lg rounded-2xl cursor-pointer relative"
      >
        <div className="col-span-2 sm:col-span-1 flex relative items-center">
          <IconContext.Provider
            value={{
              color: item?.call_type === "missed" ? "red" : "green",
              size: "10px",
            }}
          >
            <div className="absolute top-2 right:0 left-3 sm:right-0 md:right-2 lg:right-4 xl:right-6">
              {item?.call_type === "missed" ? (
                <FaArrowDown />
              ) : item?.call_type === "answered" ? (
                <FaArrowLeft />
              ) : (
                <FaArrowRight />
              )}
            </div>
          </IconContext.Provider>
          <IconContext.Provider value={{ color: "gray", size: "25px" }}>
            <div>
              <IoIosCall />
            </div>
          </IconContext.Provider>
        </div>
        <div className="col-span-7 sm:col-span-8 lg:col-span-9 my-auto">
          <div className="flex gap-2">
            <p className="text-sm font-extrabold text-gray-600">
              {item?.from || "0000000000"}
            </p>
            <IconContext.Provider
              value={{ color: "gray", size: "15px", cursor: "pointer" }}
            >
              <div
                onClick={(e) =>
                  handleArchive(e, {
                    id: item?.id,
                    is_archived: !item?.is_archived,
                  })
                }
                className="cursor-pointer"
              >
                {item?.is_archived ? <MdArchive /> : <MdOutlineArchive />}
              </div>
            </IconContext.Provider>
          </div>
          <p className="text-xs font-extrabold text-gray-400">
            tried to call on {item?.to || "00000"}
          </p>
        </div>
        <div className="col-span-3 lg:col-span-2  flex items-center">
          <OptionIcon />
          <p className="text-sm font-extrabold text-gray-400 mx-auto lg:mx-0">
            {timeStamp?.time}
          </p>
          <div className="absolute right-[-0.13rem] w-6 shadow-lg border-2 border-gray-200 rounded-s-sm">
            <p className="text-[0.50rem] font-bold text-gray-400 ml-1">
              {timeStamp?.format}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calls;
