import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { ClockIcon, CloudIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import app from "Database/db";

import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

import AuctionSide from "./AuctionSide"; // Import your sidebar component here

import {TabsAuc} from "./Tabs";

export default function AuctionPage() {
  const AuctionID = useParams().id;
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [auction_type, setAuctionType] = useState("");
  const [reserve_price, setReservePrice] = useState("");
  const [starting_price, setStartingPrice] = useState("");
  const [editor, setEditor] = useState("");
  const [isAuctionActive, setIsAuctionActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");
  const [auctionStatus, setAuctionStatus] = useState("");


  const db = getFirestore(app);

  const fetchAuctionDetails = async () => {
    const docRef = doc(db, "auctions", AuctionID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setStartDate(data.Details.start_date || "");
      setEndDate(new Date(data.Details.end_date) || "");
      setAuctionType(data.Details.auction_type || "");
      setReservePrice(data.Details.reserve_price || "");
      setStartingPrice(data.Details.starting_price || "");
      setEditor(data.Details.editor || "");
      setIsAuctionActive(data.status === "active" ? true : false);
      // Check if the auction is active based on the start and end dates
      
    } else {
      console.log("No such document!");
    }
  };

  const toggleAuctionStatus = async () => {
    // Update the auction status in the database
    const auctionRef = doc(db, "auctions", AuctionID);
    if (isAuctionActive) {
      // If the auction is active, stop it
      await updateDoc(auctionRef, {
        status: "offline",
      });
    } else {
      // If the auction is not active, start it
      await updateDoc(auctionRef, {
        status: "active",
      });
    }
    // Update the local state to reflect the new status
    setIsAuctionActive(!isAuctionActive);
  };


  // fetch status from database
  const RemainingTime = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  
  const calculateRemainingTime = () => {
    const currentDate = new Date();
    const endDate = new Date(end_date);
    const timeRemaining = endDate - currentDate;
  
    if (timeRemaining <= 0) {
      setIsAuctionActive(false);
      setRemainingTime("Auction Ended");
    } else {
      const seconds = Math.floor((timeRemaining / 1000) % 60);
      const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
      const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  
      setRemainingTime(
        `Remaining Time: ${days}d ${hours}h ${minutes}m ${seconds}s`
      );
    }
  };
  


  useEffect(() => {
    fetchAuctionDetails();
  }, []);

  useEffect(() => {
    const timer = setInterval(calculateRemainingTime, 1000); // Update the timer every second

    return () => {
      clearInterval(timer); // Cleanup the timer on component unmount
    };
  }, [end_date]); // Re-run the timer when end_date changes

  return (
    <div>
      <div className="w-full">
        <div floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex items-center justify-between gap-8 mx-12 mt-8">
            <div>
              <div className="flex items-center gap-4">
                <CloudIcon className="h-8 w-8 text-green-600" />
                <Typography variant="h5" color="blue-gray">
                  Auction Overview
                </Typography>
              </div>
              <Typography color="gray" className="mt-1 font-normal">
                See how your auctions are performing
              </Typography>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="text"
                ripple="light"
                onClick={toggleAuctionStatus}
                className="text-green-500"
                >
                {isAuctionActive ? "Stop Auction" : "Start Auction"}

              </Button>
              <Typography className="mt-1 font-bold text-right text-red-500">
                {
                  isAuctionActive ? remainingTime : "Auction Ended"
                }
              </Typography>
            </div>
          </div>
          <hr className="my-6 w-full border-gray-300" />
          <TabsAuc />
        </div>
      </div>
    </div>
  );
}
