import { FC } from "react";
import { useIntl } from "react-intl";
import { CommitteesReviewReportDetailsContent } from "./components/CommitteesReviewReportDetailsContent";
import React from "react";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

const CommitteesReviewReportDetails: FC = () => {
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
      defaultName: "CommitteesReportDetails",
      name: "",
    },
  ];
  return (
    <>
      <DynamicToolbar
        defaultTitle="CommitteesReportDetails"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />
      <CommitteesReviewReportDetailsContent />
    </>
  );
};

export { CommitteesReviewReportDetails };
