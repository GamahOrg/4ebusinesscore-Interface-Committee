import React, { FC } from "react";
import { useIntl } from "react-intl";
import { CommitteesReviewEditCommitteeContent } from "./components/CommitteesReviewEditCommitteeContent";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

const CommitteesReviewEditCommittee: FC = () => {
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
      defaultName: "EditCommittee",
      name: "",
    },
  ];
  return (
    <>
      <DynamicToolbar
        defaultTitle="EditCommittee"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />
      <CommitteesReviewEditCommitteeContent />
    </>
  );
};

export { CommitteesReviewEditCommittee };
