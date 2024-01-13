import {
    Avatar, Button, Checkbox, Popover,
    PopoverHandler,
    PopoverContent,
    Input
} from '@material-tailwind/react';
import { NotificationAdd, Timer3 } from '@mui/icons-material';
import React, { useState } from 'react';

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

const Notification = () => {
    const [message, setMessage] = useState('');
    const [date, setDate] = useState(new Date());

    const investors = [
        {
            name: 'Investor 1',
            property: 'Property 1',
        },
        {
            name: 'Investor 2',
            property: 'Property 2',
        },
        {
            name: 'Investor 3',
            property: 'Property 3',
        },
        {
            name: 'Investor 4',
            property: 'Property 4',
        },
        {
            name: 'Investor 5',
            property: 'Property 5',
        },
        {
            name: 'Investor 6',
            property: 'Property 6',
        },
        {
            name: 'Investor 7',
            property: 'Property 7',
        },
        {
            name: 'Investor 8',
            property: 'Property 8',
        },
        {
            name: 'Investor 9',
            property: 'Property 9',
        },
        {
            name: 'Investor 10',
            property: 'Property 10',
        },
    ]

    const sendNotification = () => {
        // Code to send notification to investors
        // You can use a third-party service or implement your own logic here
        // Example: sendNotificationToInvestors(message);
    };

    return (
        <div className="flex flex-col w-full h-full mt-10 items-center justify-center">
            <div className="flex flex-col items-center justify-center w-3/4 bg-white rounded-lg shadow-lg p-4">
                <div className="flex flex-row items-center justify-center w-full gap-4">
                    <NotificationAdd className="text-6xl" />
                    <h1 className="text-2xl font-bold">
                        Send Notifications to Investors</h1>
                </div>
                <p className="text-gray-500 my-2">
                    Enter the message you want to send to investors
                </p>
                <div className="flex flex-col w-full items-center justify-center">
                    <textarea
                        className="w-full border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-gray-500 whitespace-pre-wrap w-3/4"
                        rows="4"
                        placeholder='Enter your message here...'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    {/* select the investors you want to send the notification to */}
                    <div className="flex flex-col w-full gap-4 mt-4">
                        {investors.map((investor, index) => (
                            <div
                                key={index}
                                className="flex flex-row  gap-2 px-40 items-center justify-start"
                            >
                                <Avatar src="https://docs.material-tailwind.com/img/face-4.jpg" size="sm" alt="avatar" />
                                <Checkbox label={investor.name} color="lightBlue" />
                            </div>
                        ))}
                    </div>

                    {/* line */}
                    <div className="w-full border-b-2 border-gray-200 my-4" />

                    {/* send notification button */}

                    <Button
                        variant='outlined'
                        className="flex items-center gap-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                            />
                        </svg>
                        Send Notification
                    </Button>

                    {/* line */}
                    <div className="w-full border-b-2 border-gray-200 my-4" />
                    {/* Schedule Notification */}
                    <div className="flex flex-row items-center  gap-4 mt-4">
                        <p className="text-gray-500">Schedule Notification</p>
                        <div className="p-24">
                            <Popover placement="bottom">
                                <PopoverHandler>
                                    <Input
                                        label="Select a Date"
                                        onChange={() => null}
                                        value={date ? format(date, "PPP") : ""}
                                    />
                                </PopoverHandler>
                                <PopoverContent>
                                    <DayPicker
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        showOutsideDays
                                        className="border-0"
                                        classNames={{
                                            caption: "flex justify-center py-2 mb-4 relative items-center",
                                            caption_label: "text-sm font-medium text-gray-900",
                                            nav: "flex items-center",
                                            nav_button:
                                                "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                                            nav_button_previous: "absolute left-1.5",
                                            nav_button_next: "absolute right-1.5",
                                            table: "w-full border-collapse",
                                            head_row: "flex font-medium text-gray-900",
                                            head_cell: "m-0.5 w-9 font-normal text-sm",
                                            row: "flex w-full mt-2",
                                            cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                            day: "h-9 w-9 p-0 font-normal",
                                            day_range_end: "day-range-end",
                                            day_selected:
                                                "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                                            day_today: "rounded-md bg-gray-200 text-gray-900",
                                            day_outside:
                                                "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                                            day_disabled: "text-gray-500 opacity-50",
                                            day_hidden: "invisible",
                                        }}
                                        components={{
                                            IconLeft: ({ ...props }) => (
                                                <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                                            ),
                                            IconRight: ({ ...props }) => (
                                                <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                                            ),
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <input
                            type="time"
                            className="border-2 border-gray-200 p-2 rounded-lg focus:outline-none focus:border-gray-500"
                        />

                        {/* schedule notification button */}
                        <Button
                            variant='outlined'
                            className="flex items-center gap-3">
                            <Timer3 className="h-5 w-5" />
                            Schedule Notification
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Notification;
