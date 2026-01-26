import moment from "moment";
import React, { Fragment, useEffect } from "react";
import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { useLocation } from "react-router-dom";
import ViewRequestEmployee from "../popup/ViewEmployeePopup";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";

interface Iprop {
  cardStatus: {
    committee: string;
    bgCard: string;
  };
  committee: any;
}
const Item = ({ id, children, title }) => (
  <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
    <div>{children}</div>
  </OverlayTrigger>
);
const CommitteesReviewHomeCard: FC<Iprop> = ({ cardStatus, committee }) => {
  const intl = useIntl();
  let location = useLocation();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";
  let loggedInUserId = localStorage?.getItem("userId");

  let loggedInUserPermission = committee?.allInternalMembersDtos?.find(
    (user) => {
      return user?.userId?.toLowerCase() === loggedInUserId?.toLowerCase();
    },
  )?.permissionId;

  const [isSecretaryOrPresident, setIsSecretaryOrPresident] =
    useState<boolean>(false);

  const { permissions } = useAppSelector((state) => state.permissions);

  useEffect(() => {
    let isSecretaryOrPresident = false;

    for (let i = 0; i < committee?.allExternalMembersDtos?.length; i++) {
      const member = committee.allExternalMembersDtos[i];
      if (
        // member.userId === loggedInUserId &&
        member.permissionNameAr === "امين اللجنة" ||
        member.permissionNameAr === "رئيس لجنه" ||
        member.permissionNameAr === "مساعد امين لجنه"
      ) {
        isSecretaryOrPresident = true;
        break;
      }
    }
    if (!isSecretaryOrPresident) {
      for (let i = 0; i < committee?.allInternalMembersDtos?.length; i++) {
        const member = committee.allInternalMembersDtos[i];
        if (
          // member.userId === loggedInUserId &&
          member.permissionNameAr === "امين لجنه" ||
          member.permissionNameAr === "رئيس لجنه" ||
          member.permissionNameAr === "مساعد امين لجنه"
        ) {
          isSecretaryOrPresident = true;

          break;
        }
      }
    }
    if (!isSecretaryOrPresident && committee?.isDelegated) {
      if (committee.delegatorId === loggedInUserId) {
        isSecretaryOrPresident = true;
      }
    }

    setIsSecretaryOrPresident(isSecretaryOrPresident);
  }, [
    loggedInUserPermission,
    committee?.delegatorPermissionId,
    loggedInUserId,
    permissions,
    committee?.allExternalMembersDtos,
    committee?.allInternalMembersDtos,
    committee?.isDelegated,
    committee?.delegatorId,
  ]);

  return (
    <div className="d-flex col-lg-4 col-sm-6 mb-5">
      <div className="card pb-5 flex-grow-1">
        <div
          className={`card-body bg-light-${cardStatus.bgCard} p-4 rounded-2 overflow-hidden`}
        >
          <div className="d-flex flex-stack justify-content-between align-items-center">
            <Link
              to={`${
                cardStatus.bgCard === "success"
                  ? `/committees-review/comittees-tab-details/${committee?.id}`
                  : `/committees-review/committee-under-study/${committee?.id}`
              }`}
              state={{
                serviceName: cardTitle,
              }}
              className="d-flex align-items-md-center align-items-start w-100"
            >
              <div className="symbol symbol-xl-75px symbol-lg-40px  symbol-md-40px symbol-sm-75px">
                <span
                  className={`symbol-label bg-${cardStatus.bgCard} text-inverse-info fw-bolder`}
                >
                  <i className="bi bi-command text-white fs-3x"></i>
                </span>
              </div>

              <div className="d-flex flex-column  flex-grow-1 mx-3">
                <div className="d-flex  flex-sm-column flex-md-row align-items-start w-100">
                  <div className="d-flex align-items-start flex-column pb-2 ">
                    <span className="text-dark fw-bolder fs-5 pb-2 selectWidth ">
                      {committee?.name}
                    </span>
                    <span className="text-gray-600">
                      <span className="text-gray-600">
                        {committee?.allExternalMembersDtos
                          ?.concat(committee?.allInternalMembersDtos)
                          ?.filter(
                            (member: any) =>
                              member?.permissionId ===
                              "32820481-5dfb-4aa8-b43b-ce3e486928a7",
                          )
                          ?.map((member: any) => member?.name)
                          ?.join("") ||
                          intl.formatMessage({
                            id: "NotFoundCommitteeSecretary",
                          })}
                      </span>
                    </span>
                  </div>
                  <div className="d-flex align-items-md-end align-items-start flex-column pb-2">
                    <div className="text-gray-500 pb-1 d-flex justify-content-between">
                      <p className="fw-bolder fs-7 m-0 d-flex justify-content-between align-items-center">
                        <span className="mx-2">
                          <i
                            className={`fad fa-users fa-fw text-${cardStatus.bgCard}`}
                          ></i>
                        </span>
                        <span className="w-100 p-1">
                          {intl.formatMessage({ id: "Committee" })}
                        </span>
                      </p>
                    </div>
                    <span className="text-gray-700 fs-7 my-2">
                      {intl.formatMessage({ id: "CommitteeSecretary" })}
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <div className="d-flex  fw-bold fs-8">
                    <span className="text-primary">
                      {intl.formatMessage({ id: "Created" })}:
                      <span>
                        {moment(committee?.createdOn).format("YYYY-MM-DD")}
                      </span>
                    </span>
                    <span className="w-1px h-25px bg-gray-300 mx-3"></span>
                    {committee?.requestStatus === 0 ? (
                      <></>
                    ) : (
                      <>
                        <span className="text-success px-2">
                          {intl.formatMessage({ id: "CommitteeWorkBeginning" })}
                          :
                          <span>
                            {moment(committee?.committeeDate).format(
                              "YYYY-MM-DD",
                            )}
                          </span>
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
          {committee?.isDelegated ? (
            <div className="d-flex justify-content-center lex-stack flex-sm-column flex-md-row w-100">
              <div
                role="button"
                className="text-primary "
                onClick={() => {
                  setUserId(committee?.delegatorId);
                  setModalShow(true);
                }}
              >
                <div className="d-flex  fw-bold fs-7">
                  {intl.formatMessage({ id: "delegatorName" })} :{" "}
                  {committee?.delegatorFullName}
                </div>
                <div className="d-flex  fw-bold fs-7">
                  {intl.formatMessage({ id: "ThePosition" })} :{" "}
                  {committee?.delegatorPermissionNameAr}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="card-body p-4">
          <div className="col-xl-12 d-flex align-items-center">
            <div>
              <div className="symbol symbol-45px">
                <span className="symbol-label bg-light-gray ">
                  <span className="svg-icon svg-icon-2x svg-icon-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-list-ul"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                      ></path>
                    </svg>
                  </span>
                </span>
              </div>
              <span className="fs-6 text-dark">
                {intl.formatMessage({ id: "Missions" })}
              </span>
            </div>
            <div className="">
              <Item
                id={""}
                title={
                  <ul>
                    {committee?.missions
                      ?.split(/\r?\n/)
                      ?.map((mission: any, index: any) => {
                        return (
                          <li className="fw-bold fs-7 mt-1 mb-0" key={index}>
                            {mission?.replace(/^\d+-/, "")}
                          </li>
                        );
                      })}
                  </ul>
                }
              >
                <>
                  <ul>
                    {committee?.missions
                      ?.split(/\r?\n/)
                      ?.map((mission: any, index: any) => {
                        return (
                          <li className="fw-bold fs-7 mt-1 mb-0" key={index}>
                            {mission?.replace(/^\d+-/, "")}
                          </li>
                        );
                      })
                      ?.slice(0, 2)}
                  </ul>
                </>
              </Item>
            </div>
          </div>
        </div>
        <div className="card-body p-4">
          <div className="text-dark mb-3">
            {intl.formatMessage({ id: "Members" })}{" "}
            <span>{committee?.allInternalMembersDtos?.length}</span>
          </div>
          <div id="committeesMembers" className="d-flex flex-wrap">
            {committee?.allInternalMembersDtos?.map(
              (member: any, index: any) => {
                return (
                  <Fragment key={member?.id || index}>
                    <div>
                      <Link
                        to={"#!"}
                        className="symbol symbol-40px mx-2"
                        data-bs-toggle="tooltip"
                        title={`${member?.name}-(${
                          intl.locale === "ar"
                            ? member?.permissionNameAr
                            : member?.permissionNameEn
                        })`}
                        data-bs-original-title={`${member?.name}`}
                      >
                        <img
                          src={
                            member?.imagUrl
                              ? `${UserManagmentRootUrl}${member?.imagUrl}`
                              : toAbsoluteUrl("/media/avatars/user.jpg")
                          }
                          alt=""
                          onError={(e: any) =>
                            (e.target.src = toAbsoluteUrl(
                              `/media/avatars/user.jpg`,
                            ))
                          }
                        />
                      </Link>
                    </div>
                  </Fragment>
                );
              },
            )}
          </div>
        </div>

        {cardStatus?.committee === "RealEstateAppraisalCommittee" ? (
          <>
            <div className="card-body p-4">
              <div className="d-flex flex-center flex-sm-column flex-md-row">
                <Link
                  to={`/committees-review/comittees-tab-details/${committee?.id}`}
                  state={{
                    allInternalMembersDtos: committee?.allInternalMembersDtos,
                    serviceName: cardTitle,
                  }}
                  className="btn btn-primary py-3 mx-3"
                >
                  {intl.formatMessage({ id: "ShowDetails" })}
                </Link>
                {isSecretaryOrPresident ? (
                  <>
                    <Link
                      to={`/committees-review/edit-committee/${committee?.id}`}
                      state={{
                        serviceName: cardTitle,
                      }}
                      style={{ minWidth: "130px" }}
                      className="btn btn-light-primary py-3 mx-3"
                    >
                      {intl.formatMessage({ id: "Edit" })}
                    </Link>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="card-body p-4">
              <div className="d-flex flex-center flex-sm-column flex-md-row">
                <Link
                  to={`/committees-review/committee-under-study/${committee?.id}`}
                  state={{
                    serviceName: cardTitle,
                  }}
                  className="btn btn-primary py-3 mx-3"
                >
                  {intl.formatMessage({ id: "ShowDetails" })}
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      {modalShow ? (
        <>
          <ViewRequestEmployee
            show={modalShow}
            handleClose={() => setModalShow(false)}
            id={userId}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export { CommitteesReviewHomeCard };
