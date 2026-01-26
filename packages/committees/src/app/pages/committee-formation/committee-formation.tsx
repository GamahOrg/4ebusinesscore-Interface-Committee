import React, { FC } from "react";
import AddCommittee from "./components/AddCommittee";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

const CommitteeFormation: FC = () => {

  let location = useLocation();
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  const breadcrumbItems = [
    {
      path: "",
      defaultName: "FormationOfACommittee",
      name: cardName || serviceName,
    },
  ];
  return (
    <>
      <DynamicToolbar
        defaultTitle="FormationOfACommittee"
        extraTitle={cardName || serviceName}
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />
      <AddCommittee />
    </>
  );
};

export { CommitteeFormation };
