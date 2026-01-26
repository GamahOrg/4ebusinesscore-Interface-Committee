import React, { FC } from "react";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { CommitteesReviewShowDecisionDetails } from "./components/CommitteesReviewShowDecisionDetails";

const CommitteesReviewShowDecisionDetailsHome: FC = () => {
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
      defaultName: "DecisionDetailsShow",
      name: "",
    },
  ];
  return (
    <>
      <DynamicToolbar
        defaultTitle="DecisionDetailsShow"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />
      <CommitteesReviewShowDecisionDetails />
    </>
  );
};

export { CommitteesReviewShowDecisionDetailsHome };
