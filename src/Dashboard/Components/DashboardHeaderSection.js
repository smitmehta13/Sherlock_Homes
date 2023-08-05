/*
 **Author: Santosh Kumar Dash
 **Author URL: http://santoshdash.epizy.com/
 **Github URL: https://github.com/quintuslabs/dashio-admin
 */

import React, { Component } from "react";
import DashboardHeaderCard from "./DashboardHeaderCard";

class DashboardHeaderSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="row">
        <DashboardHeaderCard
          count={"3123"}
          title={"Members"}
          icon={"users"}
          color={"flat-color-1"}
        />

        <DashboardHeaderCard
          count={"349"}
          title={"Units"}
          icon={"house-user"}
          color={"flat-color-2"}
        />

        <DashboardHeaderCard
          count={"26"}
          title={"Total Events"}
          icon={"gamepad"}
          color={"flat-color-3"}
        />

        <DashboardHeaderCard
          count={"23569"}
          title={"Revenue"}
          icon={"dollar"}
          color={"flat-color-4"}
        />
      </div>
    );
  }
}

export default DashboardHeaderSection;
