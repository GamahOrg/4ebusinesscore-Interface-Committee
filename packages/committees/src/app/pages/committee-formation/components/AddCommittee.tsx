import React from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { AddPopup } from "../../partials/AddPopup";
import { useEffect, useState } from "react";
import { MembersTable } from "./MembersTableForAdd";
import AddExternalMember from "../popup/add-external-member";
import { Notification } from "@4eplatform/shared/services/notifications";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../store/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AddCommitteeProps,
  AddCommitteeSchema,
} from "../../../validations/add-committee-validation";
import { getPermissions } from "../../../features/committee/permissionsSlice";
import { PermissionsModel } from "../../../models/permissions-model";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { addCommittee } from "../../../features/committee/committeeOperationsSlice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { getUsersWithOrgDetails } from "../../../features/committee/usersAggregatorSlice";
import { UsersAggModel } from "../../../models/users-aggregator-model";
import { useLocation } from "react-router-dom";
import {
  fetchRoles,
  fetchUserRoles,
} from "../../../features/committee/rolesSlice";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";

interface Goal {
  id: number;
  text: string;
}

const AddCommittee = () => {
  useEffect(() => {
    let params: any = {
      pageSize: "100000",
      pageNumber: "1",
    };
    dispatch(fetchRoles(params) as any);
  }, []);
  let roles = useAppSelector((state: RootState) => {
    return state?.roles?.roles;
  });
  let usersInRole = useAppSelector((state: RootState) => {
    return state?.roles?.usersInRole;
  });
  let roleIdForCommitteesManager = roles?.find((item) => {
    return (
      item?.nameAr == "مدير اداره اللجان" ||
      item?.nameAr == "مدير إداره اللجان" ||
      item?.nameAr == "مدير ادارة اللجان" ||
      item?.nameAr == "مدير إدارة اللجان"
    );
  })?.id;
  useEffect(() => {
    if (roleIdForCommitteesManager) {
      dispatch(
        fetchUserRoles({ id: roleIdForCommitteesManager, myparams: {} }) as any,
      );
    }
  }, [roleIdForCommitteesManager]);

  const [loading, setLoading] = useState<boolean>(false);
  let [searchTerm, setSearchTerm] = useState<string>("");
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  const [modalEShow, setModalEShow] = useState<boolean>(false);
  const [selectedFilesForAttachments, setSelectedFilesForAttachments] =
    useState<any>([]);
  const [selectedFilesForWorkRules, setSelectedFilesForWorkRules] =
    useState<any>([]);
  const handleFileInputChange = (event: any) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setSelectedFilesForAttachments([
      ...selectedFilesForAttachments,
      ...filesArray,
    ]);
  };
  const handleFileDelete = (indexToRemove: any) => {
    const updatedFiles = selectedFilesForAttachments.filter(
      (file: any, index: any) => index !== indexToRemove,
    );
    setSelectedFilesForAttachments(updatedFiles);
  };
  const handleFileInputChangeForWorkRules = (event: any) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setSelectedFilesForWorkRules([...selectedFilesForWorkRules, ...filesArray]);
  };
  const handleFileDeleteForWorkRules = (indexToRemove: any) => {
    const updatedFiles = selectedFilesForWorkRules.filter(
      (file: any, index: any) => index !== indexToRemove,
    );
    setSelectedFilesForWorkRules(updatedFiles);
  };
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddCommitteeProps>({
    resolver: yupResolver(AddCommitteeSchema),
    mode: "all",
    reValidateMode: "onSubmit",
  });
  let formValues = watch();

  const intl = useIntl();
  const [showMemberType, setShowMemberType] = useState<string>("internal");
  const [committeeMembers, setCommitteeMembers] = useState<string>("member");
  let [hasLegalDocument, setHasLegalDocument] = useState<boolean>(true);
  useEffect(() => {
    setValue("HasLegalDocument", hasLegalDocument);
  }, [hasLegalDocument]);

  const [nextId, setNextId] = useState(1);
  const [inputGoals, setInputGoals] = useState("");
  const [goals, setGoals] = useState<Goal[]>([]);
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
  function validateTotalFileSize(fileList: any) {
    const MAX_TOTAL_SIZE_MB = 10;
    const MAX_TOTAL_SIZE_BYTES = MAX_TOTAL_SIZE_MB * 1024 * 1024;
    const totalSize: any = Array.from(fileList)?.reduce(
      (sum, file: any) => sum + file.size,
      0,
    );
    return totalSize <= MAX_TOTAL_SIZE_BYTES;
  }
  let dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPermissions({}) as any);
  }, []);
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
    return state?.usersAgg?.users?.map((user: any) => {
      return { ...user, id: user?.userId };
    });
  });
  let experts = useAppSelector((state) => {
    return state?.experts?.data;
  });
  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<{
    [key: string]: string;
  }>({});
  const handlePermissionChange = (userId: string, permissionId: string) => {
    setSelectedPermissions((prevSelectedPermissions) => ({
      ...prevSelectedPermissions,
      [userId]: permissionId,
    }));
  };

  const handleCheckboxChange = (userId: string) => {
    const isChecked = checkedUsers.includes(userId);
    setCheckedUsers((prevCheckedUsers) =>
      isChecked
        ? prevCheckedUsers.filter((id) => id !== userId)
        : [...prevCheckedUsers, userId],
    );
  };
  let permissions = useAppSelector((state) => {
    return state?.permissions?.permissions?.filter((permission: any) => {
      return permission?.id != "3567bde2-03f2-4586-4717-08dd04a1c7f7";
    });
  });

  const committeeTimeOptions = [
    {
      id: 0,
      name: intl.formatMessage({ id: "Always" }),
    },
    {
      id: 1,
      name: intl.formatMessage({ id: "Temporary" }),
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "RelatedToProject" }),
    },
  ];
  let language: string = intl.locale;

  let [externalMembers, setExternalMembers] = useState<any>([]);

  let [allMembers, setAllMembers] = useState<any>([]);
  let [internalMembers, setInternalMembers] = useState<any>([]);
  let handleAddInternalMember = () => {
    setAllMembers((prev) => {
      const filteredUsers = users?.filter((user: any) => {
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
              permissionNameAr: permissions?.find((permission: any) => {
                return permission?.id == selectedPermissions[user?.id];
              })?.nameAr,
              permissionNameEn: permissions?.find((permission: any) => {
                return permission?.id == selectedPermissions[user?.id];
              })?.nameEn,
            };
          } else {
            return user;
          }
        });
    });
    setInternalMembers((prev: any) => {
      return [
        ...prev,
        ...users
          ?.filter((user: any) => {
            return checkedUsers?.includes(user?.id as string);
          })
          ?.map((user: any) => {
            return {
              memebrId: user?.id,
              permissionId: selectedPermissions[user?.id as string],
            };
          }),
      ]?.filter((member) => {
        return checkedUsers?.includes(member?.memebrId as string);
      });
    });
  };
  let presidentDuplicate = allMembers?.filter((member: any) => {
    return member?.permissionId == "32820481-5dfb-4aa8-b43b-ce3e486928d7";
  })?.length;
  let secretaryKeeperCount = allMembers?.filter((member: any) => {
    return member?.permissionId == "975912ea-8064-498b-66d3-08dd06f363aa";
  })?.length;
  let secretaryDuplicate = allMembers?.filter((member: any) => {
    return member?.permissionId == "32820481-5dfb-4aa8-b43b-ce3e486928a7";
  })?.length;
  let memberCount = allMembers?.filter((member: any) => {
    return member?.permissionId == "32820481-5dfb-4aa8-b43b-ce3e486928b7";
  })?.length;
  let membersEmails = allMembers?.map((member: any) => {
    return member?.email;
  });
  let checkAllMembersHasPermission =
    allMembers
      ?.map((member: any) => {
        return member?.permissionId;
      })
      ?.includes(undefined) ||
    allMembers
      ?.map((member: any) => {
        return member?.permissionId;
      })
      ?.includes("-1");
  const startCommittee = () => {
    let uniqueIdsForInternalMembers = {};

    const uniqueInternalMembers = internalMembers
      ?.map((member: any) => {
        return {
          memebrId: member?.memebrId,
          permissionId: member?.permissionId,
        };
      })
      ?.filter((item: any) => {
        if (!uniqueIdsForInternalMembers[item.memebrId]) {
          uniqueIdsForInternalMembers[item.memebrId] = true;
          return true;
        }
        return false;
      });
    let committee =
      formValues?.CommitteeTime == 1
        ? {
            Name: formValues?.Name,
            CommitteeDate: moment(formValues?.CommitteeDate).toISOString(),
            EndDateCommittee: moment(
              formValues?.CommitteeFinishDate,
            ).toISOString(),
            CommitteeTime: formValues?.CommitteeTime,
            ProjectName: formValues?.ProjectName || "",
            Description: "",
            HasLegalDocument: hasLegalDocument,
            WorkRule: formValues?.WorkRule || "",
            LegalDocument: formValues?.LegalDocument,
            Missions: formValues?.Missions || "",
            Attachments: selectedFilesForAttachments,
            WorkRules: selectedFilesForWorkRules,
            ExternalMembers: externalMembers?.map((member: any) => {
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
              ?.filter((member: any) => {
                return member?.hasOwnProperty("imgUrl");
              })
              ?.map((ele: any) => {
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
            Name: formValues?.Name,
            CommitteeDate: moment(formValues?.CommitteeDate).toISOString(),
            CommitteeTime: formValues?.CommitteeTime,
            ProjectName: formValues?.ProjectName || "",
            HasLegalDocument: hasLegalDocument,
            WorkRule: formValues?.WorkRule || "",
            LegalDocument: formValues?.LegalDocument || "",
            Missions: formValues?.Missions || "",
            Attachments: selectedFilesForAttachments,
            WorkRules: selectedFilesForWorkRules,
            ExternalMembers: externalMembers?.map((member: any) => {
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
            // InternalMembers: uniqueInternalMembers?.map((member)=>{return {permissionId:member?.permissionId,memberId:member?.memebrId}}),
            InternalMembers: allMembers
              ?.filter((member: any) => {
                return member?.hasOwnProperty("imgUrl");
              })
              ?.map((ele: any) => {
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
      if (validateTotalFileSize(selectedFilesForAttachments) == false) {
        showSuccessAlert(false, "TotalFilesSizeNotBeExcee10MB", intl, () => {});
        setLoading(false);
        return;
      }
      if (validateTotalFileSize(selectedFilesForWorkRules) == false) {
        showSuccessAlert(
          false,
          "TotalFilesSizeForWorkRulesNotBeExcee10MB",
          intl,
          () => {},
        );
        setLoading(false);
        return;
      }
      dispatch(addCommittee(committee) as any).then((res: any) => {
        if (res?.payload?.statusEnum === 1) {
          showSuccessAlert(true, "AddedSuccessfully", intl, () => {
            navigate("/committees-review", {
              state: { serviceName: cardTitle },
            });
            usersInRole?.forEach((user: any) => {
              Notification.addingNewCommittee(
                user?.userId,
                `/committee/committee-approval/committee-approval-details/${res?.payload?.result}`,
                89,
                res?.payload?.result,
                user?.email,
                true,
                121,
                formValues?.CommitteeDate,
                formValues?.Name,
                "تشكيل لجنه",
                "62a32adb-1f46-4cfe-84aa-806b5841432d",
                "",
                "",
                res?.payload?.result?.CommitteeNumber,
              );
            });
          });
        } else {
          showSuccessAlert(
            false,
            res?.payload?.message == "Email already exists in the system"
              ? "EmailAlreadyExistsInTheSystem"
              : res?.payload?.message == "Committee Name Is Already Exist!"
              ? "CommitteeNameIsAlreadyExist"
              : res?.payload?.message ==
                "All output attachments must be valid files., All output attachments must be valid files."
              ? "changeImage"
              : res?.payload?.message ==
                "All output attachments must be valid files."
              ? "changeImage"
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
    <div className="card card-xl-stretch mb-xl-0">
      <div className="card-header px-3 pt-3 pb-2 mb-3">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fs-4 my-5 ">
            {intl.formatMessage({ id: "FormationOfACommittee" })}
          </span>
          <span className="mt-1 fw-semibold fs-6  my-5">
            {intl.formatMessage({ id: "PleaseEnterTheData" })}
          </span>
        </h3>
      </div>
      <div className="card-body py-3 px-3 mx-8">
        <div className="tab-content">
          <div
            className="tab-pane fade active show"
            id="REGA_table_widget_5_tab_1"
          >
            <form
              onSubmit={handleSubmit(startCommittee)}
              className="form outputForm"
            >
              <div className="row">
                <div className="col-lg-4 mb-2 pt-2 pb-3">
                  <label
                    htmlFor="outputName"
                    className="form-label px-2 fontSz-6 required"
                  >
                    {intl.formatMessage({ id: "CommitteeName" })}
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="special fas fa-users text-gray-700"></i>
                      </span>
                    </div>
                    <input
                      id="outputName"
                      type="text"
                      className="form-control"
                      placeholder={intl.formatMessage({ id: "CommitteeName" })}
                      {...register("Name")}
                    />
                  </div>
                  {DisplayErrorMessage(errors?.Name?.message, intl, language)}
                </div>
                <div className="col-lg-4 mb-2 pt-2 pb-3">
                  <label
                    htmlFor="outputDate"
                    className="form-label px-2 fontSz-6 required"
                  >
                    {intl.formatMessage({
                      id: "DateOfDecisionOfCommitteeEstablishment",
                    })}
                  </label>
                  <input
                    id="outputDate"
                    type="datetime-local"
                    className="form-control form-control-solid"
                    placeholder={intl.formatMessage({
                      id: "DateOfDecisionOfCommitteeEstablishment",
                    })}
                    {...register("CommitteeDate")}
                    onClick={(e) => {
                      const target = e.currentTarget as HTMLInputElement;
                      if (target && typeof target.showPicker === "function") {
                        target.showPicker();
                      } else {
                        target.focus();
                        target.click();
                      }
                    }}
                  />
                  {DisplayErrorMessage(
                    errors?.CommitteeDate?.message,
                    intl,
                    language,
                  )}
                </div>
                <div className="col-lg-4 mb-2 pt-2 pb-3">
                  <label
                    htmlFor="stageName"
                    className="form-label px-2  fontSz-6 required"
                  >
                    {intl.formatMessage({ id: "CommitteeDuration" })}
                  </label>
                  <select
                    {...register("CommitteeTime")}
                    className="form-select form-select-solid"
                    defaultValue={-1}
                  >
                    <option value={-1} disabled>
                      {intl.formatMessage({ id: "Choose" })}
                    </option>
                    {committeeTimeOptions?.map((committeeTimeOption) => (
                      <option
                        value={committeeTimeOption?.id}
                        key={committeeTimeOption?.id}
                      >
                        {committeeTimeOption?.name}
                      </option>
                    ))}
                  </select>
                  {DisplayErrorMessage(
                    errors?.CommitteeTime?.message,
                    intl,
                    language,
                  )}
                </div>
                {formValues?.CommitteeTime == 2 ? (
                  <>
                    <div className="col-lg-4 mb-2 pt-2 pb-3">
                      <label
                        htmlFor="AssociatedProject"
                        className={`form-label px-2 fontSz-6 ${
                          formValues?.CommitteeTime == 2 ? "required" : ""
                        }`}
                      >
                        {intl.formatMessage({ id: "AssociatedProject" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="special bi bi-card-text text-gray-700"></i>
                          </span>
                        </div>
                        <input
                          id="AssociatedProject"
                          type="text"
                          className="form-control"
                          placeholder={intl.formatMessage({
                            id: "ProjectName",
                          })}
                          {...register("ProjectName")}
                        />
                        {DisplayErrorMessage(
                          errors?.ProjectName?.message,
                          intl,
                          language,
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {formValues?.CommitteeTime == 1 ? (
                  <>
                    <div className="col-lg-4 mb-2 pt-2 pb-3">
                      <label
                        htmlFor="finishDate"
                        className={`form-label px-2 fontSz-6 ${
                          formValues?.CommitteeTime == 1 ? "required" : ""
                        }`}
                      >
                        {intl.formatMessage({
                          id: "DateOfDecisionOfCommitteeFinishing",
                        })}
                      </label>
                      <div className="input-group">
                        <input
                          id="finishDate"
                          type="datetime-local"
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                          placeholder={intl.formatMessage({
                            id: "DateOfDecisionOfCommitteeFinishing",
                          })}
                          {...register("CommitteeFinishDate")}
                          onClick={(e) => {
                            const target = e.currentTarget as HTMLInputElement;
                            if (
                              target &&
                              typeof target.showPicker === "function"
                            ) {
                              target.showPicker();
                            } else {
                              target.focus();
                              target.click();
                            }
                          }}
                        />
                        {DisplayErrorMessage(
                          errors?.CommitteeFinishDate?.message,
                          intl,
                          language,
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div className="col-lg-4 mb-2 pt-2 pb-3">
                  <label htmlFor="notes" className="form-label px-2  fontSz-6 ">
                    {intl.formatMessage({
                      id: "TheLegalBasisForFormingACommittee",
                    })}
                  </label>
                  <div className="d-flex p-3 filed_background">
                    <div className="form-check form-check-success form-check-sm form-check-custom mx-3">
                      <input
                        className="form-check-input"
                        style={{ display: "block" }}
                        defaultChecked
                        type="radio"
                        name="cost"
                        id="exampleRadios1"
                        onClick={() => {
                          setHasLegalDocument(true);
                        }}
                      />
                      <label
                        className="form-check-label "
                        htmlFor="exampleRadios1"
                      >
                        {intl.formatMessage({ id: "Found" })}
                      </label>
                    </div>
                    <div className="form-check form-check-success form-check-sm form-check-custom">
                      <input
                        className="form-check-input"
                        type="radio"
                        style={{ display: "block" }}
                        name="cost"
                        id="exampleRadios1"
                        value="option1"
                        onClick={() => {
                          setHasLegalDocument(false);
                        }}
                      />
                      <label
                        className="form-check-label "
                        htmlFor="exampleRadios1"
                      >
                        {intl.formatMessage({ id: "NotFound" })}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 mb-2 pt-2 pb-3">
                  <label className="form-label px-2  fontSz-6">
                    {intl.formatMessage({ id: "ATTACHMENTS" })}
                  </label>
                  <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-5 h-fit">
                    <label
                      htmlFor="outputAttachment1"
                      className="form-label  dropzone-select  uploadFile-style inputAreaHeight"
                    >
                      <div role="button" className="d-flex align-items-center">
                        {selectedFilesForAttachments?.length > 0 ? (
                          <>
                            <div>
                              <ul className="d-flex align-items-center flex-wrap p-0 m-0 ">
                                {selectedFilesForAttachments?.map(
                                  (file, index) => (
                                    <li
                                      key={index}
                                      className="d-flex align-items-center my-2  position-relative"
                                    >
                                      <img
                                        style={{
                                          width: "50px",
                                          height: "50px",
                                          borderRadius: "50%",
                                        }}
                                        src={getIconSrc(file?.name, file)}
                                        className={file?.name}
                                        alt=""
                                      />
                                      <div className="mx-1">{file.name}</div>
                                      <div
                                        style={{
                                          position: "absolute",
                                          top: "-10px",
                                          left: "-10px",
                                          height: "15px",
                                          width: "15px",
                                          borderRadius: "50%",
                                          backgroundColor: "red",
                                          display: "flex",
                                          color: "black",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                        onClick={() => handleFileDelete(index)}
                                      >
                                        x
                                      </div>
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          </>
                        ) : (
                          <>
                            <img
                              style={{
                                width: "50px",
                                display: "inline-block",
                                marginLeft: "10px",
                              }}
                              src={toAbsoluteUrl("/media/uploadFile.png")}
                              className="img-fluid p-2"
                              alt="upload file"
                            />
                            <div
                              className="row py-auto"
                              style={{ position: "relative", top: "-7px" }}
                            >
                              <span className="text-primary fw-bolder">
                                {intl.formatMessage({
                                  id: "QuickFileUploader",
                                })}
                              </span>
                              <span>
                                {" "}
                                {intl.formatMessage({
                                  id: "DragAndDropOrChooseFilesFromComputer",
                                })}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </label>
                    <div
                      className="dropzone dropzone-queue "
                      id="kt_dropzonejs_example_3"
                    >
                      <div className="dropzone-panel">
                        <input
                          multiple
                          type="file"
                          id="outputAttachment1"
                          name="attachments1"
                          onChange={handleFileInputChange}
                          placeholder={intl.formatMessage({ id: "FileUpload" })}
                          className="dropzone-select  uploadFile-style inputAreaHeight d-none w-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 mb-2 pt-2 pb-3">
                  <label className="form-label px-2  fontSz-6">
                    {intl.formatMessage({ id: "CommitteeWorkRules" })}
                  </label>
                  <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-5 h-fit">
                    <label
                      htmlFor="outputAttachment"
                      className="form-label  dropzone-select  uploadFile-style inputAreaHeight"
                    >
                      <div role="button" className="d-flex align-items-center">
                        {selectedFilesForWorkRules?.length > 0 ? (
                          <>
                            <div>
                              <ul className="d-flex align-items-center flex-wrap p-0 m-0 ">
                                {selectedFilesForWorkRules?.map(
                                  (file, index) => (
                                    <li
                                      key={index}
                                      className="d-flex align-items-center my-2 mx-2 position-relative"
                                    >
                                      <img
                                        style={{
                                          width: "50px",
                                          height: "50px",
                                          borderRadius: "50%",
                                        }}
                                        src={getIconSrc(file?.name, file)}
                                        className={file?.name}
                                        alt=""
                                      />
                                      <div className="mx-1">{file.name}</div>
                                      <div
                                        style={{
                                          position: "absolute",
                                          top: "-10px",
                                          left: "-10px",
                                          height: "15px",
                                          width: "15px",
                                          borderRadius: "50%",
                                          backgroundColor: "red",
                                          display: "flex",
                                          color: "black",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                        onClick={() =>
                                          handleFileDeleteForWorkRules(index)
                                        }
                                      >
                                        x
                                      </div>
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          </>
                        ) : (
                          <>
                            <img
                              style={{
                                width: "50px",
                                display: "inline-block",
                                marginLeft: "10px",
                              }}
                              src={toAbsoluteUrl("/media/uploadFile.png")}
                              className="img-fluid p-2"
                              alt="upload file"
                            />
                            <div
                              className="row py-auto"
                              style={{ position: "relative", top: "-7px" }}
                            >
                              <span className="text-primary fw-bolder">
                                {intl.formatMessage({
                                  id: "QuickFileUploader",
                                })}
                              </span>
                              <span>
                                {" "}
                                {intl.formatMessage({
                                  id: "DragAndDropOrChooseFilesFromComputer",
                                })}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </label>
                    <div
                      className="dropzone dropzone-queue "
                      id="kt_dropzonejs_example_3"
                    >
                      <div className="dropzone-panel">
                        <input
                          multiple
                          type="file"
                          id="outputAttachment"
                          name="attachments"
                          onChange={handleFileInputChangeForWorkRules}
                          placeholder={intl.formatMessage({ id: "FileUpload" })}
                          className="dropzone-select  uploadFile-style inputAreaHeight d-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 mb-2 pt-2 pb-3">
                  <label htmlFor="notes" className="form-label px-2 fontSz-6 ">
                    {intl.formatMessage({ id: "CommitteeWorkRules" })}
                  </label>
                  <textarea
                    rows={5}
                    id="notes"
                    className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                    placeholder={intl.formatMessage({
                      id: "CommitteeWorkRules",
                    })}
                    {...register("WorkRule")}
                  ></textarea>
                  {DisplayErrorMessage(
                    errors?.WorkRule?.message,
                    intl,
                    language,
                  )}
                </div>
                {hasLegalDocument ? (
                  <>
                    <div className="col-lg-12 mb-2 pt-2 pb-3">
                      <label
                        htmlFor="notes"
                        className={`form-label px-2 fontSz-6 ${
                          hasLegalDocument ? "required" : ""
                        }`}
                      >
                        {intl.formatMessage({ id: "LegalBond" })}
                      </label>
                      <textarea
                        rows={5}
                        {...register("LegalDocument")}
                        id="notes"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                        placeholder={intl.formatMessage({ id: "LegalBond" })}
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
                    className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                    placeholder={intl.formatMessage({
                      id: "TasksOfTheCommittee",
                    })}
                    {...register("Missions")}
                  ></textarea>
                  {DisplayErrorMessage(
                    errors?.Missions?.message,
                    intl,
                    language,
                  )}
                </div>
                <div className="col-md-6 mb-2 pt-2 pb-3">
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
                    {goals.map((goal, idx) => (
                      <>
                        <div
                          key={idx}
                          className="d-flex justify-content-between w-100 pb-2 mb-1"
                        >
                          <span className="text-break">{goal.text}</span>
                          <span
                            role="button"
                            onClick={() => handleDeleteGoal(goal.id)}
                          >
                            <i className="fas fa-times-circle fa-fw text-danger fa-lg"></i>
                          </span>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                <div className="col-md-6"></div>
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
                        style={{ display: "block" }}
                        name="committee-member"
                        id="member"
                        value="member"
                        onClick={() => setCommitteeMembers("member")}
                      />
                      <label className="form-check-label " htmlFor="member">
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
                            className="form-check-input"
                            type="radio"
                            name="committee-member-type"
                            id="internal"
                            style={{ display: "block" }}
                            value="internal"
                            onClick={() => setShowMemberType("internal")}
                          />
                          <label
                            className="form-check-label "
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
                          <i className="bi bi-diagram-3 fs-3 "></i>
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
                            // background: "#F5F8FA",
                            borderRadius: "6px",
                            outline: "unset",
                            padding: "1rem 3rem 1rem 1rem",
                          }}
                          type="search"
                          name="searchForProject"
                          className="input input-group searchBoxDesign text-gray-900 border-0 border-fix-dark bg-fix-light bg-fix-dark"
                          id="searchForProject"
                          placeholder={intl.formatMessage({
                            id: "SearchForAMemberByLastName",
                          })}
                          value={searchTerm}
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                          }}
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
                            <div key={user?.userId as string}>
                              <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                                <div className=" w-md-50 d-flex align-items-start  ">
                                  <div className="mx-2">
                                    <div className=" d-inline ms-2 form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                                      <input
                                        className="form-check-input widget-9-check xCheckBg"
                                        type="checkbox"
                                        id={`${user?.id}`}
                                        checked={checkedUsers.includes(
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
                                      {" "}
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
                                  {checkedUsers.includes(
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
                  <div className="d-flex align-items-center justify-content-center ">
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
                    onClick={() => setModalEShow(true)}
                  >
                    <i className="fa-solid fa-user-plus mx-2 fs-3 fa-fw"></i>
                    {intl.formatMessage({ id: "AddExternalMember" })}
                  </div>
                </div>
              )}
              <div className="col-lg-12 mb-2 pt-2 pb-3">
                <MembersTable
                  Members={allMembers}
                  setExternalMembers={setExternalMembers}
                  setInternalMembers={setInternalMembers}
                  setAllMembers={setAllMembers}
                />
              </div>
              <div className="col-12 col-lg-7 mx-auto mb-10 mt-10">
                <div className=" card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                  <div className="d-flex justify-content-center align-items-center w-100 w-lg-50 w-md-50 w-sm-75">
                    <Link
                      to={"/"}
                      state={{ serviceName: cardTitle }}
                      className="btn btn-secondary mx-1 text-center w-50"
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </Link>
                    {!loading ? (
                      <button type="submit" className="btn btn-success w-50">
                        {intl.formatMessage({ id: "Add" })}
                      </button>
                    ) : (
                      <Button variant="success" disabled className="px-15 w-50">
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
            </form>
          </div>
        </div>
      </div>
      <div className="modal fade" id="AddExternalMember" aria-hidden="true">
        <AddExternalMember
          show={modalEShow}
          allMembers={allMembers}
          setAllMembers={setAllMembers}
          handleClose={() => setModalEShow(false)}
          externalMembers={externalMembers}
          setExternalMembers={setExternalMembers}
        />
      </div>
      <div className="modal fade" id="Rega_modal_add" aria-hidden="true">
        <AddPopup show={modalShow} handleClose={() => setModalShow(false)} />
      </div>
    </div>
  );
};

export default AddCommittee;
