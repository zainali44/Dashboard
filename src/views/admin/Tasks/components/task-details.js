import {
    Card,
    CardHeader,
    Typography,
    Button,
    Input,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Textarea,
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";

import { getFirestore, collection, addDoc, doc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import app from "Database/db"
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import SearchIcon from "components/icons/SearchIcon";
import { BsArrow90DegUp, BsArrowBarDown } from "react-icons/bs";


export function Task_Details() {
    const TaskID = useParams().id;
    const [loading, setLoading] = useState(true);
    const [Data, setData] = useState([]);

    const getTasks = async () => {
        const db = getFirestore(app);
        const data = await getDocs(collection(db, "tasks"));
        const filteredData = data.docs
            .filter((doc) => doc.id === TaskID) // Filter data based on TaskID
            .map((doc) => ({ ...doc.data(), id: doc.id }));

        setData(filteredData);
        console.log("Data:", filteredData);
        setLoading(false);
    };

    useEffect(() => {
        getTasks();
    }, [TaskID]); // Trigger useEffect when TaskID changes

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="flex flex-wrap mt-12">

                    {Data.map((task) => (
                        <div key={task.id}>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-8/12 px-4 mb-4">
                                    <Card>
                                            <Typography color="white" variant="h6">
                                                {task.title}
                                            </Typography>
                                        <div className="flex flex-wrap">
                                            <div className="w-full lg:w-8/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <Input
                                                        type="text"
                                                        color="indigo"
                                                        placeholder="Task Title"
                                                        value={task.name}
                                                        className="uppercase tracking-wide text-xl font-bold mb-2"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-4/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <Input
                                                        type="text"
                                                        color="lightBlue"
                                                        placeholder="Task Type"
                                                        value={task.type}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-4/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <Input
                                                        type="text"
                                                        color="lightBlue"
                                                        placeholder="Task Priority"
                                                        value={task.priority}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-4/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <Input
                                                        type="text"
                                                        color="lightBlue"
                                                        placeholder="Task Status"
                                                        value={task.status}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-4/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <Input
                                                        type="text"
                                                        color="lightBlue"
                                                        placeholder="Task Due Date"
                                                        value={task.dueDate}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-4/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <Input
                                                        type="text"
                                                        color="lightBlue"
                                                        placeholder="Task Created Date"
                                                        value={task.createddate}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="w-full lg:w-4/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <Input
                                                        type="text"
                                                        color="lightBlue"
                                                        placeholder="Task Assigned To"
                                                        value={task.assignedTo}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-12/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <Textarea
                                                        color="lightBlue"
                                                        placeholder="Task Description"
                                                        value={task.description}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className="mt-4">
                                        <div color="indigo" contentPosition="left">
                                            <Typography color="white" variant="h6">
                                                Task Attachments
                                            </Typography>
                                        </div>
                                        <div className="flex flex-wrap">
                                            <div className="w-full lg:w-12/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <Input
                                                        type="text"
                                                        color="lightBlue"
                                                        placeholder="Task Attachments"
                                                        value={task.attachments}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                    {/* Lastest Enhancement */}

                                    <Card className="mt-4">
                                        <div color="indigo" contentPosition="left">
                                            <Typography color="white" variant="h6">
                                                Task Comments
                                            </Typography>
                                        </div>
                                        <div className="flex flex-wrap">
                                            <div className="w-full lg:w-12/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <Textarea className="h-24"
                                                        color="lightBlue"
                                                        placeholder="Task Comments"
                                                        value={task.comments}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <div className="flex flex-wrap">
                                            <div className="w-full lg:w-12/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <Input
                                                        type="text"
                                                        color="lightBlue"
                                                        placeholder="Task ID"
                                                        value= {"Task ID: " + task.id}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}