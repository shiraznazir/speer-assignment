import React, { useEffect, useState } from "react";
import { baseUrl } from "../constants";
import { IoIosCall } from "react-icons/io";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IconContext } from "react-icons";
import OptionIcon from "./common/OptionIcon";
import { IoRadioButtonOn } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdArrowBack } from "react-icons/md";
import { UseToggleCallsContext } from "../context/ToggleCallsContext";

const CallsDetails = ({ id }) => {
  const { activity, setActivity } = UseToggleCallsContext();
  const [callDetails, setCallDetails] = useState("");
  const [timeStamp, setTimeStamp] = useState(0);

  useEffect(() => {
    if (callDetails) {
      const timestamp = callDetails?.created_at;
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
    }
  }, [callDetails]);

  useEffect(() => {
    const getCallDetails = async () => {
      try {
        const response = await fetch(baseUrl + "activities/" + `${id}`);
        const getData = await response.json();
        setCallDetails(getData);
      } catch (error) {
        console.error("Error fetching call details:", error);
      }
    };

    getCallDetails();
  }, [id]);

  const handleBack = () => setActivity(!activity);

  return (
    <div className="w-10/12 py-8 m-auto bg-gray-100 shadow-lg rounded-b-2xl border-2 border-gray-100 cursor-pointer transition-all duration-300">
      <div>
        <div className="my-2 grid gird-cols-2">
          <div className="ml-8" onClick={handleBack}>
            <IconContext.Provider value={{ color: "black", size: "35px" }}>
              <MdArrowBack />
            </IconContext.Provider>
          </div>
          <p className="text-gray-400 text-center text-lg font-bold">
            {callDetails?.from}
          </p>
        </div>
        <div className="container grid grid-cols-12 w-10/12 mx-auto px-4 py-2 bg-white border-2 border-gray-200 shadow-lg rounded-2xl cursor-pointer relative">
          <div className="col-span-2 sm:col-span-1 flex relative items-center">
            <IconContext.Provider
              value={{
                color: callDetails?.call_type === "missed" ? "red" : "green",
                size: "10px",
              }}
            >
              <div className="absolute top-8 right:2 left-3 sm:right-0 md:right-2 lg:right-4 xl:right-6">
                {callDetails?.call_type === "missed" ? (
                  <IconContext.Provider value={{ color: "red", size: "15px" }}>
                    <FaArrowDown />
                  </IconContext.Provider>
                ) : callDetails?.call_type === "answered" ? (
                  <IconContext.Provider
                    value={{ color: "green", size: "15px" }}
                  >
                    <FaArrowLeft />
                  </IconContext.Provider>
                ) : (
                  <IconContext.Provider value={{ color: "gray", size: "15px" }}>
                    <FaArrowRight />
                  </IconContext.Provider>
                )}
              </div>
            </IconContext.Provider>
            <IconContext.Provider value={{ color: "gray", size: "35px" }}>
              <div>
                <IoIosCall />
              </div>
            </IconContext.Provider>
          </div>
          <div className="col-span-7 sm:col-span-8 lg:col-span-9 my-auto">
            <p className="text-sm font-extrabold text-gray-600">
              {timeStamp?.date}
            </p>

            <p className="text-xs font-extrabold text-gray-400 my-1">
              Caller Number: &nbsp;&nbsp; {callDetails?.to || "00000"}
            </p>
            <p className="text-xs font-extrabold text-gray-400 my-1">
              By Number: &nbsp;&nbsp; {callDetails?.via || "00000"}
            </p>
            <div className="flex">
              <p className="text-xs font-extrabold text-gray-400 my-1">
                Direction: &nbsp;&nbsp;{" "}
              </p>
              <div className="mt-1">
                {callDetails?.direction === "inbound" ? (
                  <IconContext.Provider
                    value={{ color: "green", size: "15px" }}
                  >
                    <FaArrowLeftLong />
                  </IconContext.Provider>
                ) : (
                  <IconContext.Provider value={{ color: "gray", size: "15px" }}>
                    <FaArrowRightLong />
                  </IconContext.Provider>
                )}
              </div>
            </div>
            <div>
              <div className="flex">
                <p className="text-xs font-extrabold text-gray-400 mt-[0.30rem]">
                  Archive : &nbsp;&nbsp;
                </p>
                <div className="my-1">
                  {callDetails?.is_archived ? (
                    <div className="w-5 h-5 bg-red-500 rounded-full"></div>
                  ) : (
                    <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                  )}
                </div>
              </div>
            </div>
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
    </div>
  );
};

export default CallsDetails;
