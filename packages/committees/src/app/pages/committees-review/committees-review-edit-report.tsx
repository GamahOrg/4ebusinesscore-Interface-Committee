import { FC } from "react";
import { useIntl } from "react-intl";
import React from "react";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { CommitteesReviewEditReportContent } from "./components/CommitteesReviewEditReportContent";

const CommitteesReviewEditReport: FC = () => {
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
      defaultName: "EditReportt",
      name: "",
    },
  ];

  return (
    <>
      <DynamicToolbar
        defaultTitle="EditReportt"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />
      <CommitteesReviewEditReportContent />
    </>
  );
};

export { CommitteesReviewEditReport };
