import { CheckIcon, CurrencyDollarIcon, CursorArrowRaysIcon, GifIcon, GiftTopIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { GiftIcon, PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import React from "react";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Tooltip,
} from "@material-tailwind/react";
import { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Monitored",
        value: "monitored",
    },
    {
        label: "Unmonitored",
        value: "unmonitored",
    },
];

const TABLE_HEAD = ["Bidder (5)", "Type", "Amount", "Position", "Time", "Action"];

const TABLE_ROWS = [
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        name: "John Michael",
        email: "john@creative-tim.com",
        type: "Investor",
        amount: "$2,500",
        position: "Top",
        time: "2 days ago"
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
        name: "Alexa Liras",
        email: "zain@gmail.com",
        type: "Investor",
        amount: "$2,100",
        position: "Middle",
        time: "2 days ago"
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
        name: "Laurent Perrier",
        email: "zain@gmail.com",
        type: "Investor",
        amount: "$1,600",
        position: "Bottom",
        time: "2 days ago"
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
        name: "Michael Levi",
        email: "test@gmail.com",
        type: "Investor",
        amount: "$1,100",
        position: "Bottom",
        time: "2 days ago"
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        name: "Richard Gran",
        email: "richard@gmail.com",
        type: "Investor",
        amount: "$1,000",
        position: "Bottom",
        time: "2 days ago"
    }
];

