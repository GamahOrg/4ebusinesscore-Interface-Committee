import { FC } from "react";
import { useIntl } from "react-intl";
import { CommitteesReviewAddMeetingContent } from "./components/CommitteesReviewAddMeetingContent";
import React from "react";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

const CommitteesReviewAddMeeting: FC = () => {
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
      defaultName: "AddNewMeeting",
      name: "",
    },
  ];
  return (
    <>
      <DynamicToolbar
        defaultTitle="AddNewMeeting"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />
      <CommitteesReviewAddMeetingContent />
    </>
  );
};

export { CommitteesReviewAddMeeting };
