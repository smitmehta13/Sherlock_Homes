// DashboardContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { API_DASHBOARD_ALL } from "../Constants";

const DashboardContext = createContext();

export function useDashboardContext() {
  return useContext(DashboardContext);
}

export function DashboardProvider({ children }) {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetch(API_DASHBOARD_ALL)
      .then((response) => response.json())
      .then((data) => {
        setDashboardData(data);
      });
  }, []);

  return (
    <DashboardContext.Provider value={{ dashboardData }}>
      {children}
    </DashboardContext.Provider>
  );
}
