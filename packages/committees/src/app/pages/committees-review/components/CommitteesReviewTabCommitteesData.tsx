import React, { useEffect } from "react";
import { FC } from "react";
import { useIntl } from "react-intl";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../store/store";
import { getCommittee } from "../../../features/committee/committeesSlice";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getProceedings } from "../../../features/procceding/proceedingSlice";
import { getMeetings } from "../../../features/meeting/meetingSlice";
import AttachmentRow from "../../committee-approval/components/AttachmentRow";
import { Spinner } from 'react-bootstrap';
const CommitteesReviewTabCommitteesData: FC = () => {
  const intl = useIntl();
  let { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCommittee(id as string) as any);
    dispatch(getProceedings(id) as any);
    dispatch(getMeetings(id) as any);
  }, [id]);
  const committeeDetails = useAppSelector((state: RootState) => {
    return state?.committees?.committee;
  });
  const committeeDetailsStatus = useAppSelector((state: RootState) => {
    return state?.committees?.status;
  });

  
  let meetings = useAppSelector((state: RootState) => {
    return state?.meetings?.meetings;
  });
  return (
    <>
    {
      committeeDetailsStatus === 2 ?
    
      <div className="card card-body">
        <div className="d-flex flex-column mb-5 pb-5">
          <div className="bg-gray-200 border-top-2 border-bottom-2 border-0 border-gray-300 border-dashed p-4">
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column">
                <span>{intl.formatMessage({ id: "CommitteeData" })}</span>
                <span className="text-gray-500">
                  <span className="mx-2">
                    {intl.formatMessage({ id: "BuildingPermitData" })}
                  </span>
                </span>
              </div>
              <a
                href={`/committee/committees-review/committee-decision-show-details/${committeeDetails?.id}`}
                target="_blank"
              >
                <div className="btn btn-primary">
                  <span>
                    <i className="far fa-file fa-fw fs-5 mx-1"></i>
                  </span>
                  <span>
                    {intl.formatMessage({ id: "ACopyOfTheDecision" })}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <div>
            <div className="symbol symbol-65px mb-2 toolsIcon">
              <span className="symbol-label bg-success">
                <span className="svg-icon svg-icon-4x svg-icon-primary">
                  <i className="bi bi-command text-white fs-3x"></i>
                </span>
              </span>
            </div>
          </div>
          <div className="d-flex flex-column mx-3">
            <h5 className="mb-5">{committeeDetails?.name}</h5>
            <div className="d-flex mb-5 flex-column flex-md-row">
              <div className="d-flex align-items-center mx-2 mb-2 mb-md-0">
                <span>
                  <i className="fas fa-id-badge fa-fw fs-4 text-primary"></i>
                </span>
                <span className="text-gray-500 mx-1">
                  {committeeDetails?.projectName == "undefined" ||
                  committeeDetails?.projectName == undefined ||
                  committeeDetails?.projectName == "null" ||
                  committeeDetails?.projectName == "لا يوجد" ||
                  committeeDetails?.projectName == null
                    ? ""
                    : committeeDetails?.projectName}
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center flex-column flex-md-row">
              <div className="border border-1 border-gray-400 px-5 py-3 mx-2 rounded-2 mb-2 mb-md-0">
                <div className="d-flex flex-column align-items-center">
                  <span className="px-5">
                    {moment(committeeDetails?.createdOn).format("YYYY-MM-DD")}
                  </span>
                  <span className="text-gray-500">
                    {intl.formatMessage({ id: "DateCreated" })}
                  </span>
                </div>
              </div>
              {committeeDetails?.committeeTime == 1 ? (
                <>
                  <div className="border border-1 border-gray-400 px-5 py-3 mx-2 rounded-2 mb-2 mb-md-0">
                    <div className="d-flex flex-column align-items-center">
                      <span className="px-5">
                        {moment(committeeDetails?.endDateCommittee).format(
                          "YYYY-MM-DD"
                        )}
                      </span>
                      <span className="text-gray-500">
                        {intl.formatMessage({ id: "DateFinished" })}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex flex-column my-5 py-5">
          <div className="bg-gray-200 border-top-2 border-bottom-2 border-0 border-gray-300 border-dashed p-4">
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column">
                <span>{intl.formatMessage({ id: "GeneralData" })}</span>
                <span className="text-gray-500">
                  <span className="mx-2">
                    {intl.formatMessage({ id: "DisplayDecisionDetails" })}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ overflow: "auto" }}
          className="d-flex flex-column text-gray-500"
        >
          <div className="d-flex align-items-center border-bottom-2 border-0 border-gray-300 border-dashed py-5">
            <div className="d-flex align-items-center flex-shrink-0">
              <span>
                <i className="fas fa-bars fa-fw fs-4"></i>
              </span>
              <span className="mx-1">
                {intl.formatMessage({ id: "CommitteName" })}:
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center w-100 mx-2 flex-column flex-md-row">
              <span className="text-gray-600 mb-1 mb-md-0">
                {committeeDetails?.name}
              </span>

              <span>
                <span className="mx-2 text-dark">
                  {intl.formatMessage({ id: "DateCreated" })}:
                </span>
                <span>
                  {moment(committeeDetails?.createdOn).format("YYYY-MM-DD")}
                </span>
              </span>
            </div>
          </div>
          {committeeDetails?.committeeTime == 1 ? (
            <>
              <div className="d-flex align-items-center border-bottom-2 border-0 border-gray-300 border-dashed py-5">
                <div className="d-flex align-items-center flex-shrink-0">
                  <span>
                    <i className="fas fa-bookmark fa-fw fs-4"></i>
                  </span>
                  <span className="mx-1">
                    {intl.formatMessage({
                      id: "DateOfDecisionOfCommitteeFinishing",
                    })}
                    :
                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center w-100 mx-2">
                  <span className="text-gray-600">
                    {moment(committeeDetails?.endDateCommittee).format(
                      "YYYY-MM-DD"
                    )}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          {committeeDetails?.committeeTime == 2 ? (
            <>
              {committeeDetails?.projectName == "undefined" ||
              committeeDetails?.projectName == undefined ||
              committeeDetails?.projectName == "null" ||
              committeeDetails?.projectName == null ? (
                <>
                  <div className="d-flex align-items-center border-bottom-2 border-0 border-gray-300 border-dashed py-5">
                    <div className="d-flex align-items-center flex-shrink-0">
                      <span>
                        <i className="fas fa-bookmark fa-fw fs-4"></i>
                      </span>
                      <span className="mx-1">
                        {intl.formatMessage({ id: "ProjectName" })}:
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center w-100 mx-2">
                      <span className="text-gray-600">
                        {committeeDetails?.projectName}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
          <div className="d-flex align-items-center border-bottom-2 border-0 border-gray-300 border-dashed py-5">
            <div className="d-flex align-items-center flex-shrink-0">
              <span>
                <i className="fab fa-elementor fa-fw fs-4"></i>
              </span>
              <span className="mx-1">
                {intl.formatMessage({ id: "CommitteDetailsDescription" })}:
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center w-100 mx-2">
              <span className="text-gray-600">
                {committeeDetails?.requestStatus === 0
                  ? intl.formatMessage({ id: "UnderStudying1" })
                  : committeeDetails?.requestStatus === 1
                    ? intl.formatMessage({ id: "Accepted" })
                    : intl.formatMessage({ id: "Rejected" })}
              </span>
            </div>
          </div>
          <div className="d-flex align-items-center border-bottom-2 border-0 border-gray-300 border-dashed py-5">
            <div className="d-flex align-items-center flex-shrink-0">
              <span>
                <i className="fab fa-elementor fa-fw fs-4"></i>
              </span>
              <span className="mx-1">
                {intl.formatMessage({
                  id: "TheLegalBasisForFormingACommittee",
                })}
                :
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center w-100 mx-2">
              <span className="text-gray-600">
                {committeeDetails?.hasLegalDocument
                  ? intl.formatMessage({
                      id: "Found",
                    })
                  : intl.formatMessage({
                      id: "NotFound",
                    })}
              </span>
            </div>
          </div>

          {committeeDetails?.legalDocument ? (
            <div className="d-flex align-items-center border-bottom-2 border-0 border-gray-300 border-dashed py-5">
              <div className="d-flex align-items-center flex-shrink-0">
                <span>
                  <i className="fab fa-elementor fa-fw fs-4"></i>
                </span>
                <span className="mx-1">
                  {intl.formatMessage({ id: "LegalBond" })}:
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center w-100 mx-2">
                <span className="text-gray-600">
                  {committeeDetails?.legalDocument}
                </span>
              </div>
            </div>
          ) : null}
          {committeeDetails?.missions ? (
            <>
              <div className="d-flex align-items-center border-bottom-2 border-0 border-gray-300 border-dashed py-5">
                <div className="d-flex align-items-center flex-shrink-0">
                  <span>
                    <i className="fab fa-elementor fa-fw fs-4"></i>
                  </span>
                  <span className="mx-1">
                    {intl.formatMessage({
                      id: "TasksOfTheCommittee",
                    })}
                    :
                  </span>
                </div>
                <ul>
                  {committeeDetails?.missions
                    ?.split(/\r?\n/)
                    ?.map((mission, index) => {
                      return (
                        <li
                          className="fw-bold fs-7 mt-1 mb-0 text-gray-600"
                          key={index}
                        >
                          {mission?.replace(/^\d+-/, "")}
                        </li>
                      );
                    })}
                </ul>
                {/* <div className="d-flex justify-content-between align-items-center w-100 mx-2">
              <span className="text-gray-600">
                {committeeDetails?.missions}
              </span>
            </div> */}
              </div>
            </>
          ) : (
            <></>
          )}
          {committeeDetails?.targets?.length > 0 ? (
            <>
              <div className="d-flex align-items-center border-bottom-2 border-0 border-gray-300 border-dashed py-5">
                <div className="d-flex align-items-center flex-shrink-0">
                  <span>
                    <i className="fab fa-elementor fa-fw fs-4"></i>
                  </span>
                  <span className="mx-1">
                    {intl.formatMessage({
                      id: "GoalsOfTheCommittee",
                    })}
                    :
                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center w-100 mx-2">
                  <span className="text-gray-600">
                    {committeeDetails?.targets?.join(" - ")}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          {committeeDetails?.attachments?.length > 0 ? (
            <>
              {" "}
              <div className="col-lg-12 mb-2 pt-2 pb-3">
                <label className="form-label px-2  fontSz-6">
                  {intl.formatMessage({ id: "ATTACHMENTS" })}
                </label>
                <AttachmentRow attach={committeeDetails?.attachments} />
              </div>
            </>
          ) : (
            <></>
          )}
          {committeeDetails?.workRules?.length > 0 ? (
            <>
              <div className="col-lg-12 mb-2 pt-2 pb-3">
                <label className="form-label px-2  fontSz-6">
                  {intl.formatMessage({ id: "CommitteeWorkRules" })}
                </label>
                <AttachmentRow attach={committeeDetails?.workRules} />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      :(
        <div className="d-flex gap-4 justify-content-center align-items-center py-4"
         >
            {intl.formatMessage({ id: "LoadingData" })}
            <Spinner animation="border" variant="primary" />
          </div>
      )
    }
    </>
  );
};

export { CommitteesReviewTabCommitteesData };
