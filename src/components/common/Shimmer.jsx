import React from "react";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Shimmer = () => {
  console.log("Shimeer");
  return (
    <div className="mt-4 px-8">
      {data?.map((index) => {
        return (
          <>
            <div class="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto my-4">
              <div class="animate-pulse flex space-x-4">
                <div class="flex-1 space-y-6 py-1">
                  <div class="h-2 bg-gray-300 rounded"></div>
                  <div class="space-y-3">
                    <div class="grid grid-cols-3 gap-4">
                      <div class="h-2 bg-gray-300 rounded col-span-2"></div>
                      <div class="h-2 bg-gray-300 rounded col-span-1"></div>
                    </div>
                    <div class="h-2 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Shimmer;
