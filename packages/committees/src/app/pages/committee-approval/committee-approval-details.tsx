import  { FC } from "react";
import ApprovalDetails from "./components/ApprovalDetails";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import React from "react";

const CommitteeApprovalDetails: FC = () => {

  let location = useLocation();
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  const breadcrumbItems = [
    {
      path: "/committee-approval",
      defaultName: "CommitteeApproval",
      name: cardName || serviceName,
    },
    {
      path: "",
      defaultName: "CommitteeApprovalDetails",
      name: "",
    },
  ];
  return (
    <>
      <DynamicToolbar
        defaultTitle="CommitteeApprovalDetails"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />
      <ApprovalDetails />
    </>
  );
};

export { CommitteeApprovalDetails };
