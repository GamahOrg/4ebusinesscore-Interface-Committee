import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { CommitteesReviewTabCommitteesData } from "./CommitteesReviewTabCommitteesData";
import { CommitteesReviewTabMeetings } from "./CommitteesReviewTabMeetings";
import { CommitteesReviewTabReports } from "./CommitteesReviewTabReports";
import { CommitteesReviewTabMembers } from "./CommitteesReviewTabMembers";
import { CommitteesReviewTabOutputs } from "./CommitteesReviewTabOutputs";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

type ButtonTypes = {
  id: number;
  name: string;
};
interface CommitteesReviewTabsContentProps {
  committeeId: string | any;
  committeeDetails?: any;
}
const CommitteesReviewTabsContent: React.FC<
  CommitteesReviewTabsContentProps
> = ({ committeeId , committeeDetails }) => {
  const intl = useIntl();

  const buttons: ButtonTypes[] = [
    {
      id: 1,
      name: "CommitteeData",
    },
    {
      id: 2,
      name: "CommitteeMeeting",
    },
    {
      id: 3,
      name: "CommitteesReports",
    },
    { id: 4, name: "Members" },
    { id: 5, name: "Outputs" },
  ];

  const [activeButton, setActiveButton] = useState<ButtonTypes>(buttons[0]);

  let location = useLocation();
  const { tabState } = location.state || {};

  useEffect(() => {
    if (tabState) setActiveButton(tabState);
  }, [tabState]);

  const handleButtonClick = (button: ButtonTypes) => {
    setActiveButton(button);
  };

  const ActivatedUserDetailsTab = () => {
    switch (activeButton.id) {
      case 1:
        return <CommitteesReviewTabCommitteesData />;
      case 2:
        return (
          <CommitteesReviewTabMeetings
            committeeId={committeeId}
            tabState={activeButton}
            committeeDetails={committeeDetails}
          />
        );
      case 3:
        return <CommitteesReviewTabReports 
        tabState={activeButton} 
        committeeDetails={committeeDetails}
        />;
      case 4:
        return <CommitteesReviewTabMembers />;
      case 5:
        return <CommitteesReviewTabOutputs tabState={activeButton} />;
    }
  };

  return (
    <>
      <div className="card pb-5">
        <div className="card-body p-5 rounded-2">
          <ul className="nav nav-tabs justify-content-between justify-content-md-center fs-6 px-0 nav-line-tabs">
            {buttons.map((button) => (
              <li className="nav-item" key={button.id}>
                <button
                  className={`nav-link  text-black btn btn-active-color-black text-active-black  p-0 py-2 rounded-0 bg-transparent border-0 border border-bottom ${
                    activeButton.id === button.id ? "active" : ""
                  } ${button.id === 5 ? "mg-right" : ""}`}
                  onClick={() => handleButtonClick(button)}
                >
                  {intl.formatMessage({
                    id: button.name,
                  })}
                </button>
              </li>
            ))}
          </ul>
          {ActivatedUserDetailsTab()}
        </div>
      </div>
    </>
  );
};

export { CommitteesReviewTabsContent };
