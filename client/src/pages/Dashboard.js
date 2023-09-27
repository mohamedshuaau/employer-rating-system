import Layout from "../components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import EmployeeStackedList from "../components/EmployeeStackedList";
import { get } from "../services/axios";

/**
 * Dashboard Page
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function Dashboard() {

  const [dashboard, setDashboard] = useState(null);

  // get dashboard content
  const getDashboardContent = () => {
    get('dashboard', function(response) {
      setDashboard(response.data)
    });
  }

  useEffect(() => {
    getDashboardContent()
  }, []);

  return (
    <Layout>
      {
        dashboard ?
          <div className="flex flex-col gap-12">
            <EmployeeStackedList employees={dashboard?.top} label="Top G's 🎉"/>

            <EmployeeStackedList employees={dashboard?.bottom} label="Cheapskates 🤮"/>
          </div> : null
      }
    </Layout>
  )
}