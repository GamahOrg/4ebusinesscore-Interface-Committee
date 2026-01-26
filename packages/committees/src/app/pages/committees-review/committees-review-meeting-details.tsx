import { FC } from "react";
import { useIntl } from "react-intl";
import { CommitteesReviewMeetingOutputDetailsContent } from "./components/CommitteesReviewMeetingOutputDetailsContent";
import React from "react";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

const CommitteesReviewMeetingDetails: FC = () => {
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
      defaultName: "MeetingDetails",
      name: "",
    },
  ];
  return (
    <>
      <DynamicToolbar
        defaultTitle="MeetingDetails"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />
      <CommitteesReviewMeetingOutputDetailsContent />
    </>
  );
};

export { CommitteesReviewMeetingDetails };
