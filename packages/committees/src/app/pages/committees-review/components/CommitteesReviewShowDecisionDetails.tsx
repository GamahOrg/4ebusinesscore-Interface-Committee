import { FC, forwardRef, useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import CommitteReviewAttachmentsRow from "./CommitteReviewAttachmentsRow";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getPermissions } from "../../../features/committee/permissionsSlice";
import { PermissionsModel } from "../../../models/permissions-model";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { useParams } from "react-router-dom";
import {
  getNotApprovedCommitteeById,
} from "../../../features/committee/committeesSlice";
import {
  EditCommitteeProps,
  EditCommitteeSchema,
} from "../../../validations/edit-committee-validation";
import moment from "moment";
import { CommitteReviewMembersForEditTable } from "./CommitteReviewMembersForEditTable";
import { getUsersWithOrgDetails } from "../../../features/committee/usersAggregatorSlice";
import { UsersAggModel } from "../../../models/users-aggregator-model";
import { CommitteeMemberModel } from "../../../models/committee-member-model";
import { useLocation } from "react-router-dom";


interface Goal {
  id: number;
  text: string;
}

const CommitteesReviewShowDecisionDetails= forwardRef<HTMLDivElement>((props, ref) =>  {
  const intl = useIntl();
  let { committeeId } = useParams();
  const [nextId, setNextId] = useState(1);
  const [inputGoals, setInputGoals] = useState("");
  const [goals, setGoals] = useState<Goal[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EditCommitteeProps>({
    resolver: yupResolver(EditCommitteeSchema),
    mode: "all",
    reValidateMode: "onSubmit",
  });
  let dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPermissions({}) as any);
  }, []);
  useEffect(() => {
    dispatch(getNotApprovedCommitteeById(committeeId as string) as any);
  }, [committeeId]);

  useEffect(() => {
    dispatch(
      getUsersWithOrgDetails({
        pageNumber: 1,
        pageSize: 1000,
      }) as any
    );
  }, []);
  let users = useAppSelector((state) => {
    return state?.usersAgg?.users?.map((user:any) => {
      return { ...user, id: user?.userId };
    });
  });
  let committee = useAppSelector((state) => {
    return state?.committees?.notApprovedCommitteeById;
  });
  useEffect(() => {
    setValue("Description", committee?.description);
    setValue("LegalDocument", committee?.legalDocument);
    setValue("Missions", committee?.missions);
    setGoals(
      committee?.targets?.map((goal:any) => {
        return { id: Math.random() * 1000, text: goal };
      })
    );
  }, [committee]);

  let language: string = intl.locale;
  // const [showMemberType, setShowMemberType] = useState<string>("internal");
  // const [committeeMembers, setCommitteeMembers] = useState<string>("member");
  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<any>({});
  let permissions = useAppSelector((state) => {
    return state?.permissions?.permissions;
  });
  let [externalMembers, setExternalMembers] = useState<any>([]);

  let [allMembers, setAllMembers] = useState<any>([]);
  let [internalMembers, setInternalMembers] = useState<any>([]);
  useEffect(() => {
    setExternalMembers(
      committee?.allExternalMembersDtos?.map((member: CommitteeMemberModel) => {
        return {
          id: member?.userId,
          name: member?.name,
          phoneNumber: member?.phoneNumber,
          job: member?.job,
          destinationName: member?.destinationName,
          email: member?.email,
          permissionId: permissions?.find((permission:any) => {
            return member?.permissionNameAr == permission?.nameAr;
          })?.id,
        };
      })
    );
    setInternalMembers(
      committee?.allInternalMembersDtos?.map((member:any) => {
        return {
          memberId: member?.userId,
          permissionId: permissions?.find((permission:any) => {
            return member?.permissionNameAr == permission?.nameAr;
          })?.id,
        };
      })
    );
    setAllMembers(
      committee?.allInternalMembersDtos
        ?.map((member:any) => {
          return {
            ...member,
            id: member?.userId,
            permissionId: permissions?.find((permission:any) => {
              return member?.permissionNameAr == permission?.nameAr;
            })?.id,
          };
        })
        ?.concat(committee?.allExternalMembersDtos as any)
        ?.map((member:any) => {
          return {
            ...member,
            id: member?.userId,
            permissionId: permissions?.find((permission:any) => {
              return member?.permissionNameAr == permission?.nameAr;
            })?.id,
          };
        })
    );
    setCheckedUsers(
      committee?.allInternalMembersDtos?.map((member:any) => {
        return member?.userId;
      }) || []
    );
    setSelectedPermissions(
      Object.fromEntries(
        committee?.allInternalMembersDtos?.map(
          (member: CommitteeMemberModel) => [
            member.userId,
            permissions?.find((permission:any) => {
              return member?.permissionNameAr == permission?.nameAr;
            })?.id,
          ]
        ) || []
      )
    );
  }, [committee]);
  let formValues=watch()
  let location = useLocation();
  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";





    
  return (
    <>
      <div ref={ref}>
       
        <div className="card card-xl-stretch mb-xl-0" >
          <div className="card-body py-3 px-3 mx-8">
            <div className="tab-content">
              <div
                className="tab-pane fade active show"
                id="REGA_table_widget_5_tab_1"
              >
                <div className="row p-4">
                  <div className="col-lg-12 mb-2 pt-2 pb-3 filed_background">
                    <div className="d-flex justify-content-between">
                      <div className="col-lg-6 pt-3 pb-3">
                        <div>
                          <h5 className="mb-4 text-primary">
                            {" "}
                            {intl.formatMessage({ id: "CommitteeType" })} :{" "}
                            <span className="mx-3" style={{ color: "#a1a5b7" }}>
                              {committee?.requestStatus == 0
                                ? intl.formatMessage({ id: "Pendingg" })
                                : committee?.requestStatus == 1
                                  ? intl.formatMessage({ id: "Approvedd" })
                                  : intl.formatMessage({ id: "Rejectedd" })}
                            </span>
                          </h5>
                          <h5 className="mb-4 text-primary">
                            {" "}
                            {intl.formatMessage({ id: "CommitteeDate" })} :{" "}
                            <span className="mx-3" style={{ color: "#a1a5b7" }}>
                              {/* 7-9-2023 */}
                              {moment(committee?.committeeDate).format(
                                "YYYY-MM-DD"
                              )}
                            </span>
                          </h5>
                          <h5 className="mb-4 text-primary">
                            {" "}
                            {intl.formatMessage({
                              id: "CommitteeDuration",
                            })}{" "}
                            :{" "}
                            <span className="mx-3" style={{ color: "#a1a5b7" }}>
                              {committee?.committeeTime == 0
                                ? intl.formatMessage({ id: "Always" })
                                : committee?.committeeTime == 1
                                  ? intl.formatMessage({ id: "Temporary" })
                                  : intl.formatMessage({
                                      id: "RelatedToProject",
                                    })}
                            </span>
                          </h5>
                          {committee?.projectName?<>
                            <h5 className="mb-4 text-primary">
                            {" "}
                            {intl.formatMessage({ id: "ProjectName" })} :{" "}
                            <span className="mx-3" style={{ color: "#a1a5b7" }}>
                              {/* 7-9-2023 */}
                              {committee?.projectName}
                            </span>
                          </h5>
                          </>:<></>}
                          {committee?.committeeTime==1?<>
                            <h5 className="mb-4 text-primary">
                            {" "}
                            {intl.formatMessage({ id: "DateOfDecisionOfCommitteeFinishing" })} :{" "}
                            <span className="mx-3" style={{ color: "#a1a5b7" }}>
                              {moment(committee?.endDateCommittee).format(
                                "YYYY-MM-DD"
                              )}
                            </span>
                          </h5>
                          </>:<></>}
                          <h5 className="mb-4 text-primary">
                            {" "}
                            {intl.formatMessage({ id: "CommitteeName" })} :{" "}
                            <span className="mx-3" style={{ color: "#a1a5b7" }}>
                              {committee?.name}
                            </span>
                          </h5>
                          <h5 className="mb-4 text-primary">
                            {" "}
                            {intl.formatMessage({
                              id: "TheLegalBasisForFormingACommittee",
                            })}{" "}
                            :{" "}
                            <span className="mx-3" style={{ color: "#a1a5b7" }}>
                              {committee?.hasLegalDocument
                                ? intl.formatMessage({ id: "Found" })
                                : intl.formatMessage({ id: "NotFound" })}
                            </span>
                          </h5>
                        </div>
                      </div>
                       {/* {!isDownloading && (
                     

                        )} */}
                    </div>
                  </div>
                </div>
                {committee?.hasLegalDocument ? (
                  <>
                    <div className="col-lg-12 mb-2 pt-2 pb-3">
                      <label
                        htmlFor="notes"
                        className="form-label px-2 fontSz-6"
                      >
                        {intl.formatMessage({ id: "LegalBond" })}
                      </label>
                      
                      <p
                      id="notes"
                      className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                    >
                      {watch("LegalDocument")}
                    </p>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {formValues?.Missions?<> <div className="col-lg-12 mb-2 pt-2 pb-3">
                  <label
                    htmlFor="notes"
                    className="form-label px-2 fontSz-6 "
                  >
                    {intl.formatMessage({ id: "TasksOfTheCommittee" })}
                  </label>
                 
                  <p
                    id="notes"
                    className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                  >
                    {watch("Missions")}
                  </p>
                </div></>:<></>}
                {goals?.length>0?<><div className="col-lg-6 mb-2 pt-2 pb-3">
                  <label
                    htmlFor="goalsOfTheCommittee"
                    className="form-label px-2 fontSz-6 "
                  >
                    {intl.formatMessage({ id: "GoalsOfTheCommittee" })}
                  </label>
                  <div className="position-relative">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="special fas fa-tasks"></i>
                        </span>
                      </div>
                      <input
                        onChange={(e: any) => setInputGoals(e.target.value)}
                        type="text"
                        name="goalsOfTheCommittee"
                        id="goalsOfTheCommittee"
                        className="form-control"
                        placeholder={intl.formatMessage({
                          id: "GoalsOfTheCommittee",
                        })}
                        value={inputGoals}
                      />
                      {/* <div
                        className="position-absolute top-50 translate-middle-y btn btn-success text-hover-light"
                        style={{ right: "0px" }}
                      >
                        <i className="fas fa-plus fa-fw"></i>
                      </div> */}
                    </div>
                  </div>
                  <div className="mt-2 px-3 py-2 d-flex flex-column">
                    {goals?.map((goal, idx) => (
                      <>
                        <div
                          key={idx}
                          className="d-flex justify-content-between w-100 pb-2 mb-1"
                        >
                          <span>{goal.text}</span>
                        </div>
                      </>
                    ))}
                  </div>
                </div></>:<></>}

                {committee?.attachments?.length>0?<>
                  <div className="col-lg-12 mb-2 pt-2 pb-3">
                  <label
                    htmlFor="notes"
                    className="form-label mb-3 px-2 fontSz-6"
                  >
                    {intl.formatMessage({ id: "Attachments" })}
                  </label>
                  <CommitteReviewAttachmentsRow
                    attachments={committee?.attachments}
                  />
                </div>
                </>:<></>}
                {committee?.workRules?.length>0?<>
                  <div className="col-lg-12 mb-2 pt-2 pb-3">
                  <label
                    htmlFor="notes"
                    className="form-label mb-3 px-2 fontSz-6"
                  >
                    {intl.formatMessage({ id: "CommitteeWorkRules" })}
                  </label>
                  <CommitteReviewAttachmentsRow
                    attachments={committee?.workRules}
                  />
                </div>
                </>:<></>}
              </div>
             
              <div className="col-lg-12 mb-2 pt-2 pb-3">
                <CommitteReviewMembersForEditTable
                  allMembers={allMembers}
                  setExternalMembers={setExternalMembers}
                  setInternalMembers={setInternalMembers}
                  setAllMembers={setAllMembers}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}
)

export { CommitteesReviewShowDecisionDetails };
