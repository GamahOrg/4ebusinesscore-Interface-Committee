import { FC } from "react";
import { useIntl } from "react-intl";
import { CommitteesReviewAddOutputContent } from "./components/CommitteesReviewAddOutputContent";
import React from "react";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

const CommitteesReviewAddOutput: FC = () => {
  const intl = useIntl();

  let location = useLocation();
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  const breadcrumbItems = [
    {
      path: "/committees-review",
      defaultName: "CommitteesReview",
      name: cardName || serviceName,
    },
    {
      path: "",
      defaultName: "AddNewOutput",
      name: "",
    },
  ];
  return (
    <>
      <DynamicToolbar
        defaultTitle="AddNewOutput"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />
      <CommitteesReviewAddOutputContent />
    </>
  );
};

export { CommitteesReviewAddOutput };
