import { useIntl } from "react-intl";
import AttachmentRow from "./AttachmentRow";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { useParams } from "react-router";
import { getUsersWithOrgDetails } from "../../../features/committee/usersAggregatorSlice";
import moment from "moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getPermissions } from "../../../features/committee/permissionsSlice";
import {
  EditCommitteeProps,
  EditCommitteeSchema,
} from "../../../validations/edit-committee-validation";
import { MembersTable } from "./MembersTable";
import AddExternalMember from "../popup/add-external-member-popup";
import { fetchCommitteeApprovals } from "../../../features/Approvals/committeeApprovalSlice";
import { CommitteeMemberModel } from "../../../models/committee-member-model";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

interface Goal {
  id: number;
  text: string;
}

const CommitteeDetailsPage = () => {
  const intl = useIntl();

  let language = intl.locale;

  const dispatch = useDispatch();
  let [searchTerm, setSearchTerm] = useState<string>("");
  let { committeeId } = useParams();

  const [goals, setGoals] = useState<Goal[]>([]);
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm<EditCommitteeProps>({
    resolver: yupResolver(EditCommitteeSchema),
    mode: "all",
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    dispatch(getPermissions({}) as any);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCommitteeApprovals(committeeId as string) as any);
    };
    fetchData();
  }, [committeeId]);

  const committee = useSelector((state: RootState) => {
    return state?.committeeApproval?.committee;
  });
  useEffect(() => {
    dispatch(
      getUsersWithOrgDetails({
        searchTerm,
        pageNumber: 1,
        pageSize: 1000,
      }) as any,
    );
  }, [searchTerm]);

  useEffect(() => {
    setValue("Description", committee?.description);
    setValue("LegalDocument", committee?.legalDocument);
    setValue("Missions", committee?.missions);
    setGoals(
      committee?.targets?.map((goal: any) => {
        return { id: Math.random() * 1000, text: goal };
      }),
    );
  }, [committee]);

  const [modalShow, setModalShow] = useState<boolean>(false);

  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<{
    [key: string]: string;
  }>({});

  let [externalMembers, setExternalMembers] = useState<any>([]);

  let [allMembers, setAllMembers] = useState<any>([]);
  let [internalMembers, setInternalMembers] = useState<any>([]);

  useEffect(() => {
    setInternalMembers(
      committee?.approvalInternalMembersDtos?.map((member: any) => {
        return {
          memberId: member?.userId,
          permissionId: member?.permissionId,
        };
      }),
    );
    setAllMembers([
      ...(committee?.approvalInternalMembersDtos || []).map((member: any) => ({
        ...member,
        id: member.userId,
        isInternal: true,
      })),
      ...(committee?.approvalExternalMembersDtos || []).map((member: any) => ({
        ...member,
        id: member.userId,
        isInternal: false,
      })),
    ]);

    setCheckedUsers(
      committee?.approvalInternalMembersDtos?.map((member: any) => {
        return member?.userId;
      }) || [],
    );
    setSelectedPermissions(
      Object.fromEntries(
        committee?.approvalInternalMembersDtos?.map(
          (member: CommitteeMemberModel) => [
            member.userId,
            member.permissionId,
          ],
        ) || [],
      ),
    );
  }, [committee]);

  return (
    <>
      <div className="card card-xl-stretch mb-xl-0">
        <div className="card-body py-3 px-3 mx-8">
          <div className="tab-content">
            <form>
              <div
                className="tab-pane fade active show"
                id="REGA_table_widget_5_tab_1"
              >
                <div className="row p-4">
                  <div className="col-lg-12 mb-2 pt-2 pb-3 bg-fix-light bg-fix-dark">
                    <div className="d-flex justify-content-between">
                      <div className="col-lg-5 pt-3 pb-3">
                        <div>
                          <h5 className="mb-4 text-primary">
                            {intl.formatMessage({ id: "CommitteeType" })} :
                            <span className="mx-3" style={{ color: "#a1a5b7" }}>
                              {committee?.requestStatus == 0
                                ? intl.formatMessage({ id: "Pendingg" })
                                : committee?.requestStatus == 1
                                ? intl.formatMessage({ id: "Approvedd" })
                                : intl.formatMessage({ id: "Rejectedd" })}
                            </span>
                          </h5>
                          <h5 className="mb-4 text-primary">
                            {intl.formatMessage({ id: "CommitteeDate" })} :
                            <span className="mx-3" style={{ color: "#a1a5b7" }}>
                              {moment(committee?.createdOn).format(
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
                              {committee?.committeeTime == 0
                                ? intl.formatMessage({ id: "Always" })
                                : committee?.committeeTime == 1
                                ? intl.formatMessage({ id: "Temporary" })
                                : intl.formatMessage({
                                    id: "RelatedToProject",
                                  })}
                            </span>
                          </h5>
                          {committee?.committeeTime == 1 ? (
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
                                  {moment(committee?.endDateCommittee).format(
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
                              {committee?.name}
                            </span>
                          </h5>
                          <h5 className="mb-4 text-primary">
                            {intl.formatMessage({
                              id: "TheLegalBasisForFormingACommittee",
                            })}
                            :
                            <span className="mx-3" style={{ color: "#a1a5b7" }}>
                              {committee?.hasLegalDocument
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
                      <textarea
                        rows={5}
                        id="notes"
                        readOnly
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                        {...register("LegalDocument")}
                      ></textarea>
                      {DisplayErrorMessage(
                        errors?.LegalDocument?.message,
                        intl,
                        language,
                      )}
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div className="col-lg-12 mb-2 pt-2 pb-3">
                  <label
                    htmlFor="notes"
                    className="form-label px-2 fontSz-6 required"
                  >
                    {intl.formatMessage({ id: "TasksOfTheCommittee" })}
                  </label>
                  <textarea
                    rows={5}
                    id="notes"
                    readOnly
                    className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                    {...register("Missions")}
                  ></textarea>
                  {DisplayErrorMessage(
                    errors?.Missions?.message,
                    intl,
                    language,
                  )}
                </div>
                <div className="mt-2 px-3 py-2 d-flex flex-column">
                  {goals?.map((goal, idx) => (
                    <>
                      <div
                        key={idx}
                        className="d-flex justify-content-between w-100 pb-2 mb-1"
                      >
                        <span>{goal?.text}</span>
                      </div>
                    </>
                  ))}
                </div>
                {committee?.attachments?.length > 0 ? (
                  <>
                    <div className="col-lg-12 mb-2 pt-2 pb-3">
                      <label
                        htmlFor="notes"
                        className="form-label mb-3 px-2 fontSz-6"
                      >
                        {intl.formatMessage({ id: "Attachments" })}
                      </label>
                      <AttachmentRow attach={committee?.attachments} />
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {committee?.workRules?.length > 0 ? (
                  <>
                    <div className="col-lg-12 mb-2 pt-2 pb-3">
                      <label
                        htmlFor="notes"
                        className="form-label mb-3 px-2 fontSz-6"
                      >
                        {intl.formatMessage({ id: "CommitteeWorkRules" })}
                      </label>
                      <AttachmentRow attach={committee?.workRules} />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="col-lg-12 mb-2 pt-2 pb-3">
                <MembersTable
                  allMembers={allMembers}
                  setExternalMembers={setExternalMembers}
                  setInternalMembers={setInternalMembers}
                  setAllMembers={setAllMembers}
                  isDetails={true}
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal fade" id="Rega_modal_hierarchy" aria-hidden="true">
        <AddExternalMember
          show={modalShow}
          handleClose={() => setModalShow(false)}
          allMembers={allMembers}
          setAllMembers={setAllMembers}
          externalMembers={externalMembers}
          setExternalMembers={setExternalMembers}
        />
      </div>
    </>
  );
};

export default CommitteeDetailsPage;
