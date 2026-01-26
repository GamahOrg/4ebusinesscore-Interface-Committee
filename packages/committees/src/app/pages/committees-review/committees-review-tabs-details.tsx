import { FC, useEffect, useState } from "react";
import { CommitteesReviewTabs } from "./components/CommitteesReviewTabs";
import React from "react";
import { useAppDispatch, useAppSelector, RootState } from "../../store/store";
import { getCommittee } from "../../features/committee/committeesSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { getAllDelegationToUserByUserId } from "../../features/procceding/proceedingSlice";

const CommitteesReviewTabsDetails: FC = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  let [message, setMessage] = useState("");
  useEffect(() => {
    dispatch(getCommittee(id as string) as any).then((res: any) => {
      setMessage(res?.payload?.message);
    });
  }, [id, dispatch]);
  useEffect(() => {
    if (message === "This Committee isn't approved yet!") {
      navigate("/committees-review?pageNumber=1");
    }
  }, [message, id, navigate]);

  let internalMembers = useAppSelector((state) => {
    return state?.committees?.committee?.allInternalMembersDtos;
  });
  let userLoggedId = localStorage.getItem("userId");
  let loggedInUserPermission = internalMembers?.find((member) => {
    return member?.userId === userLoggedId;
  })?.permissionId;

  const [userId, setUserIds] = useState<any>("");

  useEffect(() => {
    const userDelegateId = internalMembers?.find((member) => {
      return (
        member?.permissionId === "32820481-5dfb-4aa8-b43b-ce3e486928a7" ||
        member?.permissionNameEn === "Committee Keeper" ||
        member?.permissionNameAr === "امين لجنه" ||
        member?.permissionNameAr === "امين لجنة"
      );
    })?.userId;

    setUserIds(userDelegateId);
  }, [internalMembers]);

  const [keeperAssistantUserId, setKeeperAssistantIds] = useState<any>("");

  useEffect(() => {
    const keeperAssistantUserDelegateId = internalMembers?.find((member) => {
      return (
        member?.permissionId === "975912ea-8064-498b-66d3-08dd06f363aa" ||
        member?.permissionNameEn === "Committee Keeper Assistant" ||
        member?.permissionNameAr === "مساعد امين لجنه" ||
        member?.permissionNameAr === "مساعد أمين لجنة"
      );
    })?.userId;
    setKeeperAssistantIds(keeperAssistantUserDelegateId);
  }, [internalMembers]);

  let [
    isCommitteeMemberHasPersedirentOrSecretaryPermissions,
    setIsCommitteeMemberHasPersedirentOrSecretaryPermissions,
  ] = useState(false);

  useEffect(() => {
    if (userLoggedId) {
      dispatch(
        getAllDelegationToUserByUserId({
          id: userLoggedId as string,
          myparams: {
            pageNumber: 1,
            pageSize: 1000,
          },
        }) as any
      );
    }
  }, [userLoggedId, dispatch]);

  const delegated = useAppSelector((state: RootState) => {
    return state?.proceedings?.data;
  });
  const [delegatedToUserIds, setDelegatedToUserIds] = useState<any>([]);

  useEffect(() => {
    const extractedDelegatedToUserIds = delegated?.map(
      (delegated) =>
        delegated?.isActive &&
        delegated?.isApprovedTo &&
        delegated?.delegeatedFromUserId
    );

    setDelegatedToUserIds(extractedDelegatedToUserIds);
  }, [delegated]);

  useEffect(() => {
    let validPermissions = [
      "32820481-5dfb-4aa8-b43b-ce3e486928d7",
      "32820481-5dfb-4aa8-b43b-ce3e486928a7",
      "975912ea-8064-498b-66d3-08dd06f363aa",
    ];
    if (
      validPermissions?.includes(loggedInUserPermission as any) ||
      delegatedToUserIds?.includes(userId) ||
      delegatedToUserIds?.includes(keeperAssistantUserId)
    ) {
      setIsCommitteeMemberHasPersedirentOrSecretaryPermissions(true);
    } else {
      setIsCommitteeMemberHasPersedirentOrSecretaryPermissions(false);
    }
  }, [
    loggedInUserPermission,
    delegatedToUserIds,
    userId,
    keeperAssistantUserId,
  ]);

  useEffect(() => {
    localStorage.setItem(
      "isCommitteeMemberHasPersedirentOrSecretaryPermissions",
      `${isCommitteeMemberHasPersedirentOrSecretaryPermissions}`
    );
  }, [isCommitteeMemberHasPersedirentOrSecretaryPermissions]);

  let location = useLocation();

  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  const breadcrumbItems = [
    {
      path: "/committees-review",
      defaultName: "CommitteesReview",
      name: cardName || serviceName,
    },
    {
      path: `/committees-review/comittees-tab-details/${id}`,
      defaultName: "CommitteeDetails",
      name: "",
    },
  ];
  return (
    
    <>
      <DynamicToolbar
        defaultTitle="CommitteeDetails"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />
      <CommitteesReviewTabs />
    </>
  );
};

export { CommitteesReviewTabsDetails };
