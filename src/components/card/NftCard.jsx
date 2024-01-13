import { IoHeart, IoHeartOutline, IoLocateOutline } from "react-icons/io5";
import { useState } from "react";
import Card from "components/card";
import { HiLocationMarker } from "react-icons/hi";
import CardMenu from "components/card/PropertyMenu";

import { useNavigate } from "react-router-dom";


const NftCard = ({ title, author, price, image, bidders, extra , PropertyID, Category }) => {
  const navigate = useNavigate();

  const [heart, setHeart] = useState(true);
  return (
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
    >
      <div className="h-full w-full">
        <div className="relative w-full">
          <img
            src={image}
            className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
            alt=""
          />
          <button
            onClick={() => setHeart(!heart)}
            className="absolute top-3 right-3 flex items-center justify-center rounded-full p-2 text-brand-500 hover:cursor-pointer"
          >
            <div className="flex h-full w-full items-center justify-center rounded-full text-sm hover:bg-gray-50 dark:text-navy-900">
              <CardMenu PropertyID={PropertyID} />
            </div>
          </button>

          <div className="absolute bottom-3 left-3 flex items-center justify-center rounded-full p-2 text-white font-bold ">
              <IoLocateOutline className="h-5 w-5 text-white mr-1" />
              {Category}
          </div>
        </div>

        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {" "}
              {title}{" "}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              <HiLocationMarker className="inline-block mr-1" />
               {author}{" "}
            </p>
          </div>

          <div className="flex flex-row-reverse md:mt-2 lg:mt-0">
            <span className="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700 dark:!border-navy-800 dark:bg-gray-800 dark:text-white">
              +5
            </span>
            {bidders.map((avt, key) => (
              <span
                key={key}
                className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white dark:!border-navy-800"
              >
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={avt}
                  alt=""
                />
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
          <div className="flex">
            <p className="mb-2 text-sm font-bold text-brand-500 dark:text-white">
              Current Bid: {price} <span>$</span>
            </p>
          </div>
          <button
            onClick={() => {
              navigate(`/admin/property-overview/${PropertyID}`);
            }
            }
            className="linear rounded-[20px] bg-indigo-900 px-2 py-1 text-sm font-medium text-white transition duration-200 hover: active:bg-green-500 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
          >
            View Details
          </button>
        </div>
      </div>
    </Card>
  );
};

export default NftCard;
