import { FC } from "react";
import { useIntl } from "react-intl";
import CommitteesReviewCommitteeUnderStudyContent from "./components/CommitteesReviewCommitteeUnderStudyContent";
import React from "react";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

const CommitteesReviewCommitteeUnderStudy: FC = () => {
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
      defaultName: "CommitteeUnderStudy",
      name: "",
    },
  ];
  return (
    <>
      <DynamicToolbar
        defaultTitle="CommitteeUnderStudy"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />
      <CommitteesReviewCommitteeUnderStudyContent />
    </>
  );
};

export { CommitteesReviewCommitteeUnderStudy };
