
import React, { Component } from "react";
import { useDashboardContext } from "../DashboardContext";
import DashboardHeaderCard from "./DashboardHeaderCard";



function DashboardHeaderSection() {
  const { dashboardData } = useDashboardContext();

  if (!dashboardData) {
    return <div>Loading...</div>;
  }
    return (
      <div className="row">
        <DashboardHeaderCard
          count={dashboardData.Users}
          title={"Members"}
          icon={"users"}
          color={"flat-color-1"}
        />

        <DashboardHeaderCard
          count={dashboardData.Units}
          title={"Units"}
          icon={"house-user"}
          color={"flat-color-2"}
        />

        <DashboardHeaderCard
          count={dashboardData.events}
          title={"Total Events"}
          icon={"gamepad"}
          color={"flat-color-3"}
        />

        <DashboardHeaderCard
          count={dashboardData["Total revenue"]}
          title={"Revenue"}
          icon={"dollar"}
          color={"flat-color-4"}
        />
      </div>
    );
  }

export default DashboardHeaderSection;
