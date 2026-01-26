import { Fragment } from "react";
import { useIntl } from "react-intl";
import React from "react";
import { CommitteReviewMembersTableRowForEdit } from "./CommitteReviewMembersTableRowForEdit";
import {useLocation} from "react-router-dom";

const CommitteReviewMembersForEditTable = ({allMembers,setInternalMembers,setAllMembers,setExternalMembers}:any) => {
  const intl = useIntl();
  let location=useLocation()
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
                {intl.formatMessage({ id: "MemberType" })}
              </th>
              <th className="min-w-150px text-center">
                {intl.formatMessage({ id: "Permission" })}
              </th>
              {location?.pathname?.includes("/committees-review/committee-decision-show-details")?<></>:<>
                <th className="min-w-100px text-center">
                {intl.formatMessage({ id: "Procedures" })}
              </th>
              </>}
            </tr>
          </thead>
          <tbody>
            {allMembers?.map((member: any,index:number) => {
            if(member.permissionNameAr !== "مختص خارجي" && member.job !== "مختص خارجي") {
              return (
                <CommitteReviewMembersTableRowForEdit
                  key={member?.id}
                  member={member}
                  index={index}
                  allMembers={allMembers}
                  setInternalMembers={setInternalMembers}
                  setExternalMembers={setExternalMembers}
                  setAllMembers={setAllMembers}
                />
              );
              }else{
                return null;
              } 
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export { CommitteReviewMembersForEditTable };
