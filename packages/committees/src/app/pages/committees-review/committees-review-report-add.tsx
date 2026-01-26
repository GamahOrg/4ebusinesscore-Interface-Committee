import { FC } from "react";
import { useIntl } from "react-intl";
import { CommitteesReviewAddReportContent } from "./components/CommitteesReviewAddReportContent";
import React from "react";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

const CommitteesReviewAddReport: FC = () => {
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
      defaultName: "AddReport",
      name: "",
    },
  ];
  return (
    <>
      <DynamicToolbar
        defaultTitle="AddReport"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />
      <CommitteesReviewAddReportContent />
    </>
  );
};

export { CommitteesReviewAddReport };
