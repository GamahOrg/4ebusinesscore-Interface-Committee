import { Fragment } from "react";
import { useIntl } from "react-intl";
import { CommitteReviewMembersTableRow } from "./CommitteReviewMembersTableRow";
import React from "react";
import { ExternalMemberModel } from "../../../models/meeting-model";

const CommitteReviewMembersTable = ({members}:any) => {
  

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
            </tr>
          </thead>
          <tbody>
            {members?.length>0?members?.map((member: ExternalMemberModel,index) => {
              return (
                <CommitteReviewMembersTableRow
                  key={member?.id}
                  Members={member}
                  index={index}
                />
              );
            }):<></>}
          </tbody>
        </table>
        {members?.length==0?<div  className="w-100 d-flex align-items-center justify-content-center">{intl.formatMessage({id:"NoMembersFound"})}</div>:<></>}
      </div>
    </Fragment>
  );
};

export { CommitteReviewMembersTable };
