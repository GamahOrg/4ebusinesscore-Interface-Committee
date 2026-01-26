import { Fragment } from "react";
import { useIntl } from "react-intl";
import React from "react";
import { CommitteReviewMembersTableRowForMeetings } from "./CommitteReviewMembersTableRowForMeetings";

const CommitteeReviewMembersTableForMeetings = ({externalMembers,setExternalMembers}) => {
 
  const intl = useIntl();
  return (
    <Fragment>
      <div className="table-responsive mt-4">
        <table
          className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-7"
          id="REGA-WS-caseList"
        >
          <thead>
            <tr className="fw-bolder text-muted">
              <th className="min-w-50px text-center">
                {intl.formatMessage({ id: "Sequence" })}
              </th>
              <th className="min-w-150px text-center">
                {intl.formatMessage({ id: "MemberData" })}
              </th>
              <th className="min-w-150px text-center">
                {intl.formatMessage({ id: "Email" })}
              </th>
              <th className="min-w-150px text-center">
                {intl.formatMessage({ id: "Permission" })}
              </th>
              <th className="min-w-100px text-center">
                {intl.formatMessage({ id: "Procedures" })}
              </th>
            </tr>
          </thead>
          <tbody>
            {externalMembers?.map((member: any,index) => {
              return (
                <CommitteReviewMembersTableRowForMeetings
                  member={member}
                  setExternalMembers={setExternalMembers}
                  index={index}
                  externalMembers={externalMembers}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export { CommitteeReviewMembersTableForMeetings };
