import { CurrencyDollarIcon, ShareIcon } from "@heroicons/react/24/solid";
import { Button, Card, Typography, Checkbox, alert } from "@material-tailwind/react";
import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Assets from "./Assets";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import app from "Database/db";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { useParams } from "react-router-dom";
import { set } from "date-fns";
import { Alert } from "@mui/material";

export default function LeaseManagement() {

    const TeantID = useParams().id;

    const [loading, setLoading] = React.useState(false);

    const db = getFirestore(app);

    const [start_date, setStartDate] = React.useState('');
    const [end_date, setEndDate] = React.useState('');
    const [lease_type, setLeaseType] = React.useState('');
    const [monthly_rent, setMonthlyRent] = React.useState('');
    const [isLeaseActive, setIsLeaseActive] = React.useState(false);

    const fetchLeaseDetails = async () => {
        const docRef = doc(db, "tenants", TeantID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            setStartDate(data.Details.start_date || "");
            setEndDate(data.Details.end_date || "");
            setLeaseType(data.Details.lease_type || "");
            setMonthlyRent(data.Details.monthly_rent || "");
            setIsLeaseActive(data.Details.isLeaseActive || "");
        } else {
            console.log("No such document!");
        }
    }

    const saveAuctionDetails = async () => {
        setLoading(true);
        const db = getFirestore(app);
        const docRef = doc(db, "tenants", TeantID);
        await setDoc(docRef, {
            Details: {
                start_date: start_date,
                end_date: end_date,
                lease_type: lease_type,
                monthly_rent: monthly_rent,
                isLeaseActive: isLeaseActive,
            },
        }, { merge: true });
        setLoading(false);
        toast.success('Lease Details Saved Successfully', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        });

    }

    React.useEffect(() => {
        fetchLeaseDetails();
    }
        , [TeantID]);


    return (
        <div className="flex flex-col w-full h-full p-4">
            <div className="flex flex-row w-full justify-between">
                <div className="flex flex-col w-full">
                    <h1 className="text-2xl font-semibold text-gray-800 w-full">Lease Management</h1>
                </div>
                <div className="flex flex-row">
                    <button
                        color="indigo"
                        className="w-72 text-sm flex flex-row items-center justify-center gap-2 hover:bg-gray-100 border border-gray-300 rounded-md px-4 py-2"
                    >
                        <div className="flex flex-row items-center">
                            <ShareIcon className="h-5 w-5 mr-2" />
                            Share with Investors and Prospects
                        </div>
                    </button>
                </div>
            </div>

            <hr className="my-6 w-full border-gray-300" />

            <div className="flex flex-roe gap-4 w-full justify-between">
                <div className="flex flex-col w-full">
                    <Typography color="gray" className="mt-1 font-normal mb-2">
                        Lease Start Date
                    </Typography>
                    <div class="relative max-w-sm">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                        </div>
                        <input
                            type="date"
                            class="block w-full py-2 pl-10 pr-3 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring"
                            placeholder="Pick Start Date"
                            value={start_date}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <Typography color="gray" className="mt-1 font-normal mb-2">
                        Lease End Date
                    </Typography>
                    <div class="relative max-w-sm">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                        </div>
                        <input
                            type="date"
                            value={end_date}
                            class="block w-full py-2 pl-10 pr-3 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring"
                            placeholder="Pick End Date"
                            onChange={(e) => setEndDate(e.target.value)}

                        />
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <Typography color="gray" className="mt-1 font-normal mb-2">
                        Lease Type
                    </Typography>
                    <div class="relative max-w-sm">
                        <select
                            class="block w-full py-2 pl-10 pr-3 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring"
                            id="lease_type"
                            value={lease_type}
                            onChange={(e) => setLeaseType(e.target.value)}
                        >
                            <option value="1">Residential</option>
                            <option value="2">Commercial</option>
                            <option value="3">Industrial</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex flex-row w-full justify-start">
                <div className="flex flex-col w-full">
                    <Typography color="gray" className="mt-1 font-normal mb-2">
                        Monthly Rent
                    </Typography>
                    <div class="relative max-w-sm">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                            <CurrencyDollarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        </div>
                        <input
                            type="number"
                            class="block w-full py-2 pl-10 pr-3 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring"
                            placeholder="Enter Monthly Rent"
                            id="monthly_rent"
                            value={monthly_rent}
                            onChange={(e) => setMonthlyRent(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <hr className="my-6 w-full border-gray-300" />

            <div className="flex flex-row w-full justify-start">
                <div className="flex flex-col w-full">
                    <Typography color="gray" className="mt-1 font-normal mb-2">
                        Active Lease
                    </Typography>
                    <div className="flex flex-row items-center">
                        <Checkbox color="indigo" />
                        <p className="text-gray-800 dark:text-gray-200 ml-2">Yes, this lease is active</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-row w-full mt-8">

                {
                    loading ? (
                        <Button
                            color="indigo"
                            variant="filled"
                            className=" ml-auto"
                            disabled
                        >
                            <div className="flex flex-row items-center">
                                <CheckBadgeIcon className="h-5 w-5 mr-2" />
                                Saving...
                            </div>
                        </Button>
                    ) : (
                        <Button
                            color="indigo"
                            variant="filled"
                            className=" ml-auto"
                            onClick={saveAuctionDetails}
                        >
                            <div className="flex flex-row items-center">
                                <CheckBadgeIcon className="h-5 w-5 mr-2" />
                                Save Lease Details
                            </div>
                        </Button>
                    )
                }
            </div>
            <ToastContainer />

        </div>
    );
}
