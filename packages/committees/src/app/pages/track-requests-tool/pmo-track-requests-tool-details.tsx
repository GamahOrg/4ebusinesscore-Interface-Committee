import React, { Fragment } from "react";
import TrackRequestsToolDetails from "./components/TrackRequestsToolDetails";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { useLocation } from "react-router-dom";

export function PmotrackRequestsToolDetails() {
  let location = useLocation();

  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;

  const breadcrumbItems = [
    {
      path: "/committee-track-requests-tools",
      defaultName: "TrackRequests",
      name: cardName || serviceName,
    },
    {
      path: "",
      defaultName: "RequestDetails",
      name: "",
    },
  ];
  return (
    <Fragment>
      <DynamicToolbar
        defaultTitle="RequestDetails"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />
      <TrackRequestsToolDetails />
    </Fragment>
  );
}
