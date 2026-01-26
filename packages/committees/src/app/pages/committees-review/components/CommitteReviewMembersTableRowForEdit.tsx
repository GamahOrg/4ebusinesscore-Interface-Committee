import React from "react";
import { useIntl } from "react-intl";
import { CommitteReviewMembersTableRowActionsForEdit } from "./CommitteReviewMembersTableRowActionsForEdit";
import { useAppSelector } from "../../../store/store";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { PermissionsModel } from "../../../models/permissions-model";
import { useLocation } from "react-router-dom";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";

interface Iprop {
  member: any;
  index: number;
  allMembers: any;
  setInternalMembers: any;
  setAllMembers: any;
  setExternalMembers: any;
}

const CommitteReviewMembersTableRowForEdit: React.FC<Iprop> = ({
  allMembers,
  member,
  index,
  setInternalMembers,
  setAllMembers,
  setExternalMembers,
}) => {
  const intl = useIntl();
  let permissions = useAppSelector((state) => {
    return state?.permissions?.permissions;
  });
  let location = useLocation();
  let language: string = intl.locale;
  let users = useAppSelector((state) => {
    return state?.usersAgg?.users?.map((user) => {
      return { ...user, id: user?.userId };
    });
  });
  let userIds = users?.map((user) => {
    return user?.id;
  });
  const getMaleOrFemaleProfileImage = (gender) => {
    if (gender) {
      return "/media/avatars/woman.jpg";
    }
    return "/media/avatars/arab.png";
  };

  return (
    <>
      <tr style={{ verticalAlign: "middle" }}>
        <td style={{ verticalAlign: "middle" }}>
          <p className="text-center">{index + 1}</p>
        </td>
        <td style={{ verticalAlign: "middle" }}>
          <div className="d-flex justify-content-center">
            <img
              src={
                member?.imagUrl || member?.imageUrl
                  ? `${UserManagmentRootUrl}${
                      member?.imagUrl || member?.imageUrl
                    }`
                  : userIds?.includes(member?.id) &&
                    (!member?.imagUrl || !member?.imageUrl) &&
                    users?.find((user) => {
                      return user?.id === member?.id;
                    })?.userGender === 0
                  ? toAbsoluteUrl(`/media/avatars/user.jpg`)
                  : userIds?.includes(member?.id) &&
                    (!member?.imagUrl || !member?.imageUrl) &&
                    users?.find((user) => {
                      return user?.id === member?.id;
                    })?.userGender === 1
                  ? toAbsoluteUrl(`/media/avatars/user.jpg`)
                  : toAbsoluteUrl(`/media/avatars/user.jpg`)
              }
              className="ms-3"
              style={{
                display: "block",
                height: "46px",
                width: "46px",
                borderRadius: "50%",
              }}
              alt={member?.name}
              onError={(e: any) =>
                (e.target.src = toAbsoluteUrl(`/media/avatars/user.jpg`))
              }
            />
            <div style={{ width: "200px" }}>
              <div style={{ fontWeight: "700", fontSize: "14px" }}>
                {member?.name}
              </div>
              <div style={{ fontWeight: "400", fontSize: "13px" }}>
                {member?.job ||
                  (language === "ar" ? member?.orgNameAr : member?.orgNameEn)}
              </div>
            </div>
          </div>
        </td>
        <td style={{ verticalAlign: "middle" }}>
          <p className="text-center">{member?.email}</p>
        </td>
        <td style={{ verticalAlign: "middle" }}>
          <p className="text-center">
            {
              // member?.imagUrl
              // ?
              intl.formatMessage({ id: "InternalMember" })
              // : intl.formatMessage({ id: "ExternalMember" })
            }
          </p>
        </td>
        <td style={{ verticalAlign: "middle" }}>
          <p className="text-center">
            {
              language === "ar"
                ? member?.permissionNameAr
                : member?.permissionNameEn
              // ? permissions?.find((permission: PermissionsModel) => {
              //     return permission?.id == member?.permissionId;
              //   })?.nameAr || intl.formatMessage({ id: "NotFoundPermission" })
              // : permissions?.find((permission: PermissionsModel) => {
              //     return permission?.id == member?.permissionId;
              //   })?.nameEn || intl.formatMessage({ id: "NotFoundPermission" })
            }
          </p>
        </td>
        {location?.pathname?.includes(
          "/committees-review/committee-decision-show-details",
        ) ? (
          <></>
        ) : (
          <>
            <td style={{ verticalAlign: "middle" }} className="text-center">
              <CommitteReviewMembersTableRowActionsForEdit
                allMembers={allMembers}
                id={member?.id}
                setExternalMembers={setExternalMembers}
                setInternalMembers={setInternalMembers}
                setAllMembers={setAllMembers}
              />
            </td>
          </>
        )}
      </tr>
    </>
  );
};

export { CommitteReviewMembersTableRowForEdit };
