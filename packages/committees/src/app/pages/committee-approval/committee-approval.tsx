import  { FC } from "react";
import { CommitteeApprovals } from "./components/CommitteeApproval";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import React from "react";

const CommitteeApproval: FC = () => {

  let location = useLocation();
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  const breadcrumbItems = [
    {
      path: "/committee-approval",
      defaultName: "CommitteeApproval",
      name: cardName || serviceName,
    },
  ];
  return (
    <>
      <DynamicToolbar
        defaultTitle="CommitteeApproval"
        extraTitle={cardName || serviceName}
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />
      <CommitteeApprovals />
    </>
  );
};

export { CommitteeApproval };
