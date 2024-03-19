// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import LineGraph from "./components/LineGraph";
import { useEffect, useState } from "react";
import { get } from "api/api";
import PieChart from "components/PieChart";
import Loading from "components/Loading";

function Dashboard() {
  const [loading, setLoading] = useState(false);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          {loading && <Loading />}
        </SuiBox>
      </SuiBox>
    </DashboardLayout>
  );
}

export default Dashboard;
