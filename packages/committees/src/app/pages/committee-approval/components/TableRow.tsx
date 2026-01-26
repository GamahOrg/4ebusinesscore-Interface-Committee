import React from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import moment from "moment";
import { useLocation } from "react-router-dom";

interface Iprop {
  committee: any;
}

const TableRow: React.FC<Iprop> = ({ committee }) => {
  const intl = useIntl();

  let location = useLocation();
  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";
  return (
    <>
      <tr className="align-middle">
        <td className="align-middle">
          <Link
            to={`/committee-approval/committee-approval-details/${committee?.id}`}
            state={{ serviceName: cardTitle }}
          >
            <p className="text-center text-primary">{committee?.name}</p>
          </Link>
        </td>
        <td className="align-middle">
          <p className="text-center">
            {committee?.requestStatus === 0 && (
              <span className="badgex badge-light-primary">
                {intl.formatMessage({ id: "UnderStudying" })}
              </span>
            )}
            {committee?.requestStatus === 1 && (
              <span className="badgex badge-light-success">
                {intl.formatMessage({ id: "Accepted" })}
              </span>
            )}
            {committee?.requestStatus === 2 && (
              <span className="badgex badge-light-danger">
                {intl.formatMessage({ id: "Rejected" })}
              </span>
            )}
          </p>
        </td>
        <td className="align-middle">
          <p className="text-center">{committee?.committeeKeeperName}</p>
        </td>
        <td className="align-middle">
          <p className="text-center">
            {committee?.committeeTime === 0
              ? intl.formatMessage({ id: "Always" })
              : committee?.committeeTime === 1
                ? intl.formatMessage({ id: "Temporary" })
                : intl.formatMessage({ id: "TemporaryProject" })}
          </p>
        </td>
        <td className="align-middle">
          <p className="text-center">
            {moment(committee?.committeeDate).format("YYYY-MM-DD")}
          </p>
        </td>
        <td className="align-middle">
          <p className="text-center">{committee?.membersCount}</p>
        </td>
      </tr>
    </>
  );
};

export { TableRow };
