import React from "react";
import { useIntl } from "react-intl";
import { ExternalMemberModel } from "../../../models/meeting-model";

interface Iprop {
  Members: ExternalMemberModel;
  index:number
}

const CommitteReviewMembersTableRow: React.FC<Iprop> = ({ Members,index }) => {
  const intl = useIntl();
  let language=intl.locale

  return (
    <>
      <tr style={{ verticalAlign: "middle" }}>
        <td style={{ verticalAlign: "middle" }}>
          <p className="text-center">{index+1}</p>
        </td>
        <td style={{ verticalAlign: "middle" }}>
          <div className="d-flex justify-content-center">
            <img
              src={"/media/avatars/300-3.jpg"}
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
                {Members.name}
              </div>
              <div style={{ fontWeight: "400", fontSize: "13px" }}>
                {Members?.destinationName}
              </div>
            </div>
          </div>
        </td>
        <td style={{ verticalAlign: "middle" }}>
          <p className="text-center">{Members?.email}</p>
        </td>
        <td style={{ verticalAlign: "middle" }}>
          <p className="text-center">{language=="ar" && Members?.permissionNameAr?Members?.permissionNameAr:language=="en" && Members?.permissionNameEn?Members?.permissionNameEn:intl.formatMessage({id:"NotFoundPermission"})}</p>
        </td>
      </tr>
    </>
  );
};

export { CommitteReviewMembersTableRow };
