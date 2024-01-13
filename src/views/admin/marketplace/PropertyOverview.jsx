import Banner from "./components/Banner";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";

import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import HistoryCard from "./components/HistoryCard";
import TopCreatorTable from "./components/TableTopCreators";
import NftCard from "components/card/NftCard";

import { useNavigate } from "react-router-dom";

import  {Opentask}  from "../Tasks/components/opentasks";

import Chat from "Chat/Chat";

import Transactions from "./Trasacations/Transactions";

import Teanants from "../Teant/Main";

import AuctionPage from "Auctions/AuctionTemplate";



import { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import app from "Database/db";
import { getDocs, collection } from "firebase/firestore";

import PropertiesDetails from "views/admin/marketplace/Properties/PropertiesPage";
import InvestorsDetails from "views/admin/marketplace/Properties/Investor";

const PropertyOverview = () => {
    const navigate = useNavigate();
    const [selectedSection, setSelectedSection] = useState("properties"); // Default section is "properties"

    const handleSectionClick = (section) => {
        setSelectedSection(section);
    };

    const db = getFirestore(app);
    const storage = getStorage(app);

    const [loading, setLoading] = useState(false);
    const [PropertyData, setPropertyData] = useState([]);

    useEffect(() => {
        setLoading(true);
        const db = getFirestore(app);
        const getProperties = async () => {
            try {
                const data = await getDocs(collection(db, "properties"));
                const properties = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setPropertyData(properties);
            } catch (error) {
                console.error("Error fetching properties:", error);
            } finally {
                setLoading(false);
            }
        };
        getProperties();
    }, []);

    return (
        <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
            <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
                {/* NFt Banner */}
                <Banner />

                {/* NFt Header */}
                <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
                    
                    <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-2 2xl:!gap-12">
                        <li>
                            <a
                                className={`text-base font-medium ${
                                    selectedSection === "properties" ? "text-green-500" : "text-brand-500"
                                } hover:text-green-500 dark:text-white cursor-pointer`}
                                onClick={() => handleSectionClick("properties")}
                            >
                                Overview
                            </a>
                        </li>
                        <li>
                            <a
                                className={`text-base font-medium ${
                                    selectedSection === "investors" ? "text-green-500" : "text-brand-500"
                                } hover:text-green-500 dark:text-white cursor-pointer`}
                                onClick={() => handleSectionClick("investors")}
                            >
                                Investors <span className="text-brand-500 bg-green-100 px-2 py-1 rounded-full text-xs font-bold ml-2 dark:text-white dark:bg-gray-800">5</span>
                            </a>
                        </li>
                        <li>
                            <a
                                className={`text-base font-medium ${
                                    selectedSection === "tasks" ? "text-green-500" : "text-brand-500"
                                } hover:text-green-500 dark:text-white cursor-pointer`}
                                onClick={() => handleSectionClick("tasks")}
                            >
                                Tasks <span className="text-brand-500 bg-green-100 px-2 py-1 rounded-full text-xs font-bold ml-2 dark:text-white dark:bg-gray-800">5</span>
                            </a>
                        </li>
                       
                        <li>
                            <a
                                className={`text-base font-medium ${
                                    selectedSection === "chat" ? "text-green-500" : "text-brand-500"
                                } hover:text-green-500 dark:text-white cursor-pointer`}
                                onClick={() => handleSectionClick("chat")}
                            >
                                Chat
                            </a>
                        </li>

                        <li>
                            <a
                                className={`text-base font-medium ${
                                    selectedSection === "transactions" ? "text-green-500" : "text-brand-500"
                                } hover:text-green-500 dark:text-white cursor-pointer`}
                                onClick={() => handleSectionClick("transactions")}
                            >
                                Transactions
                            </a>
                        </li>

                        <li>
                            <a
                                className={`text-base font-medium ${
                                    selectedSection === "teanants" ? "text-green-500" : "text-brand-500"
                                } hover:text-green-500 dark:text-white cursor-pointer`}
                                onClick={() => handleSectionClick("teanants")}
                            >
                                Teanants
                            </a>
                        </li>

                        <li>
                            <a
                                className={`text-base font-medium ${
                                    selectedSection === "auction" ? "text-green-500" : "text-brand-500"
                                } hover:text-green-500 dark:text-white cursor-pointer`}
                                onClick={() => handleSectionClick("auction")}
                            >
                                Auction
                            </a>
                        </li>

                        {/* Add similar li elements for other sections */}
                    </ul>
                </div>

                {/* NFTs trending card */}
                <div className="z-20 grid grid-cols-1 gap-5">

                    {selectedSection === "properties" && <PropertiesDetails />}
                    {selectedSection === "investors" && <InvestorsDetails />}
                    {selectedSection === "tasks" && <Opentask />}
                    {selectedSection === "chat" && <Chat />}
                    {selectedSection === "transactions" && <Transactions />}
                    {selectedSection === "teanants" && <Teanants />}
                    {selectedSection === "auction" && <AuctionPage />}

                    {/* Add similar conditions for other sections */}
                </div>
            </div>

            {/* right side section */}
            <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
                <TopCreatorTable
                    extra="mb-5"
                    tableData={tableDataTopCreators}
                    columnsData={tableColumnsTopCreators}
                />
                <HistoryCard />
            </div>
        </div>
    );
};

export default PropertyOverview;