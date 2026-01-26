import React, { Fragment, useEffect } from "react";
import { useIntl } from "react-intl";
import { Actions } from "./Actions";
import { getPermissions } from "../../../features/committee/permissionsSlice";
import { PermissionsModel } from "../../../models/permissions-model";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";

const MembersTable = ({
  Members,
  setInternalMembers,
  setAllMembers,
  setExternalMembers,
}: any) => {
  const intl = useIntl();

  let dispatch = useAppDispatch();
  let users = useAppSelector((state) => {
    return state?.usersAgg?.users?.map((user) => {
      return { ...user, id: user?.userId };
    });
  });
  let userIds = users?.map((user) => {
    return user?.id;
  });
  useEffect(() => {
    dispatch(getPermissions({}) as any);
  }, [dispatch]);
  let permissions = useAppSelector((state) => {
    return state?.permissions?.permissions;
  });
  let language: string = intl.locale;
  return (
    <Fragment>
      <div className="table-responsive mt-4">
        <table
          className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-7"
          id="REGA-WS-caseList"
        >
          <thead>
            <tr className="fw-bolder text-muted">
              <th className="min-w-50px text-center">
                {intl.formatMessage({ id: "Sequence" })}
              </th>
              <th className="min-w-150px text-center">
                {intl.formatMessage({ id: "MemberData" })}
              </th>
              <th className="min-w-150px text-center">
                {intl.formatMessage({ id: "Email" })}
              </th>
              <th className="min-w-150px text-center">
                {intl.formatMessage({ id: "MemberType" })}
              </th>
              <th className="min-w-150px text-center">
                {intl.formatMessage({ id: "Permission" })}
              </th>
              <th className="min-w-100px text-center">
                {intl.formatMessage({ id: "Procedures" })}
              </th>
            </tr>
          </thead>
          <tbody>
            {Members?.map((member: any, index: number) => {
              return (
                <Fragment key={member?.id}>
                  <tr style={{ verticalAlign: "middle" }}>
                    <td style={{ verticalAlign: "middle" }}>
                      <p className="text-center">{index + 1}</p>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <div className="d-flex justify-content-center">
                        <img
                          src={
                            member?.imageUrl
                              ? `${UserManagmentRootUrl}${member?.imageUrl}`
                              : userIds?.includes(member?.id) &&
                                  !member?.imageUrl &&
                                  member?.userGender === 0
                                ? toAbsoluteUrl("/media/avatars/user.jpg")
                                : userIds?.includes(member?.id) &&
                                    !member?.imageUrl &&
                                    member?.userGender === 1
                                  ? toAbsoluteUrl("/media/avatars/user.jpg")
                                  : toAbsoluteUrl("/media/avatars/user.jpg")
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
                            {member?.destinationName ||
                              (language === "ar"
                                ? member?.orgNameAr
                                : member?.orgNameEn)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <p className="text-center">{member?.email}</p>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <p className="text-center">
                        {member?.imageUrl
                          ? intl.formatMessage({ id: "InternalMember" })
                          : intl.formatMessage({ id: "InternalMember" })}
                      </p>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <p className="text-center">
                        {language === "ar"
                          ? permissions?.find(
                              (permission: PermissionsModel) => {
                                return permission?.id === member?.permissionId;
                              }
                            )?.nameAr ||
                            intl.formatMessage({ id: "NotFoundPermission" })
                          : permissions?.find(
                              (permission: PermissionsModel) => {
                                return permission?.id === member?.permissionId;
                              }
                            )?.nameEn ||
                            intl.formatMessage({ id: "NotFoundPermission" })}
                      </p>
                    </td>
                    <td
                      style={{ verticalAlign: "middle" }}
                      className="text-center"
                    >
                      <Actions
                        allMembers={Members}
                        id={member?.id}
                        setExternalMembers={setExternalMembers}
                        setInternalMembers={setInternalMembers}
                        setAllMembers={setAllMembers}
                      />
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export { MembersTable };
