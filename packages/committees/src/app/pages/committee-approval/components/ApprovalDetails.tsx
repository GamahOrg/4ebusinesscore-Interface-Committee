import { useEffect, useState } from "react";
import { CommitteeMember } from "./CommitteeMember";
import { useIntl } from "react-intl";
import { AcceptPopup } from "../../partials/AcceptPopup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SpecifyRequest from "../popup/committee-specify-request";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import moment from "moment";
import {
  editChangeCommitteeStatus,
  fetchCommitteeApprovals,
} from "../../../features/Approvals/committeeApprovalSlice";
import AttachmentRow from "./AttachmentRow";
import { useForm } from "react-hook-form";
import { fetchUserRoles } from "../../../features/committee/usersAggregatorSlice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

const ApprovalDetails = () => {
  const intl = useIntl();

  let location = useLocation();
  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";

  const [setLastAddedId] = useState<string | null>(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchCommitteeApprovals(id) as any);
    }
  }, [id]);

  const Committee = useSelector(
    (state: RootState) => state?.committeeApproval?.committee,
  );

  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalSShow, setModalSShow] = useState<boolean>(false);

  const {
    formState: { errors },
  } = useForm<any>({
    mode: "all",
    reValidateMode: "onChange",
  });

  const [notes, setNotes] = useState("");
  const [committeesStatus, setCommitteesStatus] = useState(0);

  const changeCommitteeStatus = async () => {
    let body = {
      id: id,
      committeesStatus: committeesStatus,
      notes: notes,
    };
    dispatch(
      editChangeCommitteeStatus({ id: id ?? "", item: body }) as any,
    ).then((res: any) => {
      if (res?.payload?.statusEnum == 1) {
        showSuccessAlert(true, "EditSuccessfully", intl, () => {
          navigate(-1);
        });
      } else {
      }
    });
  };

  let userId = JSON.parse(localStorage.getItem("userInfo") as string)?.id;

  useEffect(() => {
    dispatch(
      fetchUserRoles({ id: userId, pageSize: 10000, pageNumber: 1 }) as any,
    );
  }, [dispatch]);

  const userRoles = useSelector((state: RootState) => {
    return state?.usersAgg?.userRoles;
  });

  let isHasMangerOfCommittees =
    userRoles?.filter((role: any) => {
      return (
        role?.roleNameAr == "مدير اداره اللجان" ||
        role?.roleNameAr == "مدير إداره اللجان" ||
        role?.roleNameAr == "مدير ادارة اللجان" ||
        role?.roleNameAr == "مدير إداره اللجان"
      );
    })?.length > 0
      ? true
      : false;
  return (
    <>
      <div className="card card-xl-stretch mb-xl-0">
        <div className="card-body py-3 px-3 mx-8">
          <div className="tab-content">
            <div
              className="tab-pane fade active show"
              id="REGA_table_widget_5_tab_1"
            >
              <div className="row p-4">
                <div className="col-lg-12 mb-2 pt-2 pb-3 bg-fix-light bg-fix-dark">
                  <div className="d-flex flex-column-reverse flex-md-row justify-content-between">
                    <div className="col-lg-6 pt-3 pb-3">
                      <div>
                        <h5 className="mb-4 text-primary">
                          {" "}
                          {intl.formatMessage({ id: "CommitteeType" })} :{" "}
                          <span className="mx-3" style={{ color: "#a1a5b7" }}>
                            {Committee?.requestStatus === 0
                              ? intl.formatMessage({ id: "Pendingg" })
                              : Committee?.requestStatus === 1
                              ? intl.formatMessage({ id: "Approvedd" })
                              : intl.formatMessage({ id: "Rejectedd" })}
                          </span>
                        </h5>
                        <h5 className="mb-4 text-primary">
                          {intl.formatMessage({ id: "CommitteeDate" })} :
                          <span className="mx-3" style={{ color: "#a1a5b7" }}>
                            {moment(Committee?.committeeDate).format(
                              "YYYY-MM-DD",
                            )}
                          </span>
                        </h5>
                        <h5 className="mb-4 text-primary">
                          {intl.formatMessage({
                            id: "CommitteeDuration",
                          })}
                          :
                          <span className="mx-3" style={{ color: "#a1a5b7" }}>
                            {Committee?.committeeTime == 0
                              ? intl.formatMessage({ id: "Always" })
                              : Committee?.committeeTime == 1
                              ? intl.formatMessage({ id: "Temporary" })
                              : intl.formatMessage({
                                  id: "RelatedToProject",
                                })}
                          </span>
                        </h5>
                        {Committee?.committeeTime == 1 ? (
                          <>
                            <h5 className="mb-4 text-primary">
                              {" "}
                              {intl.formatMessage({
                                id: "DateOfDecisionOfCommitteeFinishing",
                              })}{" "}
                              :{" "}
                              <span
                                className="mx-3"
                                style={{ color: "#a1a5b7" }}
                              >
                                {moment(Committee?.endDateCommittee).format(
                                  "YYYY-MM-DD",
                                )}
                              </span>
                            </h5>
                          </>
                        ) : (
                          <></>
                        )}

                        <h5 className="mb-4 text-primary">
                          {intl.formatMessage({ id: "CommitteeName" })} :
                          <span className="mx-3" style={{ color: "#a1a5b7" }}>
                            {Committee?.name}
                          </span>
                        </h5>
                        <h5 className="mb-4 text-primary">
                          {intl.formatMessage({
                            id: "TheLegalBasisForFormingACommittee",
                          })}
                          :
                          <span className="mx-3" style={{ color: "#a1a5b7" }}>
                            {Committee?.hasLegalDocument
                              ? intl.formatMessage({
                                  id: "Found",
                                })
                              : intl.formatMessage({
                                  id: "NotFound",
                                })}
                          </span>
                        </h5>
                      </div>
                    </div>
                    <div className="col-lg-6 pt-2 pb-3 d-flex justify-content-end gap-1">
                      {Committee?.requestInstanceId &&
                      Committee?.requestInstanceId !==
                        "00000000-0000-0000-0000-000000000000" ? (
                        <></>
                      ) : (
                        <>
                          {isHasMangerOfCommittees ? (
                            <>
                              <div>
                                <div
                                  onClick={(event) => {
                                    event.preventDefault();
                                    setModalSShow(true);
                                  }}
                                  className="btn btn-primary mx-1 text-center"
                                >
                                  {intl.formatMessage({
                                    id: "SpecifyTheRequestPath",
                                  })}
                                </div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      )}

                      <Link
                        to={`/committee-approval/committee-details/${id}`}
                        state={{ serviceName: cardTitle }}
                      >
                        <div className="btn btn-primary mx-1 text-center">
                          {intl.formatMessage({ id: "ViewDetails" })}
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {Committee?.requestInstanceId &&
              Committee?.requestInstanceId !=
                "00000000-0000-0000-0000-000000000000" ? (
                <CommitteeMember
                  committee={Committee}
                  requestId={Committee?.requestInstanceId}
                />
              ) : (
                <>
                  <div>
                    {intl.formatMessage({ id: "NotFoundRequestInstanceYet" })}
                  </div>
                </>
              )}
              <div className="row d-flex gap-3">
                <div className="col-md-4 col-lg-4 col-sm-4 col-12 mb-2 pt-2 pb-3">
                  <label htmlFor="notes" className="form-label px-2  fontSz-6">
                    {intl.formatMessage({
                      id: "TheLegalBasisForFormingACommittee",
                    })}
                  </label>
                  <div className="d-flex p-3 filed_background">
                    <div className="form-check form-check-success form-check-sm form-check-custom mx-3">
                      <input
                        checked={Committee?.hasLegalDocument}
                        className="form-check-input"
                        type="radio"
                        name="cost"
                        id="exampleRadios1"
                        value="option1"
                        disabled={!Committee?.hasLegalDocument}
                      />
                      <label
                        className="form-check-label text-muted"
                        htmlFor="exampleRadios1"
                      >
                        {intl.formatMessage({ id: "Found" })}
                      </label>
                    </div>
                    <div className="form-check form-check-success form-check-sm form-check-custom">
                      <input
                        checked={!Committee?.hasLegalDocument}
                        className="form-check-input"
                        type="radio"
                        name="cost"
                        id="exampleRadios2"
                        value="option2"
                        disabled={Committee?.hasLegalDocument}
                        readOnly
                      />
                      <label
                        className="form-check-label text-muted"
                        htmlFor="exampleRadios2"
                      >
                        {intl.formatMessage({ id: "NotFound" })}
                      </label>
                    </div>
                  </div>
                </div>
                {Committee?.attachments?.length > 0 ? (
                  <>
                    <div className="col-lg-12 mb-2 pt-2 pb-3">
                      <label className="form-label px-2  fontSz-6">
                        {intl.formatMessage({ id: "ATTACHMENTS" })}
                      </label>
                      <AttachmentRow attach={Committee?.attachments} />
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {Committee?.workRules?.length > 0 ? (
                  <>
                    <div className="col-lg-12 mb-2 pt-2 pb-3">
                      <label className="form-label px-2  fontSz-6">
                        {intl.formatMessage({ id: "CommitteeWorkRules" })}
                      </label>
                      <AttachmentRow attach={Committee?.workRules} />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              {Committee?.legalDocument ? (
                <div className="col-lg-12 mb-2 pt-2 pb-3">
                  <label htmlFor="notes" className="form-label px-2 fontSz-6">
                    {intl.formatMessage({ id: "LegalBond" })}
                  </label>
                  <textarea
                    rows={5}
                    id="notes"
                    className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                    value={Committee?.legalDocument}
                    readOnly
                  ></textarea>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="rega_modal_committeesAcceptUser"
        aria-hidden="true"
      >
        <AcceptPopup show={modalShow} handleClose={() => setModalShow(false)} />
      </div>
      <div
        className="modal fade"
        id="rega_modal_specifyTheRequestPath"
        aria-hidden="true"
      >
        {modalSShow && (
          <SpecifyRequest
            show={modalSShow}
            handleClose={() => setModalSShow(false)}
            setLastAddedId={setLastAddedId}
            committeeId={id}
            committee={Committee}
            committeeName={Committee?.name}
          />
        )}
      </div>
    </>
  );
};

export default ApprovalDetails;
