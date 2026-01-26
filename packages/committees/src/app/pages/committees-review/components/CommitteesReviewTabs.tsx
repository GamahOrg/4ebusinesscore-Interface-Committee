import { CommitteesReviewTabsSchedule } from "./CommitteesReviewTabsSchedule";
import { CommitteesReviewTabsContent } from "./CommitteesReviewTabsContent";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const CommitteesReviewTabs = () => {
  const [committeeDetails, setCommitteeDetails] = useState<any>(null);
  const { id } = useParams();
  
  return (
    <>
      <div className="row g-5 g-xl-8">
        <div className="col-md-3">
          <CommitteesReviewTabsSchedule setCommitteeDetails={setCommitteeDetails} />
        </div>
        <div className="col-md-9">
          <CommitteesReviewTabsContent committeeDetails={committeeDetails}  committeeId={id} />
        </div>
      </div>
    </>
  );
};

export { CommitteesReviewTabs };
