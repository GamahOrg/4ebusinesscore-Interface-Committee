import React, { Fragment } from "react";
import TrackRequestsTool from "./components/TrackRequestsTool";
import { useIntl } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

export function PmotrackRequestsTool() {
  let intl = useIntl();

  let location = useLocation();

  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;

  const breadcrumbItems = [
    {
      path: "",
      defaultName: "TrackRequests",
      name: cardName || serviceName,
    },
  ];

  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";

  return (
    <Fragment>
      <div className="d-flex justify-content-between align-items-center">
        <DynamicToolbar
          defaultTitle="TrackRequests"
          extraTitle={cardName || serviceName}
          breadcrumbItems={breadcrumbItems}
          showWorkspace={true}
          cardOption={cardName || serviceName}
        />
        <Link
          to="/committee-track-requests-tools/add-track-requests-tools"
          state={{ serviceName: cardTitle }}
          className="btn btn-bg-white btn-active-color-primary dark-link-toolbar"
        >
          {intl.formatMessage({ id: "AddNewPath" })}
        </Link>
      </div>
      <TrackRequestsTool />
    </Fragment>
  );
}
