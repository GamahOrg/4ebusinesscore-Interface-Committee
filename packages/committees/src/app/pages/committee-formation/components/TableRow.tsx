import React from "react";
import { Actions } from "./Actions";

interface Iprop {
  Members: any;
}

const TableRow: React.FC<Iprop> = ({ Members }) => {
  return (
    <>
      <tr style={{ verticalAlign: "middle" }}>
        <td style={{ verticalAlign: "middle" }}>
          <p className="text-center">{Members?.id}</p>
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
                {Members?.name}
              </div>
              <div style={{ fontWeight: "400", fontSize: "13px" }}>
                {Members?.administration}
              </div>
            </div>
          </div>
        </td>
        <td style={{ verticalAlign: "middle" }}>
          <p className="text-center">{Members?.email}</p>
        </td>
        <td style={{ verticalAlign: "middle" }}>
          <p className="text-center">{Members?.validity}</p>
        </td>
        <td style={{ verticalAlign: "middle" }} className="text-center">
          <Actions id={3} />
        </td>
      </tr>
    </>
  );
};

export { TableRow };
