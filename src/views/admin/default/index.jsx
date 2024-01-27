import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import { CarouselCustomNavigation } from "views/admin/default/components/carasoul";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import Conversation from "views/admin/default/components/Conversation";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import { CurrencyDollarIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { CurrencyExchange, TaskAlt, TimelapseOutlined } from "@mui/icons-material";

const Dashboard = () => {
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Offers"}
          subtitle={"$34,000"}
        />
        <Widget
          icon={<TimelapseOutlined className="h-6 w-6" />}
          title={"On Auctions"}
          subtitle={"$60,000"}
        />
        <Widget
          icon={<CurrencyExchange className="h-7 w-7" />}
          title={"Investments"}
          subtitle={"$45,000"}
        />
        <Widget
          icon={<CurrencyDollarIcon className="h-6 w-6" />}
          title={"Active Deals"}
          subtitle={"$111,000"}
        />
        <Widget
          icon={<TaskAlt className="h-7 w-7" />}
          title={"Tasks"}
          subtitle={"145"}
        />
        <Widget
          icon={<UserCircleIcon className="h-6 w-6" />}
          title={"Investors"}
          subtitle={"45"}
        />
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        <div>
          < CarouselCustomNavigation />
        </div>
        <Conversation />

        {/* Traffic chart & Pie Chart */}



        {/* Complex Table , Task & Calendar */}

        <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />

        {/* Task chart & Calendar */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
