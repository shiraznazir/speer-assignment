import React, { useEffect, useState } from "react";
import Calls from "./common/Calls";
import { UseToggleCallsContext } from "../context/ToggleCallsContext";
import { baseUrl } from "../constants";
import CallsDetails from "./CallsDetails";

const Body = () => {
  const [callsData, setCallsData] = useState();
  const { activity } = UseToggleCallsContext();
  const [callDetails, setCallDetails] = useState(null);
  const [callById, setCallById] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const patchCallDetails = async (params) => {
    try {
      await fetch(baseUrl + "activities/" + `${params?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_archived: params?.is_archived,
        }),
      });
      setIsUpdate(!isUpdate);
    } catch (error) {
      console.error("Error patching call details:", error);
    }
  };

  const resetAllCalls = async () => {
    try {
      await fetch(baseUrl + "reset", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsUpdate(!isUpdate);
    } catch (error) {
      console.error("Error patching call details:", error);
    }
  };

  useEffect(() => {
    const getCallDetails = async () => {
      try {
        const response = await fetch(baseUrl + "activities");
        const getData = await response.json();
        setCallDetails(getData);
      } catch (error) {
        console.error("Error fetching call details:", error);
      }
    };

    getCallDetails();
  }, [isUpdate]);

  useEffect(() => {
    const achieve = callDetails?.filter((item) => item?.is_archived);
    const nonAchieve = callDetails?.filter((item) => !item?.is_archived);
    setCallsData(activity === 0 ? nonAchieve : achieve);
    if (activity) {
      setCallById("");
    }
  }, [activity, callDetails]);

  const handleArchive = (e, params) => {
    e.stopPropagation();
    patchCallDetails(params);
  };

  const handleCallDetails = (id) => {
    setCallById(id);
  };
  return (
    <div className="bg-[#FDFDFD] py-14 transition-all duration-300">
      {!callById && activity === 0 && (
        <div
          onClick={() => resetAllCalls()}
          className="w-10/12 h-12 m-auto shadow-lg flex rounded-b-2xl border-2 border-gray-100 cursor-pointer"
        >
          <div className="my-auto ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="gray"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>
          </div>
          <h6 className="my-auto text-gray-600 font-medium mx-2 text-sm text">
            Archive all calls
          </h6>
        </div>
      )}
      {!callById ? (
        callsData?.map((item) => (
          <Calls
            key={item?.id}
            item={item}
            handleArchive={handleArchive}
            handleCallDetails={handleCallDetails}
          />
        ))
      ) : (
        <CallsDetails id={callById} />
      )}
    </div>
  );
};

export default Body;
