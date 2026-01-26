import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getPermissions } from "../../../features/committee/permissionsSlice";
import { CommitteReviewMembersTableRowActionsForMeetings } from "./CommitteeReviewMembersTableRowActionsForMeetings";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";

const CommitteReviewMembersTableRowForMeetings = ({
  member,
  setExternalMembers,
  externalMembers,
  index,
}) => {
  const intl = useIntl();
  let dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPermissions({}) as any);
  }, []);
  let permissions = useAppSelector((state) => {
    return state?.permissions?.permissions;
  });
  let language = intl.locale;
  let permissionName =
    language == "ar"
      ? permissions?.find((item) => {
          return item?.id == member?.permissionId;
        })?.nameAr
      : permissions?.find((item) => {
          return item?.id == member?.permissionId;
        })?.nameEn;
  return (
    <>
      <tr style={{ verticalAlign: "middle" }}>
        <td className="text-center align-middle" style={{ padding: "16px 8px" }}>
          <p className="text-center mb-0" style={{ fontWeight: 500 }}>{index + 1}</p>
        </td>
        <td className="align-middle" style={{ padding: "16px 8px" }}>
          <div className="d-flex justify-content-center">
            <img
              src={toAbsoluteUrl(`/media/avatars/user.jpg`)}
              className="ms-3"
              style={{
                display: "block",
                height: "46px",
                width: "46px",
                borderRadius: "50%",
              }}
              alt={member?.name}
              onError={(e) => ((e.target as HTMLImageElement).src = "/media/avatars/user.jpg")}
            />
            <div style={{ width: "200px" }}>
              <div style={{ fontWeight: "700", fontSize: "14px" }}>
                {member?.name}
              </div>
              <div style={{ fontWeight: "400", fontSize: "13px" }}>
                {member?.job}
              </div>
            </div>
          </div>
        </td>
        <td className="text-center align-middle" style={{ padding: "16px 8px" }}>
          <p className="text-center mb-0" style={{ fontWeight: 400 }}>{member?.email}</p>
        </td>
        <td className="text-center align-middle" style={{ padding: "16px 8px" }}>
          <p className="text-center mb-0" style={{ fontWeight: 400 }}>
            {/* {language === "ar" ? "مختص خارجي" : "External specialist"} */}
            {permissionName}
          </p>
        </td>
        <td className="text-center align-middle" style={{ padding: "16px 8px" }}>
          <CommitteReviewMembersTableRowActionsForMeetings
            setExternalMembers={setExternalMembers}
            id={member?.id}
            externalMembers={externalMembers}
          />
        </td>
      </tr>{" "}
    </>
  );
};

export { CommitteReviewMembersTableRowForMeetings };
