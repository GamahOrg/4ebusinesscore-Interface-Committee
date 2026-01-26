import React, { Fragment, useEffect } from "react";
import { useIntl } from "react-intl";
import { Actions } from "./Actions";
import { getPermissions } from "../../../features/committee/permissionsSlice";
import { PermissionsModel } from "../../../models/permissions-model";
import { useAppDispatch, useAppSelector } from "../../../store/store";

type Members = {
  name: string;
  permissionId: string;
  id: string;
  email: string;
};

const MembersTable = ({ Members }: any) => {
  const intl = useIntl();
  let dispatch = useAppDispatch();
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
                {intl.formatMessage({ id: "Permission" })}
              </th>
              <th className="min-w-100px text-center">
                {intl.formatMessage({ id: "Procedures" })}
              </th>
            </tr>
          </thead>
          <tbody>
            {Members?.map((member: Members) => {
              return (
                <Fragment key={member?.id}>
                  <tr style={{ verticalAlign: "middle" }}>
                    <td style={{ verticalAlign: "middle" }}>
                      <p className="text-center">{member?.id}</p>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <div className="d-flex justify-content-center">
                        <img
                          alt=""
                          src="/media/avatars/300-3.jpg"
                          className="ms-3"
                          style={{
                            display: "block",
                            height: "46px",
                            width: "46px",
                            borderRadius: "50%",
                          }}
                        />
                        <div>
                          <div style={{ fontWeight: "700", fontSize: "14px" }}>
                            {member?.name}
                          </div>
                          <div style={{ fontWeight: "400", fontSize: "13px" }}>
                            {/* {Members?.administration} */}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <p className="text-center">{member?.email}</p>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <p className="text-center">
                        {language === "ar"
                          ? permissions?.find(
                              (permission: PermissionsModel) => {
                                return permission?.id === member?.permissionId;
                              }
                            )?.nameAr
                          : permissions?.find(
                              (permission: PermissionsModel) => {
                                return permission?.id === member?.permissionId;
                              }
                            )?.nameEn}
                      </p>
                    </td>
                    <td
                      style={{ verticalAlign: "middle" }}
                      className="text-center"
                    >
                      <Actions id={member?.id} />
                    </td>
                  </tr>{" "}
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
