import { FC, Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { DeletePopup } from "../../partials/DeletePopup";
import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../store/store";
import {
  getAllDelegationToUserByUserId,
  getProceedingById,
  putMemberAttend,
} from "../../../features/procceding/proceedingSlice";
import moment from "moment-timezone";
import { CommitteeRootUrl } from "@4eplatform/shared/apis/committee";
import { MembersMeetingActions } from "./MembersMeetingActions";
import { getUsersWithOrgDetails } from "../../../features/committee/usersAggregatorSlice";
import { getCommittee } from "../../../features/committee/committeesSlice";
const Item = ({ id, children, title }) => (
  <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
    <p className="text-truncate" style={{ maxWidth: "100px" }}>
      {children}
    </p>
  </OverlayTrigger>
);
const CommitteesReviewReportDetailsContent: FC = () => {
  const intl = useIntl();
  let language = intl.locale;
  let dispatch = useAppDispatch();
  const [modalDShow, setModalDShow] = useState<boolean>(false);
  const [delegateUser, setDelegateUser] = useState("");

  useEffect(() => {
    let delegatedUser = localStorage.getItem("userId") as string;
    if (delegatedUser) {
      setDelegateUser(delegatedUser);
    }
  }, []);

  useEffect(() => {
    if (delegateUser) {
      dispatch(
        getAllDelegationToUserByUserId({
          id: delegateUser as string,
          myparams: {
            pageNumber: 1,
            pageSize: 1000,
          },
        }) as any,
      );
    }
  }, [delegateUser, dispatch]);

  const delegated = useAppSelector((state: RootState) => {
    return state?.proceedings?.data;
  });

  const [delegatedToUserIds, setDelegatedToUserIds] = useState<any>([]);
  const [delegatedDate, setDdelegatedDate] = useState<any>([]);
  const [delegatedAcivate, setDdelegatedAcivate] = useState<any>([]);

  const [proceedingUserIds, setProceedingUserIds] = useState<any>([]);

  useEffect(() => {
    const extractedDelegatedToUserIds = delegated?.map(
      (delegated: any) => delegated?.delegeatedFromUserId,
    );
    const extractedDelegatedDate = delegated?.map(
      (delegated: any) => delegated?.endDate,
    );
    const extractedDelegatedAcivate = delegated?.map(
      (delegated: any) => delegated?.isActive,
    );
    setDelegatedToUserIds(extractedDelegatedToUserIds);
    setDdelegatedDate(extractedDelegatedDate);
    setDdelegatedAcivate(extractedDelegatedAcivate);
  }, [delegated]);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    memberId: string,
    isAttend: boolean,
  ) => {
    let memberAttend = {
      proceedingId,
      memberId,
      isAttend,
    };
    dispatch(putMemberAttend(memberAttend) as any).then(() => {});
  };

  let { proceedingId } = useParams();

  let proceeding = useAppSelector((state) => {
    return state?.proceedings?.proceeding;
  });

  useEffect(() => {
    const proceedingUserIds = proceeding?.internalMembers?.map(
      (proceeding: any) => proceeding?.userId,
    );
    setProceedingUserIds(proceedingUserIds);
  }, [proceeding?.internalMembers]);
  let users = useAppSelector((state) => {
    return state?.usersAgg?.users?.map((user) => {
      return user?.email;
    });
  });
  useEffect(() => {
    dispatch(getProceedingById(proceedingId) as any);
    dispatch(
      getUsersWithOrgDetails({
        pageNumber: 1,
        pageSize: 1000,
      }) as any,
    );
  }, [proceedingId, dispatch]);
  const getIconSrc = (attachmentUrl: string) => {
    const fileName = attachmentUrl?.substring(
      attachmentUrl.lastIndexOf("/") + 1,
    );

    if (
      fileName?.endsWith(".png") ||
      fileName?.endsWith(".jpg") ||
      fileName?.endsWith(".jpeg") ||
      fileName?.endsWith(".jfif") ||
      fileName?.endsWith(".webp")
    ) {
      return `${CommitteeRootUrl}${attachmentUrl}`;
    } else if (fileName?.endsWith(".pdf")) {
      return "/media/pmo/pdfIcon.png";
    } else if (fileName?.endsWith(".doc") || fileName?.endsWith(".docx")) {
      return "/media/pmo/wordIcon2.jpg";
    } else if (fileName?.endsWith(".xls") || fileName?.endsWith(".xlsx")) {
      return "/media/pmo/excelIcon2.jpg";
    } else if (fileName?.endsWith(".txt")) {
      return "/media/pmo/textIcon.png";
    } else if (
      fileName?.endsWith(".ppt") ||
      fileName?.endsWith(".pptx") ||
      fileName?.endsWith(".pptm") ||
      fileName?.endsWith(".pps") ||
      fileName?.endsWith(".ppsx") ||
      fileName?.endsWith(".ppsm")
    ) {
      return "/media/pmo/powerPointIcon.png";
    } else if (
      fileName?.endsWith(".mp4") ||
      fileName?.endsWith(".webm") ||
      fileName?.endsWith(".avi") ||
      fileName?.endsWith(".mkv") ||
      fileName?.endsWith(".flv") ||
      fileName?.endsWith(".ts")
    ) {
      return "/media/pmo/video.png";
    }
  };
  let proceedingMembers = proceeding?.internalMembers?.concat(
    proceeding?.externalMembers,
  );
  let logginedUserId = JSON.parse(localStorage.getItem("userInfo") as any)?.id;
  let isCommitteeMemberHasPersedirentOrSecretaryPermissions =
    localStorage?.getItem(
      "isCommitteeMemberHasPersedirentOrSecretaryPermissions",
    );

  useEffect(() => {
    dispatch(getProceedingById(proceedingId) as any).then((res) => {
      if (res?.payload?.message === "ProceedingIsRetrievedSuccessfully") {
        dispatch(
          getCommittee(res?.payload?.result?.committeeId as string) as any,
        );
      }
    });
  }, [dispatch]);
  const committeeDetails = useAppSelector((state: RootState) => {
    return state?.committees?.committee;
  });

  return (
    <>
      <div className="card">
        <div className="card-body d-flex justify-content-start pb-0">
          <div className="card-title d-flex flex-column align-items-start">
            <span className="fs-3 mb-2">
              {intl.formatMessage({ id: "CommitteesReportDetails" })}
            </span>
          </div>
        </div>
        <div className="card-body">
          <div>
            <div className="row gy-5">
              <div className="col-md-4">
                <div className="d-flex flex-column">
                  <span className="text-gray-600">
                    {intl.formatMessage({ id: "CommitteesReportName" })}
                  </span>
                  <span className="mx-3 text-primary">{proceeding?.name}</span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex flex-column">
                  <span className="text-gray-600">
                    {intl.formatMessage({ id: "ReportDate" })}
                  </span>
                  <span className="mx-3 text-primary">
                    {moment(proceeding?.date).format("YYYY-MM-DD")}
                  </span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex flex-column">
                  <span className="text-gray-600">
                    {intl.formatMessage({ id: "ReportTime" })}
                  </span>
                  <span className="mx-3 text-primary">
                    {moment
                      .tz(proceeding?.date, "UTC")
                      .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
                      .format("LT")}
                  </span>
                </div>
              </div>

              {proceeding?.attachments?.length > 0 ? (
                <div>{intl.formatMessage({ id: "FilesForTheReport" })}</div>
              ) : (
                <></>
              )}
              {proceeding?.attachments?.map(
                (attachment: any, index: number) => {
                  return (
                    <Fragment key={index}>
                      <div className="col-md-4 mt-1">
                        <div className="">
                          <div className="d-flex align-items-center">
                            <span>
                              <img
                                alt="attachment"
                                src={getIconSrc(attachment)}
                                width={"40px"}
                                height={"40px"}
                              />
                            </span>
                            <a
                              rel="noreferrer"
                              href={`${CommitteeRootUrl}${attachment}`}
                              download
                              target="_blank"
                            >
                              <div className="d-flex flex-column mx-3 position-relative my-2 my-md-0">
                                <span>
                                  {attachment?.split("/")?.slice(-1)[0]}
                                </span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  );
                },
              )}

              <div className="col-12">
                <div>
                  {proceeding?.notes ? (
                    <label htmlFor="reportNotice">
                      {" "}
                      {intl.formatMessage({ id: "Notice" })}
                    </label>
                  ) : (
                    <></>
                  )}

                  <p className="text-gray-600 mb-0">{proceeding?.notes}</p>
                </div>
              </div>
              <div className="col-12">
                <div>
                  <div className="py-5">
                    <div className="table-responsive">
                      <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                        <thead>
                          <tr className="fw-bolder text-muted bg-light-">
                            <th className="min-w-50px text-center">
                              {intl.formatMessage({ id: "CommitteesID" })}
                            </th>
                            <th className="min-w-150px text-center">
                              {intl.formatMessage({ id: "MemberData" })}
                            </th>
                            <th className="min-w-150px text-center">
                              {intl.formatMessage({ id: "Job" })}
                            </th>
                            <th className="min-w-150px text-center">
                              {intl.formatMessage({ id: "Permission" })}
                            </th>
                            <th className="min-w-100px text-center">
                              {intl.formatMessage({ id: "Attendance" })}
                            </th>
                            <th className="min-w-100px text-center">
                              {intl.formatMessage({ id: "Approvals" })}
                            </th>
                            <th className="min-w-100px text-center">
                              {intl.formatMessage({ id: "Notes" })}
                            </th>
                            <th className="min-w-100px text-center">
                              {intl.formatMessage({ id: "Actions" })}
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {proceedingMembers?.length > 0 &&
                            proceedingMembers?.map(
                              (member: any, index: any) => {
                                return (
                                  <Fragment key={member?.id || index}>
                                    <tr>
                                      <td className="text-center">
                                        {index + 1}
                                      </td>
                                      <td className="text-center">
                                        {member?.proceedingAcceptance === 0 ? (
                                          member?.name
                                        ) : member?.userId !==
                                            member?.updatedBy &&
                                          member?.updatedBy !==
                                            "00000000-0000-0000-0000-000000000000" &&
                                          member?.proceedingAcceptance !== 0 ? (
                                          <div className="text-primary fs-7">
                                            {intl.formatMessage({
                                              id: "DelegatedTo",
                                            })}
                                            :{" "}
                                            {member?.updatedByFullName
                                              ? member?.updatedByFullName
                                              : member?.name}
                                          </div>
                                        ) : member?.updatedByFullName ? (
                                          member?.updatedByFullName
                                        ) : (
                                          member?.name
                                        )}
                                      </td>
                                      <td className="text-center">
                                        {users?.includes(member?.email)
                                          ? language === "ar" && member?.jopAr
                                            ? member?.jopAr
                                            : language === "en" && member?.jopEn
                                            ? member?.jopEn
                                            : intl.formatMessage({
                                                id: "NotFound",
                                              })
                                          : member?.job
                                          ? member?.job
                                          : intl.formatMessage({
                                              id: "NotFound",
                                            })}
                                      </td>
                                      <td className="text-center">
                                        {language === "ar"
                                          ? member?.permissionNameAr
                                          : member?.permissionNameEn}
                                      </td>
                                      <td className="text-center">
                                        <div className="form-check form-check-custom form-check-solid d-flex justify-content-center">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`status-${member.userId}`}
                                            name="status"
                                            disabled
                                            checked={member?.isAttend}
                                          />
                                        </div>
                                      </td>
                                      <td className="text-center">
                                        <span
                                          className={`badge badge-light-${
                                            member?.proceedingAcceptance === 1
                                              ? "success"
                                              : member?.proceedingAcceptance ===
                                                2
                                              ? "danger"
                                              : member?.proceedingAcceptance ===
                                                3
                                              ? "primary"
                                              : "warning"
                                          } p-4`}
                                        >
                                          {member?.isAttend ? (
                                            <>
                                              {member?.proceedingAcceptance ===
                                              1
                                                ? intl.formatMessage({
                                                    id: "Accepted",
                                                  })
                                                : member?.proceedingAcceptance ===
                                                  2
                                                ? intl.formatMessage({
                                                    id: "Rejected",
                                                  })
                                                : member?.proceedingAcceptance ===
                                                  3
                                                ? intl.formatMessage({
                                                    id: "Reserved",
                                                  })
                                                : intl.formatMessage({
                                                    id: "Pendingg",
                                                  })}
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                          {committeeDetails?.isDelegated && (
                                            <>
                                              {committeeDetails?.delegators?.map(
                                                (delegator: any) => {
                                                  return (
                                                    <>
                                                      {delegator?.delegatorId ===
                                                        logginedUserId && (
                                                        <div className="text-primary fs-7">
                                                          {intl.formatMessage({
                                                            id: "DelegatedCommittee",
                                                          })}{" "}
                                                          {delegator?.name}
                                                          :" "
                                                        </div>
                                                      )}
                                                    </>
                                                  );
                                                },
                                              )}
                                            </>
                                          )}
                                        </span>
                                      </td>
                                      <td className="text-center">
                                        <Item
                                          id={member?.acceptanceMessage}
                                          title={member?.acceptanceMessage}
                                        >
                                          <>
                                            {member?.acceptanceMessage
                                              ? member?.acceptanceMessage
                                              : intl.formatMessage({
                                                  id: "NotFound",
                                                })}
                                          </>
                                        </Item>
                                      </td>

                                      <td className="text-center">
                                        {member?.proceedingAcceptance === 0 ? (
                                          users?.includes(member?.email) ? (
                                            // member.permissionNameAr === "امين اللجنة"
                                            // || member.permissionNameAr ===  "رئيس لجنه"
                                            // ||member.permissionNameAr ==="مساعد امين لجنه"
                                            // ||
                                            member.userId === logginedUserId ? (
                                              //   (member?.isAttend &&
                                              //     delegatedToUserIds.includes(
                                              //       member?.userId
                                              //     ) &&
                                              //     new Date(
                                              //       delegatedDate[
                                              //         delegatedToUserIds.indexOf(
                                              //           member?.userId
                                              //         )
                                              //       ]
                                              //     ) >= new Date() &&
                                              //     delegatedAcivate[
                                              //       delegatedToUserIds.indexOf(
                                              //         member?.userId
                                              //       )
                                              //     ] === true)
                                              //     ||
                                              // member?.userId ===
                                              //   logginedUserId
                                              <MembersMeetingActions
                                                id={member?.userId}
                                                proceedingAcceptance={
                                                  member?.proceedingAcceptance
                                                }
                                                proceedingId={
                                                  proceedingId as string
                                                }
                                              />
                                            ) : (
                                              <>---</>
                                            )
                                          ) : !users?.includes(member?.email) &&
                                            member?.isAttend &&
                                            member?.proceedingAcceptance ===
                                              0 &&
                                            isCommitteeMemberHasPersedirentOrSecretaryPermissions ===
                                              "true" ? (
                                            <MembersMeetingActions
                                              id={member?.userId}
                                              proceedingAcceptance={
                                                member?.proceedingAcceptance
                                              }
                                              proceedingId={
                                                proceedingId as string
                                              }
                                            />
                                          ) : (
                                            <>---</>
                                          )
                                        ) : (
                                          <>---</>
                                        )}
                                      </td>
                                    </tr>
                                  </Fragment>
                                );
                              },
                            )}
                        </tbody>
                      </table>
                      {proceedingMembers?.length === 0 ? (
                        <div className="w-100 d-flex align-items-center justify-content-center">
                          {intl.formatMessage({ id: "NoMembersFound" })}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" aria-hidden="true">
          <DeletePopup
            showDelete={modalDShow}
            handleCloseDelete={() => setModalDShow(false)}
          />
        </div>
      </div>
    </>
  );
};

export { CommitteesReviewReportDetailsContent };