export function BidTable() {
    const [bidStatus, setBidStatus] = useState({});

    const updateBidStatus = (name, status) => {
        setBidStatus({ ...bidStatus, [name]: status });
    };

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    const [open2, setOpen2] = React.useState(false);

    const handleOpen2 = () => setOpen2(!open2);

    //create a fake bidder

    const createBidder = () => {
        // Create a New Table Row
        const newRow = {
            img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
            name: document.getElementById("bidderName").value,
            email: document.getElementById("bidderEmail").value,
            type: document.getElementById("bidderType").value,
            amount: document.getElementById("bidderAmount").value,
            position: document.getElementById("bidderPosition").value,
            time: document.getElementById("bidderTime").value
        };

        // Add the new row to the table

        TABLE_ROWS.push(newRow);
    }

    const OfferCounter = () => {
        // Create a New Table Row
        // const Counter = document.getElementById("bidderCounterOffer").value;

        // Change the amount of the bidder to the counter offer

        toast.success(`Counter Offer of ${document.getElementById("bidderCounterOffer").value} sent to Bidder`);

    }


    return (
        <>
            <Card className="h-full w-full max-w-full justify-center">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                All Bidder
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                See how your bids are performing
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Button
                                size="sm"
                                className="flex items-center gap-3"
                                variant="outlined"
                                color="indigo"
                                onClick={handleOpen}
                            >
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Create a Fake Bidder from the Admin Panel
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <Tabs value="all" className="w-full md:w-max">
                            <TabsHeader>
                                {TABS.map(({ label, value }) => (
                                    <Tab key={value} value={value}>
                                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {TABLE_ROWS.map(
                                ({ img, name, email, type, amount, position, time }, index) => {
                                    const isLast = index === TABLE_ROWS.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={name}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <Avatar src={img} alt={name} size="sm" />
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {name}
                                                        </Typography>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal opacity-70"
                                                        >
                                                            {email}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {type}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="w-max">
                                                    <Chip
                                                        variant="ghost"
                                                        size="sm"
                                                        color={position === "top" ? "green" : "blue"}
                                                        value={amount}
                                                    />
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {position}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {time}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                {bidStatus[name] === "accepted" ? (
                                                    <span>Accepted</span>
                                                ) : bidStatus[name] === "declined" ? (
                                                    <span>Declined</span>
                                                ) : (
                                                    <div className="flex">
                                                        <Button
                                                            color="green"
                                                            variant="text"
                                                            onClick={() => updateBidStatus(name, "accepted")}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <CheckIcon className="h-5 w-5" />
                                                                Accept
                                                            </div>
                                                        </Button>
                                                        <Button
                                                            color="red"
                                                            variant="text"

                                                            onClick={() => updateBidStatus(name, "declined")}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <CursorArrowRaysIcon className="h-5 w-5" />
                                                                Decline
                                                            </div>
                                                        </Button>
                                                        <Button
                                                            color="indigo"
                                                            variant="text"
                                                        >
                                                            <div className="flex items-center gap-2"
                                                                onClick={handleOpen2}
                                                            >
                                                                <GiftIcon className="h-5 w-5" />
                                                                Counter Offer
                                                            </div>
                                                        </Button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>

            <Dialog open={open} size="xs" handler={handleOpen}>
                <div className="flex items-center justify-between">
                    <DialogHeader className="flex flex-col items-start">
                        {" "}
                        <Typography className="mb-1" variant="h4">
                            Creating a Fake Bidder
                        </Typography>
                    </DialogHeader>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5"
                        onClick={handleOpen}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <DialogBody>

                    <div className="flex flex-col">
                        <div className="flex flex-col">
                            <Typography className="mb-1" variant="h6">
                                Bidder Name
                            </Typography>
                            <Input
                                id="bidderName"
                                type="text"
                                color="lightBlue"
                                size="regular"
                                outline={false}
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Typography className="mb-1" variant="h6">
                                Bidder Email
                            </Typography>
                            <Input
                                id="bidderEmail"
                                type="email"
                                color="lightBlue"
                                size="regular"
                                outline={false}
                                placeholder="Enter you email"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Typography className="mb-1" variant="h6">
                                Bidder Type
                            </Typography>
                            <Input
                                id="bidderType"
                                type="text"
                                color="lightBlue"
                                size="regular"
                                outline={false}
                                placeholder="Investor"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Typography className="mb-1" variant="h6">
                                Bidder Amount
                            </Typography>
                            <Input
                                id="bidderAmount"
                                type="text"
                                color="lightBlue"
                                size="regular"
                                outline={false}
                                placeholder="$2,500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Typography className="mb-1" variant="h6">
                                Bidder Position
                            </Typography>
                            <Input
                                id="bidderPosition"
                                type="text"
                                color="lightBlue"
                                size="regular"
                                outline={false}
                                placeholder="Top"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Typography className="mb-1" variant="h6">
                                Bidder Time
                            </Typography>
                            <Input
                                id="bidderTime"
                                type="text"
                                color="lightBlue"
                                size="regular"
                                outline={false}
                                placeholder="2 days ago"
                            />
                        </div>
                    </div>


                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="text" color="gray" onClick={handleOpen}>
                        cancel
                    </Button>
                    <Button variant="outlined" color="gray" onClick={createBidder}>
                        create
                    </Button>
                </DialogFooter>
            </Dialog>

            <Dialog open={open2} size="xs" handler={handleOpen2}>
                <div className="flex items-center justify-between">
                    <DialogHeader className="flex flex-col items-start">
                        {" "}
                        <Typography className="mb-1" variant="h4">
                            Offer Counter to Bidder
                        </Typography>
                    </DialogHeader>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5"
                        onClick={handleOpen2}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <DialogBody>

                    <Input
                        id="bidderCounterOffer"
                        type="text"
                        color="lightBlue"
                        size="regular"
                        outline={false}
                        placeholder="Enter your offer"
                        icon={<CurrencyDollarIcon className="h-5 w-5 flex-shrink-0 text-blue-gray-400" />}
                    />
                </DialogBody>

                <DialogFooter className="space-x-2">
                    <Button variant="text" color="gray" onClick={handleOpen2}>
                        cancel
                    </Button>
                    <Button variant="outlined" color="gray" onClick={OfferCounter}>
                        send
                    </Button>
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </DialogFooter>
            </Dialog>

        </>
    );
}
