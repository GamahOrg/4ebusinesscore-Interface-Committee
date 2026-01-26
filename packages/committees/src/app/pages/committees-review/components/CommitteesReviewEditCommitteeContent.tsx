import { FC, useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import CommitteReviewAttachmentsRow from "./CommitteReviewAttachmentsRow";
import { EditPopup } from "../../partials/EditPopup";
import { EmployeeHierarchyPopup } from "../../partials/EmployeeHierarchyPopup";
import { editCommitteee } from "../../../features/committee/committeeOperationsSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getPermissions } from "../../../features/committee/permissionsSlice";
import { PermissionsModel } from "../../../models/permissions-model";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getNotApprovedCommitteeById } from "../../../features/committee/committeesSlice";
import {
  EditCommitteeProps,
  EditCommitteeSchema,
} from "../../../validations/edit-committee-validation";
import moment from "moment";
import { CommitteReviewMembersForEditTable } from "./CommitteReviewMembersForEditTable";
import { getUsersWithOrgDetails } from "../../../features/committee/usersAggregatorSlice";
import { UsersAggModel } from "../../../models/users-aggregator-model";
import AddExternalMemberForEdit from "../../committee-formation/popup/add-external-member-for-edit";
import { Button, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { CommitteeMemberModel } from "../../../models/committee-member-model";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";

interface Goal {
  id: number;
  text: string;
}
const useEffectAllDepsChange = (fn: any, deps: any[]) => {
  const prevDepsRef = useRef(deps);

  const allChanged = deps.every((dep, i) => dep !== prevDepsRef.current[i]);

  useEffect(() => {
    if (allChanged) {
      fn();
      prevDepsRef.current = deps;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allChanged, fn]);
};

const CommitteesReviewEditCommitteeContent: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const intl = useIntl();
  let navigate = useNavigate();
  let [searchTerm, setSearchTerm] = useState<string>("");
  let { committeeId } = useParams();
  const [nextId, setNextId] = useState(1);
  const [inputGoals, setInputGoals] = useState("");
  const [goals, setGoals] = useState<Goal[]>([]);
  const [permissions, setPermissions] = useState<any>([]);

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
  const handleGoalsSubmit = (e: any) => {
    e.preventDefault();
    if (inputGoals) {
      const newGoal = {
        id: nextId,
        text: inputGoals,
      };
      setGoals([...goals, newGoal]);
      setNextId(nextId + 1);
      setInputGoals("");
    }
  };
  const handleDeleteGoal = (idx: any) => {
    const newGoals = goals.filter((goal: any) => goal.id !== idx);
    setGoals(newGoals);
  };
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
        searchTerm,
        pageNumber: 1,
        pageSize: 1000,
      }) as any,
    );
  }, [searchTerm]);
  let users = useAppSelector((state) => {
    return state?.usersAgg?.users?.map((user) => {
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
      committee?.targets?.map((goal) => {
        return { id: Math.random() * 1000, text: goal };
      }),
    );
  }, [committee]);

  let formValues = watch();
  let language: string = intl.locale;
  const DisplayErrorMessage = (error: any, intl: any) => {
    return (
      <div
        className="invalid-feedback"
        style={{
          display: error ? "block" : "none",
          width: "100%",
          textAlign: language == "ar" ? "right" : "left",
        }}
      >
        <p
          style={{
            width: "100%",
            textAlign: language == "ar" ? "right" : "left",
          }}
        >
          {error
            ? intl.formatMessage({
                id: error,
              })
            : ""}
        </p>
      </div>
    );
  };

  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  const [modalEShow, setModalEShow] = useState<boolean>(false);
  const [showMemberType, setShowMemberType] = useState<string>("internal");
  const [committeeMembers, setCommitteeMembers] = useState<string>("member");
  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<any>({});

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const found = committee.allInternalMembersDtos?.some(
    (com) =>
      com.userId === userInfo.id &&
      com.permissionId === "32820481-5dfb-4aa8-b43b-ce3e486928b7",
  );

  const handlePermissionChange = (userId: string, permissionId: string) => {
    setSelectedPermissions((prevSelectedPermissions) => ({
      ...prevSelectedPermissions,
      [userId]: permissionId,
    }));
  };

  const handleCheckboxChange = (userId: string) => {
    const isChecked = checkedUsers?.includes(userId);
    setCheckedUsers((prevCheckedUsers) =>
      isChecked
        ? prevCheckedUsers?.filter((id) => id !== userId)
        : [...prevCheckedUsers, userId],
    );
  };
  let permissionsData = useAppSelector(
    (state) => state?.permissions?.permissions,
  );

  useEffect(() => {
    if (permissionsData.length)
      setPermissions(() =>
        permissionsData.filter(
          (permission) =>
            permission?.id !== "3567bde2-03f2-4586-4717-08dd04a1c7f7",
        ),
      );
  }, [permissionsData]);

  let [externalMembers, setExternalMembers] = useState<any>([]);

  let [allMembers, setAllMembers] = useState<any>([]);
  let [internalMembers, setInternalMembers] = useState<any>([]);

  useEffectAllDepsChange(() => {
    if (!committee || !permissions) return;

    setInternalMembers(
      committee?.allInternalMembersDtos?.map((member) => {
        return {
          memberId: member?.userId,
          permissionId: permissions?.find((permission) => {
            return member?.permissionNameAr == permission?.nameAr;
          })?.id,
        };
      }),
    );

    setAllMembers(
      committee?.allInternalMembersDtos
        ?.map((member) => {
          return {
            ...member,
            id: member?.userId,
            permissionId: permissions?.find((permission) => {
              return member?.permissionNameAr == permission?.nameAr;
            })?.id,
          };
        })
        ?.concat([])
        ?.map((member) => {
          return {
            ...member,
            id: member?.userId,
            permissionId: permissions?.find((permission) => {
              return member?.permissionNameAr == permission?.nameAr;
            })?.id,
          };
        }),
    );

    setCheckedUsers(
      committee?.allInternalMembersDtos?.map((member) => {
        return member?.userId;
      }) || [],
    );

    setSelectedPermissions(
      Object.fromEntries(
        committee?.allInternalMembersDtos?.map(
          (member: CommitteeMemberModel) => [
            member.userId,
            permissions?.find((permission) => {
              return member?.permissionNameAr == permission?.nameAr;
            })?.id,
          ],
        ) || [],
      ),
    );
  }, [committee, permissions]);

  let handleAddInternalMember = () => {
    setAllMembers((prev) => {
      const filteredUsers = users?.filter((user) => {
        return checkedUsers?.includes(user?.id as string);
      });
      const updatedMembersSet = new Set([...prev, ...filteredUsers]);
      const updatedMembersArray = Array.from(updatedMembersSet);
      const uniqueIds = {};
      const uniqueMembers = updatedMembersArray?.filter((item) => {
        if (!uniqueIds[item.id]) {
          uniqueIds[item.id] = true;
          return true;
        }
        return false;
      });
      return uniqueMembers
        ?.filter((member) => {
          if (member?.userName) {
            return checkedUsers?.includes(member?.id as string);
          } else {
            return true;
          }
        })
        .map((user) => {
          if (user?.userName) {
            return {
              ...user,
              name: `${user?.fisrtName} ${user?.secondName} ${user?.thirdName} ${user?.forthName}`,
              permissionId: selectedPermissions[user?.id],
              permissionNameAr: permissions?.find((permission) => {
                return permission?.id == selectedPermissions[user?.id];
              })?.nameAr,
              permissionNameEn: permissions?.find((permission) => {
                return permission?.id == selectedPermissions[user?.id];
              })?.nameEn,
            };
          } else {
            return user;
          }
        });
    });
    setInternalMembers((prev) => {
      return [
        ...prev,
        ...users
          ?.filter((user) => {
            return checkedUsers?.includes(user?.id as string);
          })
          ?.map((user) => {
            return {
              memberId: user?.id,
              permissionId: selectedPermissions[user?.id as string],
            };
          }),
      ]?.filter((member) => {
        return checkedUsers?.includes(member?.memberId as string);
      });
    });
  };
  let presidentDuplicate = allMembers?.filter((member) => {
    return member?.permissionId == "32820481-5dfb-4aa8-b43b-ce3e486928d7";
  })?.length;
  let secretaryKeeperCount = allMembers?.filter((member) => {
    return member?.permissionId == "975912ea-8064-498b-66d3-08dd06f363aa";
  })?.length;
  let secretaryDuplicate = allMembers?.filter((member) => {
    return member?.permissionId == "32820481-5dfb-4aa8-b43b-ce3e486928a7";
  })?.length;
  let memberCount = allMembers?.filter((member) => {
    return member?.permissionId == "32820481-5dfb-4aa8-b43b-ce3e486928b7";
  })?.length;
  let membersEmails = allMembers?.map((member) => {
    return member?.email;
  });
  let checkAllMembersHasPermission =
    allMembers
      ?.map((member) => {
        return member?.permissionId;
      })
      ?.includes(undefined) ||
    allMembers
      ?.map((member) => {
        return member?.permissionId;
      })
      ?.includes("-1");

  const modifyCommittee = () => {
    let uniqueIdsForInternalMembers = {};

    const uniqueInternalMembers = internalMembers
      ?.map((member) => {
        return {
          memberId: member?.memberId,
          permissionId: member?.permissionId,
        };
      })
      ?.filter((item) => {
        if (!uniqueIdsForInternalMembers[item.memberId]) {
          uniqueIdsForInternalMembers[item.memberId] = true;
          return true;
        }
        return false;
      });
    let editedCommittee =
      committee?.committeeTime == 1
        ? {
            id: committeeId,
            Name: committee?.name,
            CommitteeDate: moment(committee?.committeeDate).toISOString(),
            EndDateCommittee: moment(committee?.endDateCommittee).toISOString(),
            CommitteeTime: committee?.committeeTime,
            ProjectName: committee?.projectName || "",
            Description: formValues?.Description || "",
            HasLegalDocument: committee?.hasLegalDocument,
            WorkRule: committee?.workRule || "",
            LegalDocument: formValues?.LegalDocument || "",
            Missions: formValues?.Missions || "",
            ExternalMembers: externalMembers?.map((member) => {
              return {
                name: member?.name,
                phoneNumber: member?.phoneNumber?.includes("+966")
                  ? member?.phoneNumber
                  : `+966${member?.phoneNumber}`,
                job: member?.job,
                destinationName: member?.destinationName,
                email: member?.email,
                permissionId: member?.permissionId,
              };
            }),
            InternalMembers: allMembers
              ?.filter((member) => {
                return (
                  member?.hasOwnProperty("imageUrl") ||
                  member?.hasOwnProperty("imagUrl") ||
                  member?.hasOwnProperty("imgUrl")
                );
              })
              ?.map((ele) => {
                return {
                  permissionId: ele?.permissionId,
                  memberId: ele?.userId,
                };
              }),
            Targets: goals?.map((goal) => {
              return { goal: goal?.text };
            }),
          }
        : {
            id: committeeId,
            Name: committee?.name,
            CommitteeDate: moment(committee?.committeeDate).toISOString(),
            CommitteeTime: committee?.committeeTime,
            ProjectName: committee?.projectName || "",
            Description: formValues?.Description || "",
            HasLegalDocument: committee?.hasLegalDocument,
            WorkRule: committee?.workRule || "",
            LegalDocument: formValues?.LegalDocument || "",
            Missions: formValues?.Missions || "",
            ExternalMembers: externalMembers?.map((member) => {
              return {
                name: member?.name,
                phoneNumber: member?.phoneNumber?.includes("+966")
                  ? member?.phoneNumber
                  : `+966${member?.phoneNumber}`,
                job: member?.job,
                destinationName: member?.destinationName,
                email: member?.email,
                permissionId: member?.permissionId,
              };
            }),
            InternalMembers: allMembers
              ?.filter((member) => {
                return (
                  member?.hasOwnProperty("imageUrl") ||
                  member?.hasOwnProperty("imagUrl") ||
                  member?.hasOwnProperty("imgUrl")
                );
              })
              ?.map((ele) => {
                return {
                  permissionId: ele?.permissionId,
                  memberId: ele?.userId,
                };
              }),
            Targets: goals?.map((goal) => {
              return { goal: goal?.text };
            }),
          };
    setLoading(true);
    if (allMembers?.length == 0) {
      showSuccessAlert(
        false,
        "YouMustEnterMembersForCommittee",
        intl,
        () => {},
      );
      setLoading(false);
    } else if (presidentDuplicate > 1 && secretaryDuplicate > 1) {
      showSuccessAlert(
        false,
        "YouCan'tAddMultipleMembersAsPresidentAlsoSecretary",
        intl,
        () => {},
      );
      setLoading(false);
    } else if (presidentDuplicate > 1) {
      showSuccessAlert(
        false,
        "YouMustEnterOnlyOneMemberAsPresidentForCommittee",
        intl,
        () => {},
      );
      setLoading(false);
    } else if (secretaryDuplicate > 1) {
      showSuccessAlert(
        false,
        "YouMustEnterOnlyOneMemberAsSecretaryForCommittee",
        intl,
        () => {},
      );
      setLoading(false);
    } else if (presidentDuplicate == 0 && secretaryDuplicate == 0) {
      showSuccessAlert(
        false,
        "YouMustEnterAtLeastOneMemberAsPresidentForCommittee&AtLeastOneMemberAsSecretaryForCommittee",
        intl,
        () => {},
      );
      setLoading(false);
    } else if (presidentDuplicate == 0) {
      showSuccessAlert(
        false,
        "YouMustEnterAtLeastOneMemberAsPresidentForCommittee",
        intl,
        () => {},
      );
      setLoading(false);
    } else if (secretaryDuplicate == 0) {
      showSuccessAlert(
        false,
        "YouMustEnterAtLeastOneMemberAsSecretaryForCommittee",
        intl,
        () => {},
      );
      setLoading(false);
    } else if (memberCount == 0) {
      showSuccessAlert(
        false,
        "YouMustEnterAtLeastOneMemberAsMemberForCommittee",
        intl,
        () => {},
      );
      setLoading(false);
    } else if (secretaryKeeperCount > 1) {
      showSuccessAlert(false, "SecretaryKeeperCountMaxIs1", intl, () => {});
      setLoading(false);
    } else if (membersEmails?.length != new Set(membersEmails).size) {
      showSuccessAlert(false, "There'sADuplicateInEmails", intl, () => {});
      setLoading(false);
    } else if (checkAllMembersHasPermission) {
      showSuccessAlert(
        false,
        "AllMembersOfCommitteeMustHavePermission",
        intl,
        () => {},
      );
      setLoading(false);
    } else {
      dispatch(editCommitteee(editedCommittee) as any).then((res) => {
        if (res?.payload?.statusEnum == 1) {
          showSuccessAlert(true, "SavedSuccessfully", intl, () => {
            navigate("/committees-review", {
              state: {
                serviceName: cardTitle,
              },
            });
          });
        } else {
          showSuccessAlert(
            false,
            res?.payload?.message == "Email already exists in the system"
              ? "EmailAlreadyExistsInTheSystem"
              : res?.payload?.message,
            intl,
          );
        }
        setLoading(false);
      });
    }
  };

  let location = useLocation();
  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";

  return (
    <>
      <form onSubmit={handleSubmit(modifyCommittee)}>
        <div className="card card-xl-stretch mb-xl-0">
          <div className="card-body py-3 px-3 mx-8">
            <div className="tab-content">
              <div
                className="tab-pane fade active show"
                id="REGA_table_widget_5_tab_1"
              >
                <div className="row p-4">
                  <div className="col-lg-12 mb-2 pt-2 pb-3 filed_background">
                    <div className="d-flex justify-content-between">
                      <div className="col-lg-5 pt-3 pb-3">
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
                                "YYYY-MM-DD",
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
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                        {...register("LegalDocument")}
                      ></textarea>
                      {DisplayErrorMessage(
                        errors?.LegalDocument?.message,
                        intl,
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
                    className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                    {...register("Missions")}
                  ></textarea>
                  {DisplayErrorMessage(errors?.Missions?.message, intl)}
                </div>
                {committee?.targets?.length > 0 && (
                  <div className="col-lg-6 mb-2 pt-2 pb-3">
                    <label
                      htmlFor="goalsOfTheCommittee"
                      className="form-label px-2 fontSz-6"
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
                        <div
                          onClick={handleGoalsSubmit}
                          className="position-absolute top-50 translate-middle-y btn btn-success text-hover-light"
                          style={{ right: "0px" }}
                        >
                          <i className="fas fa-plus fa-fw"></i>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 px-3 py-2 d-flex flex-column">
                      {goals?.map((goal, idx) => (
                        <div
                          key={idx}
                          className="d-flex justify-content-between w-100 pb-2 mb-1"
                        >
                          <span>{goal.text}</span>
                          <span
                            role="button"
                            onClick={() => handleDeleteGoal(goal.id)}
                          >
                            <i className="fas fa-times-circle fa-fw text-danger fa-lg"></i>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {committee?.attachments?.length > 0 && (
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
                )}
                {committee?.workRules?.length > 0 && (
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
                )}
              </div>
              <div className="row">
                <div className="col-lg-4 mb-2 pt-2 pb-3">
                  <label htmlFor="notes" className="form-label px-2  fontSz-6">
                    {intl.formatMessage({ id: "CommitteMembers" })}
                  </label>
                  <div className="d-flex p-3 filed_background">
                    <div className="form-check form-check-success form-check-sm form-check-custom mx-3">
                      <input
                        defaultChecked
                        className="form-check-input"
                        type="radio"
                        name="committee-member"
                        id="member"
                        value="member"
                        onClick={() => setCommitteeMembers("member")}
                        style={{ display: "block" }}
                      />
                      <label className="form-check-label" htmlFor="member">
                        {intl.formatMessage({ id: "Member" })}
                      </label>
                    </div>
                  </div>
                </div>
                {committeeMembers === "member" && (
                  <div className="col-lg-4 mb-2 pt-2 pb-3">
                    <label
                      htmlFor="notes"
                      className="form-label px-2  fontSz-6"
                    >
                      {intl.formatMessage({ id: "MemberType" })}
                    </label>
                    <div className="d-flex p-3 filed_background">
                      <div className="d-flex filed_background">
                        <div className="form-check form-check-success form-check-sm form-check-custom mx-2">
                          <input
                            defaultChecked
                            style={{ display: "block" }}
                            className="form-check-input"
                            type="radio"
                            name="committee-member-type"
                            id="internal"
                            value="internal"
                            onClick={() => setShowMemberType("internal")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="internal"
                          >
                            {intl.formatMessage({ id: "InternalMember" })}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {committeeMembers === "role" && (
                  <div className="col-lg-4 mb-2 pt-2 pb-3">
                    <label
                      htmlFor="notes"
                      className="form-label px-2  fontSz-6"
                    >
                      {intl.formatMessage({ id: "PositionName" })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-user-cog special"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        placeholder={intl.formatMessage({ id: "PositionName" })}
                      />
                      <div className="h-110 d-flex" role="button">
                        <span
                          className="input-group-text"
                          onClick={() => setModalHShow(true)}
                        >
                          <i className="bi bi-diagram-3 fs-3 text-muted"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {showMemberType === "internal" && (
                <>
                  <div className="col-lg-12 mb-2 pt-2 pb-3">
                    <div className="border border-secondary-subtle borderRadius-top">
                      <div className="position-relative text-center py-4 w-75 mx-auto">
                        <input
                          style={{
                            background: "#F5F8FA",
                            borderRadius: "6px",
                            outline: "unset",
                            border: "0",
                            padding: "1rem 3rem 1rem 1rem",
                          }}
                          type="search"
                          name="searchForProject"
                          className="input input-group searchBoxDesign border-fix-dark bg-fix-dark text-fix-dark"
                          id="searchForProject"
                          value={searchTerm}
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                          }}
                          placeholder={intl.formatMessage({
                            id: "SearchForAMemberByLastName",
                          })}
                        />
                        <i
                          className="fa-solid fa-light fa-magnifying-glass fs-3 fa-fw position-absolute"
                          style={{
                            top: "50%",
                            right: "1rem",
                            transform: "translateY(-50%)",
                          }}
                        ></i>
                      </div>
                      <div className=" d-flex justify-content-center px-3 py-2 ">
                        <div
                          className="scroll-y mb-3 me-n5 pe-5 h-200px d-flex justify-content-between px-3 py-2 flex-column w-100"
                          data-kt-scroll="true"
                          data-kt-scroll-activate="{default: false, lg: true}"
                          data-kt-scroll-max-height="auto"
                          data-kt-scroll-dependencies="#kt_header, #kt_toolbar, #kt_footer, #kt_contacts_list_header"
                          data-kt-scroll-wrappers="#kt_content, #kt_contacts_list_body"
                          data-kt-scroll-stretch="#kt_contacts_list, #kt_contacts_main"
                          data-kt-scroll-offset="5px"
                        >
                          {users?.map((user: UsersAggModel) => (
                            <div key={user?.id as string}>
                              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                                <div className="w-50 d-flex align-items-center ">
                                  <div className="mx-2">
                                    <div className=" d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                                      <input
                                        className="form-check-input widget-9-check xCheckBg"
                                        type="checkbox"
                                        id={`${user?.id}`}
                                        checked={checkedUsers?.includes(
                                          user?.id as string,
                                        )}
                                        onChange={() =>
                                          handleCheckboxChange(
                                            user?.id as string,
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                  <img
                                    src={
                                      user?.imageUrl
                                        ? `${UserManagmentRootUrl}${user.imageUrl}`
                                        : toAbsoluteUrl(
                                            `/media/avatars/user.jpg`,
                                          )
                                    }
                                    className="ms-3"
                                    style={{
                                      display: "block",
                                      height: "46px",
                                      width: "46px",
                                      borderRadius: "50%",
                                    }}
                                    alt={user?.fisrtName}
                                    onError={(e: any) =>
                                      (e.target.src = toAbsoluteUrl(
                                        `/media/avatars/user.jpg`,
                                      ))
                                    }
                                  />
                                  <div>
                                    <div
                                      style={{
                                        fontWeight: "700",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {user?.fisrtName == "" &&
                                      user?.secondName == "" &&
                                      user?.thirdName == "" &&
                                      user?.forthName == "" ? (
                                        <span className="mx-1">
                                          {user?.userName}
                                        </span>
                                      ) : (
                                        <>
                                          <span className="mx-1">
                                            {user?.fisrtName}
                                          </span>
                                          <span className="mx-1">
                                            {user?.secondName}
                                          </span>
                                          <span className="mx-1">
                                            {user?.thirdName}
                                          </span>
                                          <span className="mx-1">
                                            {user?.forthName}
                                          </span>
                                        </>
                                      )}
                                    </div>
                                    <div
                                      style={{
                                        fontWeight: "400",
                                        fontSize: "13px",
                                      }}
                                    >
                                      {language == "ar"
                                        ? user?.orgNameAr
                                        : user?.orgNameEn}
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center">
                                  {checkedUsers?.includes(
                                    user?.id as string,
                                  ) && (
                                    <>
                                      {" "}
                                      <div className="w-150px pb-3 mx-5">
                                        <label
                                          htmlFor={`permissions_${user?.id}`}
                                          className="form-label px-2  fontSz-6 required"
                                        >
                                          {intl.formatMessage({
                                            id: "Permission",
                                          })}
                                        </label>

                                        <select
                                          id={`permissions_${user?.id}`}
                                          value={
                                            selectedPermissions[
                                              user?.id as string
                                            ] || -1
                                          }
                                          onChange={(e) =>
                                            handlePermissionChange(
                                              user?.id as string,
                                              e.target.value,
                                            )
                                          }
                                          className="form-select form-select-solid"
                                        >
                                          <option value={-1} disabled>
                                            {intl.formatMessage({
                                              id: "Choose",
                                            })}
                                          </option>
                                          {permissions?.map(
                                            (Permission: PermissionsModel) => (
                                              <option
                                                value={Permission?.id}
                                                key={Permission?.id}
                                              >
                                                {language == "ar"
                                                  ? Permission?.nameAr
                                                  : Permission?.nameEn}
                                              </option>
                                            ),
                                          )}
                                        </select>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <div
                      className="btn btn-success mx-1 text-center w-40"
                      onClick={() => {
                        if (checkedUsers.length === 0) {
                          showSuccessAlert(false, "SelectOne", intl);
                          return;
                        }

                        const usersWithoutPermissions = checkedUsers.filter(
                          (userId) => {
                            const permission = selectedPermissions[userId];
                            return !permission;
                          },
                        );

                        if (usersWithoutPermissions.length > 0) {
                          showSuccessAlert(false, "SelectPermit", intl);
                          return;
                        }

                        handleAddInternalMember();
                        showSuccessAlert(true, "AddedSuccessfully", intl);
                      }}
                      style={{
                        pointerEvents: found ? "none" : "auto",
                        opacity: found ? 0.5 : 1,
                        cursor: found ? "not-allowed" : "pointer",
                      }}
                    >
                      {intl.formatMessage({ id: "ADD" })}
                    </div>
                  </div>
                </>
              )}
              {showMemberType === "external" && (
                <div className="col-lg-12 mb-2 pt-2 pb-3">
                  <div
                    role="button"
                    style={{ borderRadius: "10px" }}
                    className="p-3 border border-primary border-2 text-primary text-center"
                    onClick={() => setModalShow(true)}
                  >
                    <i className="fa-solid fa-user-plus mx-2 fs-3 fa-fw"></i>
                    {intl.formatMessage({ id: "AddExternalMember" })}
                  </div>
                </div>
              )}
              <div className="col-lg-12 mb-2 pt-2 pb-3">
                <CommitteReviewMembersForEditTable
                  allMembers={allMembers}
                  setExternalMembers={setExternalMembers}
                  setInternalMembers={setInternalMembers}
                  setAllMembers={setAllMembers}
                />
              </div>
              <div className="col-12 col-lg-7 mx-auto mb-10 mt-10">
                <div className=" card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                  <div className="d-flex justify-content-center align-items-center w-50">
                    <Link
                      to={"/committees-review"}
                      state={{
                        serviceName: cardTitle,
                      }}
                      className="btn btn-secondary mx-1 text-center w-100"
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </Link>

                    {!loading ? (
                      <button
                        type="submit"
                        className="btn btn-primary mx-1 text-center w-100"
                        disabled={found}
                      >
                        {intl.formatMessage({ id: "Save" })}
                      </button>
                    ) : (
                      <Button variant="primary" disabled className="px-15 w-50">
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="mx-2"
                        />
                        <span>{intl.formatMessage({ id: "Adding" })}</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="modal fade" id="Rega_modal_hierarchy" aria-hidden="true">
        <AddExternalMemberForEdit
          show={modalShow}
          handleClose={() => setModalShow(false)}
          allMembers={allMembers}
          setAllMembers={setAllMembers}
          externalMembers={externalMembers}
          setExternalMembers={setExternalMembers}
        />
      </div>
      <div className="modal fade" id="Rega_modal_hierarchy" aria-hidden="true">
        <EmployeeHierarchyPopup
          show={modalHShow}
          handleClose={() => setModalHShow(false)}
        />
      </div>
      <div className="modal fade" id="Rega_modal_edit" aria-hidden="true">
        <EditPopup
          showEdit={modalEShow}
          handleCloseEdit={() => setModalEShow(false)}
        />
      </div>
    </>
  );
};

export { CommitteesReviewEditCommitteeContent };
