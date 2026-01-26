import  { FC } from "react";
import CommitteeDetailsPage from "./components/CommitteDetails";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { useParams } from "react-router";
import React from "react";

const CommitteeDetails: FC = () => {

  const { committeeId } = useParams();

  let location = useLocation();
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  const breadcrumbItems = [
    {
      path: `/committee-approval/committee-approval-details/${committeeId}`,
      defaultName: "CommitteeApprovalDetails",
      name: "",
    },
    {
      path: "",
      defaultName: "CommitteeDetails",
      name: "",
    },
  ];
  return (
    <>
      <DynamicToolbar
        defaultTitle="CommitteeDetails"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />
      <CommitteeDetailsPage />
    </>
  );
};

export { CommitteeDetails };
